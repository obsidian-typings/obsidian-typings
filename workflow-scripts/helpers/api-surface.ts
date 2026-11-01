/**
 * @file
 *
 * Lists the declared API surface of a release branch by member name, and what changed in it between two refs.
 *
 * A release used to say which commits it carried and nothing about what those commits did to the typings, so a
 * consumer who wanted to know which internal members an Obsidian version added or dropped had to diff two
 * branches by hand. That was asked for in 2024-09, with one condition from the Obsidian team: the readable
 * internals stay private, so what gets published is member NAMES only -- never a signature, a body or a comment.
 * Everything here therefore reduces a declaration file to strings like `App.plugins` and `Cli`.
 *
 * The names come from the committed `.d.ts` files under `src/`, read at a ref through `git cat-file --batch`,
 * so the working tree never matters and both sides of a range are read the same way. Each file is parsed with
 * the TypeScript compiler rather than matched with patterns, because a member list is exactly what a parser
 * gives for free and a pattern gets wrong on the first multi-line signature.
 */

import type {
  ClassElement,
  NodeArray,
  SourceFile,
  Statement,
  TypeElement
} from 'typescript';

import { getRootFolder } from '@mnaoumov/typescript-dev-toolkit/root';
import { spawn } from 'node:child_process';
import {
  createSourceFile,
  isClassDeclaration,
  isConstructorDeclaration,
  isConstructSignatureDeclaration,
  isEnumDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isInterfaceDeclaration,
  isModuleBlock,
  isModuleDeclaration,
  isNumericLiteral,
  isPrivateIdentifier,
  isStringLiteral,
  isTypeAliasDeclaration,
  isVariableStatement,
  ScriptKind,
  ScriptTarget
} from 'typescript';

/**
 * The most names one list of a changelog section shows before it summarizes the rest.
 *
 * A crawler pass can touch hundreds of members, and GitHub caps a release body at 125,000 characters.
 */
export const MAX_LISTED_API_NAMES = 300;

/**
 * The folder whose declaration files make up the published surface, relative to the repository root.
 *
 * Read with `--full-tree`, because these scripts run from `workflow-scripts/`, a package of its own whose root
 * {@link getRootFolder} reports, and a plain `ls-tree` resolves its path against the current directory.
 */
const SOURCE_FOLDER = 'src';

/**
 * The byte cat-file --batch ends each header line and each object with.
 */
const NEWLINE_BYTE = 10;

/**
 * The position of the size field in a cat-file --batch header: <hash> <type> <size>.
 */
const HEADER_SIZE_FIELD_INDEX = 2;

/**
 * What changed in the declared surface between two refs.
 */
export interface ApiSurfaceDiff {
  /**
   * The names declared at the new ref and not at the old one, sorted.
   */
  readonly added: readonly string[];

  /**
   * The names declared at the old ref and not at the new one, sorted.
   */
  readonly removed: readonly string[];
}

/**
 * The declared names in one declaration file: each top-level type, interface, class, enum, function and
 * variable by its own name, and each member of an interface or class as `<Owner>.<member>`.
 *
 * Declarations nested in a `declare module` or a `namespace` count as top-level, since that is where every
 * augmentation in this repository lives. Overloads and declaration merging collapse into one name, which is the
 * point: a name list answers "does it exist", not "what does it look like".
 *
 * @param fileName - The file's path, used only for the parser's diagnostics.
 * @param text - The file's contents.
 * @returns The names, unsorted and possibly repeated.
 */
export function collectApiNames(fileName: string, text: string): string[] {
  const sourceFile = createSourceFile(fileName, text, ScriptTarget.Latest, false, ScriptKind.TS);
  const names: string[] = [];

  function visitStatements(statements: NodeArray<Statement>): void {
    for (const statement of statements) {
      visitStatement(statement);
    }
  }

  function visitStatement(statement: Statement): void {
    if (isModuleDeclaration(statement)) {
      if (statement.body && isModuleBlock(statement.body)) {
        visitStatements(statement.body.statements);
      } else if (statement.body && isModuleDeclaration(statement.body)) {
        visitStatement(statement.body);
      }
      return;
    }

    if (isInterfaceDeclaration(statement) || isClassDeclaration(statement)) {
      const ownerName = statement.name?.text;
      if (ownerName === undefined) {
        return;
      }

      names.push(ownerName);
      for (const member of statement.members) {
        const memberName = getMemberName(member, sourceFile);
        if (memberName !== null) {
          names.push(`${ownerName}.${memberName}`);
        }
      }
      return;
    }

    if (isTypeAliasDeclaration(statement) || isEnumDeclaration(statement) || isFunctionDeclaration(statement)) {
      if (statement.name !== undefined) {
        names.push(statement.name.text);
      }
      return;
    }

    if (isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (isIdentifier(declaration.name)) {
          names.push(declaration.name.text);
        }
      }
    }
  }

  visitStatements(sourceFile.statements);
  return names;
}

/**
 * The lines one changelog section carries for a surface diff, under its own `###` heading.
 *
 * Nothing at all when the surface did not change, so an ordinary release that only fixed a comment does not
 * grow an empty heading.
 *
 * @param diff - The diff, as {@link diffApiSurfaces} produced it.
 * @param baseTagName - The tag the diff was taken against.
 * @returns The lines, or an empty array.
 */
export function composeApiChangeLines(diff: ApiSurfaceDiff, baseTagName: string): string[] {
  if (diff.added.length === 0 && diff.removed.length === 0) {
    return [];
  }

  const lines = ['### Declared API changes', '', `Names only, compared with \`${baseTagName}\`.`];

  if (diff.added.length > 0) {
    lines.push('', `**Added (${String(diff.added.length)}):**`, '', ...toNameList(diff.added));
  }

  if (diff.removed.length > 0) {
    lines.push('', `**Removed (${String(diff.removed.length)}):**`, '', ...toNameList(diff.removed));
  }

  return lines;
}

/**
 * The names one surface has and the other lacks, both ways.
 *
 * @param before - The names at the old ref.
 * @param after - The names at the new ref.
 * @returns The diff, each side sorted.
 */
export function diffApiSurfaces(before: ReadonlySet<string>, after: ReadonlySet<string>): ApiSurfaceDiff {
  return {
    added: [...after].filter((name) => !before.has(name)).sort(),
    removed: [...before].filter((name) => !after.has(name)).sort()
  };
}

/**
 * Every name declared by the `.d.ts` files under `src/` at `ref`.
 *
 * @param ref - Any ref git accepts: a tag, a branch, `HEAD`.
 * @returns The names.
 */
export async function readApiSurface(ref: string): Promise<Set<string>> {
  const fileList = await runGit(['ls-tree', '-r', '--full-tree', '--name-only', ref, '--', SOURCE_FOLDER]);
  const paths = fileList.toString('utf-8').split('\n').filter((path) => path.endsWith('.d.ts'));
  const names = new Set<string>();

  if (paths.length === 0) {
    return names;
  }

  const batch = await runGit(['cat-file', '--batch'], `${paths.map((path) => `${ref}:${path}`).join('\n')}\n`);
  let offset = 0;

  for (const path of paths) {
    const headerEnd = batch.indexOf(NEWLINE_BYTE, offset);
    const header = batch.subarray(offset, headerEnd).toString('utf-8');
    const size = Number(header.split(' ', HEADER_SIZE_FIELD_INDEX + 1)[HEADER_SIZE_FIELD_INDEX]);

    if (!Number.isSafeInteger(size)) {
      throw new TypeError(`git cat-file could not read ${ref}:${path}: ${header}`);
    }

    const text = batch.subarray(headerEnd + 1, headerEnd + 1 + size).toString('utf-8');
    offset = headerEnd + 1 + size + 1;

    for (const name of collectApiNames(path, text)) {
      names.add(name);
    }
  }

  return names;
}

/**
 * A member's name as source spells it, or `null` for a member with none (an index or call signature).
 */
function getMemberName(member: ClassElement | TypeElement, sourceFile: SourceFile): null | string {
  if (isConstructorDeclaration(member) || isConstructSignatureDeclaration(member)) {
    return 'constructor';
  }

  const name = member.name;
  if (name === undefined) {
    return null;
  }

  return isIdentifier(name) || isPrivateIdentifier(name) || isStringLiteral(name) || isNumericLiteral(name)
    ? name.text
    : name.getText(sourceFile);
}

/**
 * Runs git in the repository root and returns its raw stdout.
 *
 * Raw bytes rather than a string, because `cat-file --batch` reports each object's size in bytes and a decoded
 * string would count characters.
 */
async function runGit(gitArguments: readonly string[], input?: string): Promise<Buffer> {
  const rootFolder = getRootFolder();

  if (!rootFolder) {
    throw new Error('Could not find root folder to run git in.');
  }

  return await new Promise((resolve, reject) => {
    const child = spawn('git', gitArguments, { cwd: rootFolder, stdio: ['pipe', 'pipe', 'pipe'] });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    child.stdout.on('data', (chunk: Buffer) => {
      stdoutChunks.push(chunk);
    });
    child.stderr.on('data', (chunk: Buffer) => {
      stderrChunks.push(chunk);
    });
    child.on('error', reject);
    child.on('close', (exitCode) => {
      if (exitCode === 0) {
        resolve(Buffer.concat(stdoutChunks));
      } else {
        reject(new Error(`git ${gitArguments.join(' ')} failed with exit code ${String(exitCode)}: ${Buffer.concat(stderrChunks).toString('utf-8')}`));
      }
    });

    child.stdin.end(input ?? '');
  });
}

/**
 * Renders names as a markdown bullet list, summarizing past {@link MAX_LISTED_API_NAMES}.
 */
function toNameList(names: readonly string[]): string[] {
  const lines = names.slice(0, MAX_LISTED_API_NAMES).map((name) => `- \`${name}\``);

  if (names.length > MAX_LISTED_API_NAMES) {
    lines.push(`- ...and ${String(names.length - MAX_LISTED_API_NAMES)} more`);
  }

  return lines;
}
