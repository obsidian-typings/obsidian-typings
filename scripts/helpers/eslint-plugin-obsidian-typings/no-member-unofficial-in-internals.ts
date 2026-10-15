import type {
  KeyedNode,
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getJSDocComment,
  getMemberName,
  hasJSDocTag,
  isDirectInterfaceMember,
  isInternalsFile
} from './utils.ts';

export const noMemberUnofficialInInternals = {
  create(context: RuleContext): RuleListener {
    if (!isInternalsFile(context.filename)) {
      return {};
    }

    function validateMember(node: KeyedNode): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }

      const name = getMemberName(node);
      const jsDoc = getJSDocComment(context.sourceCode, node);
      if (jsDoc && hasJSDocTag(jsDoc, 'unofficial')) {
        context.report({ data: { name }, messageId: 'redundantUnofficial', node });
      }
      if (jsDoc && hasJSDocTag(jsDoc, 'official')) {
        context.report({ data: { name }, messageId: 'redundantOfficial', node });
      }
    }

    return {
      TSMethodSignature: validateMember,
      TSPropertySignature: validateMember
    };
  },
  meta: {
    docs: {
      description: 'Members in internals files must not have @unofficial or @official (interface-level tags cover them)'
    },
    messages: {
      redundantOfficial: 'Member "{{name}}" must not have @official tag (internals are always unofficial).',
      redundantUnofficial: 'Member "{{name}}" must not have @unofficial tag (interface-level tag covers it).'
    },
    type: 'problem' as const
  }
};
