import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import {
  readdirSync,
  readFileSync
} from 'node:fs';
import {
  basename,
  dirname,
  join,
  resolve
} from 'node:path';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { normalizePath } from './utils.ts';

const WINDOW_FILE_SUFFIX = '/globals/augmentations/Window.d.ts';
const WINDOW_FILE_NAME = 'Window.d.ts';
const FUNCTIONS_DIR = 'functions';
const VARS_DIR = 'vars';

interface ImportSpec {
  readonly imported: string;
  readonly local: string;
  readonly originalModule: string;
  readonly resolvedModule: string;
}

function doesWindowFileHaveMember(windowFilePath: string, memberName: string, kind: 'method' | 'property'): boolean {
  try {
    const content = readFileSync(windowFilePath, 'utf-8');
    if (kind === 'method') {
      // Match method declarations like: memberName(...) or memberName<...>(...)
      return new RegExp(String.raw`\b${escapeRegExp(memberName)}\s*[<(]`).test(content);
    }
    // Match property declarations like: memberName: or memberName?: or memberName;
    return new RegExp(String.raw`\b${escapeRegExp(memberName)}\s*[?:;]`).test(content);
  } catch {
    return false;
  }
}

function escapeRegExp(text: string): string {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function formatSpecifier(spec: ImportSpec): string {
  return spec.imported === spec.local ? spec.local : `${spec.imported} as ${spec.local}`;
}

function getGlobalsAugmentationsDirectory(filename: string): string {
  const normalized = normalizePath(filename);
  const index = normalized.indexOf('/globals/augmentations/');
  return `${normalized.slice(0, Math.max(0, index))}/globals/augmentations/`;
}

function getMemberNameFromFilename(filename: string): string {
  return basename(filename, '.d.ts');
}

function getMemberTypeText(
  context: RuleContext,
  node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature
): string {
  if (node.type === AST_NODE_TYPES.TSPropertySignature) {
    return node.typeAnnotation ? context.sourceCode.getText(node.typeAnnotation) : '';
  }
  const parts: string[] = [];
  if (node.typeParameters) {
    parts.push(context.sourceCode.getText(node.typeParameters));
  }
  for (const parameter of node.params) {
    parts.push(context.sourceCode.getText(parameter));
  }
  if (node.returnType) {
    parts.push(context.sourceCode.getText(node.returnType));
  }
  return parts.join(' ');
}

function isGlobalsFunctionFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes(`/globals/augmentations/${FUNCTIONS_DIR}/`)
    && normalized.endsWith('.d.ts');
}

function isGlobalsVariableFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes(`/globals/augmentations/${VARS_DIR}/`)
    && normalized.endsWith('.d.ts');
}

function isSpecIn(spec: ImportSpec, specs: ImportSpec[]): boolean {
  return specs.some((s) =>
    s.resolvedModule === spec.resolvedModule
    && s.imported === spec.imported
    && s.local === spec.local
  );
}

function isWindowFile(filename: string): boolean {
  return normalizePath(filename).endsWith(WINDOW_FILE_SUFFIX);
}

function listDtsFiles(directoryPath: string): string[] {
  try {
    return readdirSync(directoryPath)
      .filter((f) => f.endsWith('.d.ts'))
      .map((f) => f.replace(/\.d\.ts$/, ''));
  } catch {
    return [];
  }
}

function parseImportSpecsFromContent(content: string, fileDirectory: string): ImportSpec[] {
  const result: ImportSpec[] = [];
  const importRegex = /import\s+type\s+\{(?<specifiers>[\s\S]*?)\}\s+from\s+['"](?<modulePath>[^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const specText = stripComments(match.groups?.['specifiers'] ?? '');
    const modulePath = match.groups?.['modulePath'] ?? '';
    const resolvedModule = modulePath.startsWith('.')
      ? normalizePath(resolve(fileDirectory, modulePath))
      : modulePath;

    for (const raw of specText.split(',')) {
      const trimmed = raw.trim();
      if (!trimmed) {
        continue;
      }
      const asMatch = /^(?<imported>.+?)\s+as\s+(?<local>.+)$/.exec(trimmed);
      if (asMatch) {
        const imported = asMatch.groups?.['imported'] ?? '';
        const local = asMatch.groups?.['local'] ?? '';
        result.push({ imported: imported.trim(), local: local.trim(), originalModule: modulePath, resolvedModule });
      } else {
        result.push({ imported: trimmed, local: trimmed, originalModule: modulePath, resolvedModule });
      }
    }
  }
  return result;
}

function stripComments(text: string): string {
  return text.replaceAll(/\/\/[^\n]*/g, '').replaceAll(/\/\*[\s\S]*?\*\//g, '');
}

function validateFileImportsMatchWindow(
  context: RuleContext,
  node: TSESTree.Program,
  filename: string,
  windowFilePath: string,
  augmentationsDirectory: string
): void {
  try {
    const fileContent = readFileSync(filename, 'utf-8');
    const windowContent = readFileSync(windowFilePath, 'utf-8');

    const fileImports = parseImportSpecsFromContent(fileContent, dirname(filename));
    const windowImports = parseImportSpecsFromContent(windowContent, augmentationsDirectory);

    for (const spec of fileImports) {
      if (!isSpecIn(spec, windowImports)) {
        context.report({
          data: { module: spec.originalModule, specifier: formatSpecifier(spec) },
          messageId: 'importMismatchInWindow',
          node
        });
      }
    }
  } catch {
    // If we can't read files, skip the check.
  }
}

function validateWindowMemberImportsInFile(
  context: RuleContext,
  node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature,
  memberName: string,
  memberDirectory: string,
  directoryName: string,
  windowImports: ImportSpec[]
): void {
  try {
    const memberTypeText = getMemberTypeText(context, node);
    const allLocals = windowImports.map((s) => s.local);
    const referencedLocals = new Set(
      allLocals.filter((local) => new RegExp(String.raw`\b${escapeRegExp(local)}\b`).test(memberTypeText))
    );

    const neededSpecs = windowImports.filter((s) => referencedLocals.has(s.local));

    const filePath = join(memberDirectory, `${memberName}.d.ts`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const fileImports = parseImportSpecsFromContent(fileContent, memberDirectory);

    for (const spec of neededSpecs) {
      if (!isSpecIn(spec, fileImports)) {
        context.report({
          data: { directory: directoryName, memberName, module: spec.originalModule, specifier: formatSpecifier(spec) },
          messageId: 'importMismatchInFile',
          node
        });
      }
    }
  } catch {
    // If we can't read the member file, skip the check.
  }
}

export const windowMemberFileSync = {
  create(context: RuleContext): RuleListener {
    const filename = normalizePath(context.filename);

    if (isGlobalsFunctionFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augmentationsDirectory = getGlobalsAugmentationsDirectory(filename);
      const windowFilePath = join(augmentationsDirectory, WINDOW_FILE_NAME);
      const hasMember = doesWindowFileHaveMember(windowFilePath, memberName, 'method');

      return {
        Program(node: TSESTree.Program): void {
          if (!hasMember) {
            context.report({
              data: { fileName: `${FUNCTIONS_DIR}/${memberName}.d.ts`, kind: 'method' },
              messageId: 'missingWindowMember',
              node
            });
            return;
          }
          validateFileImportsMatchWindow(context, node, filename, windowFilePath, augmentationsDirectory);
        }
      };
    }

    if (isGlobalsVariableFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augmentationsDirectory = getGlobalsAugmentationsDirectory(filename);
      const windowFilePath = join(augmentationsDirectory, WINDOW_FILE_NAME);
      const hasMember = doesWindowFileHaveMember(windowFilePath, memberName, 'property');

      return {
        Program(node: TSESTree.Program): void {
          if (!hasMember) {
            context.report({
              data: { fileName: `${VARS_DIR}/${memberName}.d.ts`, kind: 'property' },
              messageId: 'missingWindowMember',
              node
            });
            return;
          }
          validateFileImportsMatchWindow(context, node, filename, windowFilePath, augmentationsDirectory);
        }
      };
    }

    if (!isWindowFile(filename)) {
      return {};
    }

    const augmentationsDirectory = dirname(filename);
    const functionsDirectory = join(augmentationsDirectory, FUNCTIONS_DIR);
    const variablesDirectory = join(augmentationsDirectory, VARS_DIR);
    const functionFiles = new Set(listDtsFiles(functionsDirectory));
    const variableFiles = new Set(listDtsFiles(variablesDirectory));

    let windowImports: ImportSpec[] | null = null;
    function getWindowImports(): ImportSpec[] {
      if (!windowImports) {
        const content = readFileSync(filename, 'utf-8');
        windowImports = parseImportSpecsFromContent(content, augmentationsDirectory);
      }
      return windowImports;
    }

    return {
      TSMethodSignature(node: TSESTree.TSMethodSignature): void {
        if (!isWindowInterfaceMember(node)) {
          return;
        }
        const name = getKeyName(node);
        if (!name) {
          return;
        }
        if (!functionFiles.has(name)) {
          context.report({
            data: { directory: FUNCTIONS_DIR, kind: 'method', memberName: name },
            messageId: 'missingFile',
            node
          });
          return;
        }
        validateWindowMemberImportsInFile(context, node, name, functionsDirectory, FUNCTIONS_DIR, getWindowImports());
      },
      TSPropertySignature(node: TSESTree.TSPropertySignature): void {
        if (!isWindowInterfaceMember(node)) {
          return;
        }
        const name = getKeyName(node);
        if (!name) {
          return;
        }
        if (!variableFiles.has(name)) {
          context.report({
            data: { directory: VARS_DIR, kind: 'property', memberName: name },
            messageId: 'missingFile',
            node
          });
          return;
        }
        validateWindowMemberImportsInFile(context, node, name, variablesDirectory, VARS_DIR, getWindowImports());
      }
    };
  },
  meta: {
    docs: {
      description: `Ensure globals/augmentations/functions/ and globals/augmentations/vars/ files are in sync with ${WINDOW_FILE_NAME} Window interface members`
    },
    messages: {
      importMismatchInFile: 'Import \'{{specifier}}\' from \'{{module}}\' for member \'{{memberName}}\' does not match \'{{directory}}/{{memberName}}.d.ts\'.',
      importMismatchInWindow: `Import '{{specifier}}' from '{{module}}' does not match ${WINDOW_FILE_NAME}.`,
      missingFile: 'Window interface {{kind}} \'{{memberName}}\' has no corresponding file in \'{{directory}}/{{memberName}}.d.ts\'.',
      missingWindowMember: `File '{{fileName}}' has no corresponding {{kind}} in ${WINDOW_FILE_NAME} Window interface.`
    },
    type: 'problem' as const
  }
};

function getKeyName(node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature): null | string {
  const key = node.key;
  if (key.type === AST_NODE_TYPES.Identifier) {
    return key.name;
  }
  return key.type === AST_NODE_TYPES.Literal && typeof key.value === 'string' ? key.value : null;
}

function isWindowInterfaceMember(node: TSESTree.Node): boolean {
  const body = node.parent;
  return body?.type === AST_NODE_TYPES.TSInterfaceBody && body.parent.id.name === 'Window';
}
