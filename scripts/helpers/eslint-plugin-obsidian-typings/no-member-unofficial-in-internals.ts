import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
  getJSDocComment,
  getMemberName,
  hasJSDocTag,
  isDirectInterfaceMember,
  isInternalsFile
} from './utils.ts';

export const noMemberUnofficialInInternals = {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'Members in internals files must not repeat @unofficial (interface-level tag covers them)'
    },
    messages: {
      redundant: 'Member "{{name}}" must not have @unofficial tag (interface-level tag covers it).'
    }
  },
  create(context: RuleContext) {
    if (!isInternalsFile(context.filename)) {
      return {};
    }

    function checkMember(node: { key?: TSESTree.Node } & TSESTree.Node): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }

      const name = getMemberName(node);
      const jsDoc = getJSDocComment(context.sourceCode, node);
      if (jsDoc && hasJSDocTag(jsDoc, 'unofficial')) {
        context.report({ node, messageId: 'redundant', data: { name } });
      }
    }

    return {
      TSMethodSignature: checkMember,
      TSPropertySignature: checkMember
    };
  }
};
