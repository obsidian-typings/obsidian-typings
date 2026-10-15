import type { TSESTree } from '@typescript-eslint/utils';

import type {
  KeyedNode,
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getJSDocComment,
  getMemberName,
  hasJSDocTag,
  isAugmentationFile,
  isDirectInterfaceMember
} from './utils.ts';

export const augmentationMemberTags = {
  create(context: RuleContext): RuleListener {
    if (!isAugmentationFile(context.filename)) {
      return {};
    }

    function validateMember(node: KeyedNode): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }

      const name = getMemberName(node);
      const jsDoc = getJSDocComment(context.sourceCode, node);
      const hasOfficial = jsDoc && hasJSDocTag(jsDoc, 'official');
      const hasUnofficial = jsDoc && hasJSDocTag(jsDoc, 'unofficial');
      if (!hasOfficial && !hasUnofficial) {
        context.report({ data: { name }, messageId: 'missing', node });
      } else if (hasOfficial && hasUnofficial) {
        context.report({ data: { name }, messageId: 'both', node });
      }
    }

    return {
      MethodDefinition: validateMember,
      PropertyDefinition: validateMember,
      TSIndexSignature(node: TSESTree.TSIndexSignature): void {
        if (!isDirectInterfaceMember(node)) {
          return;
        }
        const jsDoc = getJSDocComment(context.sourceCode, node);
        const hasOfficial = jsDoc && hasJSDocTag(jsDoc, 'official');
        const hasUnofficial = jsDoc && hasJSDocTag(jsDoc, 'unofficial');
        if (!hasOfficial && !hasUnofficial) {
          context.report({ data: { name: '[index]' }, messageId: 'missing', node });
        } else if (hasOfficial && hasUnofficial) {
          context.report({ data: { name: '[index]' }, messageId: 'both', node });
        }
      },
      TSMethodSignature: validateMember,
      TSPropertySignature: validateMember
    };
  },
  meta: {
    docs: { description: 'Members in augmentation files must have @official or @unofficial JSDoc tag' },
    messages: {
      both: 'Member "{{name}}" must not have both @official and @unofficial JSDoc tags.',
      missing: 'Member "{{name}}" in augmentation file must have @official or @unofficial JSDoc tag.'
    },
    type: 'problem' as const
  }
};
