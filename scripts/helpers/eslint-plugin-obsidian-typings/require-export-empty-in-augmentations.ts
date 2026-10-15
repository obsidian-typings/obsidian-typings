import type { TSESTree } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  isAugmentationFile,
  isImplementationsFile,
  isIndexFile
} from './utils.ts';

export const requireExportEmptyInAugmentations = {
  create(context: RuleContext): RuleListener {
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
          context.report({ messageId: 'missingExportEmpty', node });
        }
      }
    };
  },
  meta: {
    docs: { description: 'Augmentation files must contain `export {};`.' },
    messages: {
      missingExportEmpty: 'Augmentation files must contain `export {};`.'
    },
    type: 'problem' as const
  }
};
