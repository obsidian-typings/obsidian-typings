import {
  existsSync,
  readdirSync,
  readFileSync
} from 'fs';
import {
  basename,
  dirname,
  join
} from 'path';

import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { normalizePath } from './utils.ts';

const WINDOWS_FILE_SUFFIX = '/globals/augmentations/Windows.d.ts';
const FUNCTIONS_DIR = 'functions';
const VARS_DIR = 'vars';

function isWindowsFile(filename: string): boolean {
  return normalizePath(filename).endsWith(WINDOWS_FILE_SUFFIX);
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

function windowsFileHasMember(windowsFilePath: string, memberName: string, kind: 'method' | 'property'): boolean {
  try {
    const content = readFileSync(windowsFilePath, 'utf8');
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

export const windowMemberFileSync = {
  meta: {
    type: 'problem' as const,
    docs: {
      description:
        'Ensure globals/augmentations/functions/ and globals/augmentations/vars/ files are in sync with Windows.d.ts Window interface members'
    },
    messages: {
      missingFile:
        'Window interface {{kind}} \'{{memberName}}\' has no corresponding file in \'{{dir}}/{{memberName}}.d.ts\'.',
      missingWindowMember: 'File \'{{fileName}}\' has no corresponding {{kind}} in Windows.d.ts Window interface.'
    }
  },
  create(context: RuleContext) {
    const filename = normalizePath(context.filename);

    // --- Running on a function file: check it has a matching method in Windows.d.ts ---
    if (isGlobalsFunctionFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augDir = getGlobalsAugmentationsDir(filename);
      const windowsFilePath = join(augDir, 'Windows.d.ts');

      if (!windowsFileHasMember(windowsFilePath, memberName, 'method')) {
        return {
          Program(node: TSESTree.Program): void {
            context.report({
              node,
              messageId: 'missingWindowMember',
              data: { fileName: `${FUNCTIONS_DIR}/${memberName}.d.ts`, kind: 'method' }
            });
          }
        };
      }
      return {};
    }

    // --- Running on a var file: check it has a matching property in Windows.d.ts ---
    if (isGlobalsVarFile(filename)) {
      const memberName = getMemberNameFromFilename(filename);
      const augDir = getGlobalsAugmentationsDir(filename);
      const windowsFilePath = join(augDir, 'Windows.d.ts');

      if (!windowsFileHasMember(windowsFilePath, memberName, 'property')) {
        return {
          Program(node: TSESTree.Program): void {
            context.report({
              node,
              messageId: 'missingWindowMember',
              data: { fileName: `${VARS_DIR}/${memberName}.d.ts`, kind: 'property' }
            });
          }
        };
      }
      return {};
    }

    // --- Running on Windows.d.ts: check each Window member has a corresponding file ---
    if (!isWindowsFile(filename)) {
      return {};
    }

    const augDir = dirname(filename);
    const functionsDir = join(augDir, FUNCTIONS_DIR);
    const varsDir = join(augDir, VARS_DIR);
    const functionFiles = new Set(listDtsFiles(functionsDir));
    const varFiles = new Set(listDtsFiles(varsDir));

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
        }
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
        }
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

function getKeyName(node: TSESTree.TSMethodSignature | TSESTree.TSPropertySignature): string | null {
  const key = node.key;
  if (key.type === 'Identifier') {
    return key.name;
  }
  if (key.type === 'Literal' && typeof key.value === 'string') {
    return key.value;
  }
  return null;
}
