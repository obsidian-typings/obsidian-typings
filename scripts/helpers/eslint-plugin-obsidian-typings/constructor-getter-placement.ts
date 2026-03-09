import {
  existsSync,
  readdirSync,
  readFileSync
} from 'fs';
import {
  dirname,
  join,
  resolve
} from 'path';

import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { normalizePath } from './utils.ts';

function isConstructorGetterFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes('/implementations/constructors/')
    && /\/get\w+Constructor\.ts$/.test(normalized);
}

/**
 * Recursively search for `<typeName>.d.ts` under a directory.
 */
function findAugmentationFile(dir: string, typeName: string): string | null {
  const target = `${typeName}.d.ts`;
  try {
    // Check directory is readable
    readdirSync(dir);
  } catch {
    return null;
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === target) {
      return join(dir, entry.name);
    }
    if (entry.isDirectory()) {
      const found = findAugmentationFile(join(dir, entry.name), typeName);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

/**
 * Check if a file contains `constructor__`, `constructor2__`, `constructor3__`, `constructor4__`, or `constructor5__` as an interface method.
 */
function fileHasConstructorMethod(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf8');
    return /\bconstructor[2345]?__\s*[<(]/.test(content);
  } catch {
    return false;
  }
}

/**
 * Resolve the source file for a type imported in a getter.
 * For 'obsidian' module imports, searches the augmentations directory.
 * For relative imports, resolves the path directly.
 */
function resolveTypeSourceFile(
  importSource: string,
  typeName: string,
  getterFilePath: string
): string | null {
  if (importSource === 'obsidian') {
    // Find the project root by walking up from the getter file
    const normalized = normalizePath(getterFilePath);
    const srcIndex = normalized.indexOf('/src/obsidian/');
    if (srcIndex === -1) {
      return null;
    }
    const augDir = normalized.substring(0, srcIndex) + '/src/obsidian/augmentations';
    return findAugmentationFile(augDir, typeName);
  }

  // Relative import — resolve from the getter file's directory
  const dir = dirname(getterFilePath);
  const resolved = resolve(dir, importSource);
  if (existsSync(resolved)) {
    return resolved;
  }
  return null;
}

export const constructorGetterPlacement = {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'Ensure types used in constructor getters have a constructorN__ method'
    },
    messages: {
      missingConstructorMethod:
        'Type \'{{typeName}}\' (from \'{{importSource}}\') must have a `constructor[N]__` method.'
    }
  },
  create(context: RuleContext) {
    if (!isConstructorGetterFile(context.filename)) {
      return {};
    }

    // Collect imports: map type name -> import source
    const importSources = new Map<string, string>();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        const source = node.source.value;
        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportSpecifier') {
            importSources.set(specifier.local.name, source);
          }
        }
      },
      // Check type aliases like: type FooConstructor = ExtractConstructor<Foo>;
      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration): void {
        // Only check aliases that use ExtractConstructor
        const typeAnnotation = node.typeAnnotation;
        if (typeAnnotation.type !== 'TSTypeReference') {
          return;
        }
        const typeRef = typeAnnotation;
        if (typeRef.typeName.type !== 'Identifier' || typeRef.typeName.name !== 'ExtractConstructor') {
          return;
        }
        if (!typeRef.typeArguments || typeRef.typeArguments.params.length === 0) {
          return;
        }

        // Extract the main type name from ExtractConstructor<TypeName> or ExtractConstructor<TypeName<...>>
        const param = typeRef.typeArguments.params[0];
        if (!param) {
          return;
        }

        let typeName: string | null = null;
        if (param.type === 'TSTypeReference' && param.typeName.type === 'Identifier') {
          typeName = param.typeName.name;
        }

        if (!typeName) {
          return;
        }

        const importSource = importSources.get(typeName);
        if (!importSource) {
          return;
        }

        const sourceFile = resolveTypeSourceFile(importSource, typeName, context.filename);
        if (!sourceFile) {
          // Can't find the source file — skip silently
          return;
        }

        if (!fileHasConstructorMethod(sourceFile)) {
          context.report({
            node,
            messageId: 'missingConstructorMethod',
            data: { typeName, importSource }
          });
        }
      }
    };
  }
};
