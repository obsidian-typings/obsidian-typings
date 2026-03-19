import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
  isAugmentationFile,
  isImplementationsFile,
  isIndexFile
} from './utils.ts';

export const requireExportEmptyInAugmentations = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Augmentation files must contain `export {};`.' },
    messages: {
      missingExportEmpty: 'Augmentation files must contain `export {};`.'
    }
  },
  create(context: RuleContext) {
    if (!isAugmentationFile(context.filename) || isImplementationsFile(context.filename) || isIndexFile(context.filename)) {
      return {};
    }

    let hasExportEmpty = false;

    return {
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        if (!node.declaration && node.specifiers.length === 0 && !node.source) {
          hasExportEmpty = true;
        }
      },
      'Program:exit'(node: TSESTree.Program): void {
        if (!hasExportEmpty) {
          context.report({ node, messageId: 'missingExportEmpty' });
        }
      }
    };
  }
};
