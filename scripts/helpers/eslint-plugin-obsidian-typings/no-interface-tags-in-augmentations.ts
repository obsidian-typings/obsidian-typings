import type { TSESTree } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getJSDocComment,
  hasJSDocTag,
  isAugmentationFile
} from './utils.ts';

export const noInterfaceTagsInAugmentations = {
  create(context: RuleContext): RuleListener {
    if (!isAugmentationFile(context.filename)) {
      return {};
    }

    return {
      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
        const name = node.id.name;
        const jsDoc = getJSDocComment(context.sourceCode, node);
        if (!jsDoc) {
          return;
        }
        if (hasJSDocTag(jsDoc, 'public')) {
          context.report({ data: { name }, messageId: 'noPublic', node });
        }
        if (hasJSDocTag(jsDoc, 'unofficial')) {
          context.report({ data: { name }, messageId: 'noUnofficial', node });
        }
      }
    };
  },
  meta: {
    docs: { description: 'Augmentation interface-level TSDoc must not use @public/@unofficial' },
    messages: {
      noPublic: 'Interface "{{name}}" in augmentation file must not have @public tag (per-member tags handle it).',
      noUnofficial: 'Interface "{{name}}" in augmentation file must not have @unofficial tag (per-member tags handle it).'
    },
    type: 'problem' as const
  }
};
