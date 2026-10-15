import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import {
  existsSync,
  readdirSync,
  readFileSync
} from 'node:fs';
import {
  dirname,
  join,
  resolve
} from 'node:path';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { normalizePath } from './utils.ts';

/**
 * Recursively search for `<typeName>.d.ts` under a directory.
 */
function findAugmentationFile(directory: string, typeName: string): null | string {
  const target = `${typeName}.d.ts`;
  try {
    // Check directory is readable
    readdirSync(directory);
  } catch {
    return null;
  }

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === target) {
      return join(directory, entry.name);
    }
    if (!entry.isDirectory()) {
      continue;
    }
    const found = findAugmentationFile(join(directory, entry.name), typeName);
    if (found) {
      return found;
    }
  }
  return null;
}

/**
 * Extract the subdirectory under `augmentations/` from a full augmentation file path.
 * Returns the subdirectory name (e.g., 'bases', 'components', 'values', 'views')
 * or `null` if the file is directly under `augmentations/`.
 */
function getAugmentationSubdir(augFilePath: string): null | string {
  const normalized = normalizePath(augFilePath);
  const match = /\/augmentations\/(?<subdirectory>[^/]+)\/[^/]+$/.exec(normalized);
  return match?.groups?.['subdirectory'] ?? null;
}

/**
 * Extract the subdirectory under `implementations/constructors/augmentations/` from a getter file path.
 * Returns the subdirectory name or `null` if the file is directly under `augmentations/`.
 */
function getGetterSubdir(getterFilePath: string): null | string {
  const normalized = normalizePath(getterFilePath);
  const match = /\/implementations\/constructors\/augmentations\/(?<subdirectory>[^/]+)\/[^/]+$/.exec(normalized);
  return match?.groups?.['subdirectory'] ?? null;
}

/**
 * Check if a file contains `constructor__`, `constructor2__`, `constructor3__`, `constructor4__`, or `constructor5__` as an interface method.
 */
function hasConstructorMethod(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return /\bconstructor[2345]?__\s*[<(]/.test(content);
  } catch {
    return false;
  }
}

function isConstructorGetterFile(filename: string): boolean {
  const normalized = normalizePath(filename);
  return normalized.includes('/implementations/constructors/')
    && /\/get\w+Constructor\.ts$/.test(normalized);
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
): null | string {
  if (importSource === 'obsidian') {
    // Find the project root by walking up from the getter file
    const normalized = normalizePath(getterFilePath);
    const srcIndex = normalized.indexOf('/src/obsidian/');
    if (srcIndex === -1) {
      return null;
    }
    const augmentationsDirectory = `${normalized.slice(0, Math.max(0, srcIndex))}/src/obsidian/augmentations`;
    return findAugmentationFile(augmentationsDirectory, typeName);
  }

  // Relative import — resolve from the getter file's directory
  const resolved = resolve(dirname(getterFilePath), importSource);
  return existsSync(resolved) ? resolved : null;
}

export const constructorGetterPlacement = {
  create(context: RuleContext): RuleListener {
    if (!isConstructorGetterFile(context.filename)) {
      return {};
    }

    // Collect imports: map type name -> import source
    const importSources = new Map<string, string>();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        const source = node.source.value;
        for (const specifier of node.specifiers) {
          if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
            importSources.set(specifier.local.name, source);
          }
        }
      },
      // Check type aliases like: type FooConstructor = ExtractConstructor<Foo>;
      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration): void {
        // Only check aliases that use ExtractConstructor
        const typeAnnotation = node.typeAnnotation;
        if (typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference) {
          return;
        }
        const typeRef = typeAnnotation;
        if (typeRef.typeName.type !== AST_NODE_TYPES.Identifier || typeRef.typeName.name !== 'ExtractConstructor' || !typeRef.typeArguments || typeRef.typeArguments.params.length === 0) {
          return;
        }

        // Extract the main type name from ExtractConstructor<TypeName> or ExtractConstructor<TypeName<...>>
        const typeArgument = typeRef.typeArguments.params[0];
        if (!typeArgument) {
          return;
        }

        const typeName = typeArgument.type === AST_NODE_TYPES.TSTypeReference && typeArgument.typeName.type === AST_NODE_TYPES.Identifier
          ? typeArgument.typeName.name
          : null;

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

        if (!hasConstructorMethod(sourceFile)) {
          context.report({
            data: { importSource, typeName },
            messageId: 'missingConstructorMethod',
            node
          });
        }

        // Check parallel folder structure: getter subdirectory must match augmentation subdirectory
        const augSubdir = getAugmentationSubdir(sourceFile);
        const getterSubdir = getGetterSubdir(context.filename);
        if (augSubdir !== getterSubdir) {
          context.report({
            data: {
              augSubdir: augSubdir ?? '(root)',
              getterSubdir: getterSubdir ?? '(root)',
              typeName
            },
            messageId: 'subdirectoryMismatch',
            node
          });
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Ensure types used in constructor getters have a constructorN__ method'
    },
    messages: {
      missingConstructorMethod: 'Type \'{{typeName}}\' (from \'{{importSource}}\') must have a `constructor[N]__` method.',
      subdirectoryMismatch: 'Constructor getter is in \'{{getterSubdir}}\' but augmentation \'{{typeName}}\' is in \'{{augSubdir}}\'. They must be in the same subdirectory.'
    },
    type: 'problem' as const
  }
};
