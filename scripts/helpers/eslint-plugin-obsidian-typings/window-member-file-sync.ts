import type { TSESTree } from '@typescript-eslint/utils';

import {
  readdirSync,
  readFileSync
} from 'fs';
import {
  basename,
  dirname,
  join,
  resolve
} from 'path';

import type { RuleContext } from './utils.ts';

import { normalizePath } from './utils.ts';

const WINDOW_FILE_SUFFIX = '/globals/augmentations/Window.d.ts';
const WINDOW_FILE_NAME = 'Window.d.ts';
const FUNCTIONS_DIR = 'functions';
const VARS_DIR = 'vars';

function isWindowFile(filename: string): boolean {
  return normalizePath(filename).endsWith(WINDOW_FILE_SUFFIX);
}

function isGlobalsFunctionFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes(`/globals/augmentations/${FUNCTIONS_DIR}/`)
    && normalized.endsWith('.d.ts');
}

function isGlobalsVarFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes(`/globals/augmentations/${VARS_DIR}/`)
    && normalized.endsWith('.d.ts');
}

function getGlobalsAugmentationsDir(filename: string): string {
  const normalized = normalizePath(filename);
  const idx = normalized.indexOf('/globals/augmentations/');
  return normalized.substring(0, idx) + '/globals/augmentations/';
}

function getMemberNameFromFilename(filename: string): string {
  return basename(filename, '.d.ts');
}

function listDtsFiles(dirPath: string): string[] {
  try {
    return readdirSync(dirPath)
      .filter((f) => f.endsWith('.d.ts'))
      .map((f) => f.replace(/\.d\.ts$/, ''));
  } catch {
    return [];
  }
}

function windowFileHasMember(windowFilePath: string, memberName: string, kind: 'method' | 'property'): boolean {
  try {
    const content = readFileSync(windowFilePath, 'utf8');
    if (kind === 'method') {
      // Match method declarations like: memberName(...) or memberName<...>(...)
      return new RegExp(`\\b${escapeRegExp(memberName)}\\s*[<(]`).test(content);
    }
    // Match property declarations like: memberName: or memberName?: or memberName;
    return new RegExp(`\\b${escapeRegExp(memberName)}\\s*[?:;]`).test(content);
  } catch {
    return false;
  }
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface ImportSpec {
  imported: string;
  local: string;
  originalModule: string;
  resolvedModule: string;
}

function stripComments(text: string): string {
  return text.replace(/\/\/[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
}

function parseImportSpecsFromContent(content: string, fileDir: string): ImportSpec[] {
  const result: ImportSpec[] = [];
  const importRegex = /import\s+type\s+\{([\s\S]*?)\}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const specText = stripComments(match[1] ?? '');
    const modulePath = match[2] ?? '';
    const resolvedModule = modulePath.startsWith('.')
      ? normalizePath(resolve(fileDir, modulePath))
      : modulePath;

    for (const raw of specText.split(',')) {
      const trimmed = raw.trim();
      if (!trimmed) {
        continue;
      }
      const asMatch = trimmed.match(/^(.+?)\s+as\s+(.+)$/);
      if (asMatch) {
        const imported = asMatch[1] ?? '';
        const local = asMatch[2] ?? '';
        result.push({ originalModule: modulePath, resolvedModule, imported: imported.trim(), local: local.trim() });
      } else {
        result.push({ originalModule: modulePath, resolvedModule, imported: trimmed, local: trimmed });
      }
    }
  }
  return result;
}

function formatSpecifier(spec: ImportSpec): string {
  return spec.imported === spec.local ? spec.local : `${spec.imported} as ${spec.local}`;
}

function specExistsIn(spec: ImportSpec, specs: ImportSpec[]): boolean {
  return specs.some((s) =>
    s.resolvedModule === spec.resolvedModule
    && s.imported === spec.imported
    && s.local === spec.local
  );
}

type GetTextNode = Parameters<RuleContext['sourceCode']['getText']>[0];

function getMemberTypeText(
  context: RuleContext,
  node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature
): string {
  if (node.type === 'TSPropertySignature') {
    return node.typeAnnotation ? context.sourceCode.getText(node.typeAnnotation as unknown as GetTextNode) : '';
  }
  const parts: string[] = [];
  if (node.typeParameters) {
    parts.push(context.sourceCode.getText(node.typeParameters as unknown as GetTextNode));
  }
  for (const param of node.params) {
    parts.push(context.sourceCode.getText(param as unknown as GetTextNode));
  }
  if (node.returnType) {
    parts.push(context.sourceCode.getText(node.returnType as unknown as GetTextNode));
  }
  return parts.join(' ');
}

function checkFileImportsMatchWindow(
  context: RuleContext,
  node: TSESTree.Program,
  filename: string,
  windowFilePath: string,
  augDir: string
): void {
  try {
    const fileContent = readFileSync(filename, 'utf8');
    const windowContent = readFileSync(windowFilePath, 'utf8');

    const fileImports = parseImportSpecsFromContent(fileContent, dirname(filename));
    const windowImports = parseImportSpecsFromContent(windowContent, augDir);

    for (const spec of fileImports) {
      if (!specExistsIn(spec, windowImports)) {
        context.report({
          node,
          messageId: 'importMismatchInWindow',
          data: { specifier: formatSpecifier(spec), module: spec.originalModule }
        });
      }
    }
  } catch {
    // If we can't read files, skip the check.
  }
}

function checkWindowMemberImportsInFile(
  context: RuleContext,
  node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature,
  memberName: string,
  memberDir: string,
  dirName: string,
  windowImports: ImportSpec[]
): void {
  try {
    const memberTypeText = getMemberTypeText(context, node);
    const allLocals = windowImports.map((s) => s.local);
    const referencedLocals = new Set(
      allLocals.filter((local) => new RegExp(`\\b${escapeRegExp(local)}\\b`).test(memberTypeText))
    );

    const neededSpecs = windowImports.filter((s) => referencedLocals.has(s.local));

    const filePath = join(memberDir, `${memberName}.d.ts`);
    const fileContent = readFileSync(filePath, 'utf8');
    const fileImports = parseImportSpecsFromContent(fileContent, memberDir);

    for (const spec of neededSpecs) {
      if (!specExistsIn(spec, fileImports)) {
        context.report({
          node,
          messageId: 'importMismatchInFile',
          data: { specifier: formatSpecifier(spec), module: spec.originalModule, memberName, dir: dirName }
        });
      }
    }
  } catch {
    // If we can't read the member file, skip the check.
  }
}

export const windowMemberFileSync = {
  meta: {
    type: 'problem' as const,
    docs: {
      description: `Ensure globals/augmentations/functions/ and globals/augmentations/vars/ files are in sync with ${WINDOW_FILE_NAME} Window interface members`
    },
    messages: {
      importMismatchInFile: 'Import \'{{specifier}}\' from \'{{module}}\' for member \'{{memberName}}\' does not match \'{{dir}}/{{memberName}}.d.ts\'.',
      importMismatchInWindow: `Import '{{specifier}}' from '{{module}}' does not match ${WINDOW_FILE_NAME}.`,
      missingFile: 'Window interface {{kind}} \'{{memberName}}\' has no corresponding file in \'{{dir}}/{{memberName}}.d.ts\'.',
      missingWindowMember: `File \'{{fileName}}\' has no corresponding {{kind}} in ${WINDOW_FILE_NAME} Window interface.`
    }
  },
  create(context: RuleContext) {
    const filename = normalizePath(context.filename);

    if (isGlobalsFunctionFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augDir = getGlobalsAugmentationsDir(filename);
      const windowFilePath = join(augDir, WINDOW_FILE_NAME);
      const hasMember = windowFileHasMember(windowFilePath, memberName, 'method');

      return {
        Program(node: TSESTree.Program): void {
          if (!hasMember) {
            context.report({
              node,
              messageId: 'missingWindowMember',
              data: { fileName: `${FUNCTIONS_DIR}/${memberName}.d.ts`, kind: 'method' }
            });
            return;
          }
          checkFileImportsMatchWindow(context, node, filename, windowFilePath, augDir);
        }
      };
    }

    if (isGlobalsVarFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augDir = getGlobalsAugmentationsDir(filename);
      const windowFilePath = join(augDir, WINDOW_FILE_NAME);
      const hasMember = windowFileHasMember(windowFilePath, memberName, 'property');

      return {
        Program(node: TSESTree.Program): void {
          if (!hasMember) {
            context.report({
              node,
              messageId: 'missingWindowMember',
              data: { fileName: `${VARS_DIR}/${memberName}.d.ts`, kind: 'property' }
            });
            return;
          }
          checkFileImportsMatchWindow(context, node, filename, windowFilePath, augDir);
        }
      };
    }

    if (!isWindowFile(filename)) {
      return {};
    }

    const augDir = dirname(filename);
    const functionsDir = join(augDir, FUNCTIONS_DIR);
    const varsDir = join(augDir, VARS_DIR);
    const functionFiles = new Set(listDtsFiles(functionsDir));
    const varFiles = new Set(listDtsFiles(varsDir));

    let windowImports: ImportSpec[] | null = null;
    function getWindowImports(): ImportSpec[] {
      if (!windowImports) {
        const content = readFileSync(filename, 'utf8');
        windowImports = parseImportSpecsFromContent(content, augDir);
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
            node,
            messageId: 'missingFile',
            data: { kind: 'method', memberName: name, dir: FUNCTIONS_DIR }
          });
          return;
        }
        checkWindowMemberImportsInFile(context, node, name, functionsDir, FUNCTIONS_DIR, getWindowImports());
      },
      TSPropertySignature(node: TSESTree.TSPropertySignature): void {
        if (!isWindowInterfaceMember(node)) {
          return;
        }
        const name = getKeyName(node);
        if (!name) {
          return;
        }
        if (!varFiles.has(name)) {
          context.report({
            node,
            messageId: 'missingFile',
            data: { kind: 'property', memberName: name, dir: VARS_DIR }
          });
          return;
        }
        checkWindowMemberImportsInFile(context, node, name, varsDir, VARS_DIR, getWindowImports());
      }
    };
  }
};

function isWindowInterfaceMember(node: TSESTree.Node): boolean {
  const body = node.parent;
  if (body?.type !== 'TSInterfaceBody') {
    return false;
  }
  const iface = body.parent;
  if (iface?.type !== 'TSInterfaceDeclaration') {
    return false;
  }
  return iface.id.name === 'Window';
}

function getKeyName(node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature): null | string {
  const key = node.key;
  if (key.type === 'Identifier') {
    return key.name;
  }
  if (key.type === 'Literal' && typeof key.value === 'string') {
    return key.value;
  }
  return null;
}
