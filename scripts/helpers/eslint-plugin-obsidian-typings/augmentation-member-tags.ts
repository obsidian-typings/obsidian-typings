import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
  getJSDocComment,
  getMemberName,
  hasJSDocTag,
  isAugmentationFile,
  isDirectInterfaceMember
} from './utils.ts';

export const augmentationMemberTags = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Members in augmentation files must have @official or @unofficial JSDoc tag' },
    messages: {
      missing: 'Member "{{name}}" in augmentation file must have @official or @unofficial JSDoc tag.'
    }
  },
  create(context: RuleContext) {
    if (!isAugmentationFile(context.filename)) {
      return {};
    }

    function checkMember(node: TSESTree.Node & { key?: TSESTree.Node }): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }

      const name = getMemberName(node);
      const jsDoc = getJSDocComment(context.sourceCode, node);
      if (!jsDoc || (!hasJSDocTag(jsDoc, 'official') && !hasJSDocTag(jsDoc, 'unofficial'))) {
        context.report({ node, messageId: 'missing', data: { name } });
      }
    }

    return {
      TSMethodSignature: checkMember,
      TSPropertySignature: checkMember,
      MethodDefinition: checkMember,
      PropertyDefinition: checkMember,
      TSIndexSignature(node: TSESTree.TSIndexSignature): void {
        if (!isDirectInterfaceMember(node)) {
          return;
        }
        const jsDoc = getJSDocComment(context.sourceCode, node);
        if (!jsDoc || (!hasJSDocTag(jsDoc, 'official') && !hasJSDocTag(jsDoc, 'unofficial'))) {
          context.report({ node, messageId: 'missing', data: { name: '[index]' } });
        }
      }
    };
  }
};
