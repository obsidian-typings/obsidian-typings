import type { TSESLint } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  KeyedNode,
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getMemberName,
  isDirectInterfaceMember
} from './utils.ts';

export const requireOptionalUnderscoreMembers = {
  create(context: RuleContext): RuleListener {
    function validateMember(node: KeyedNode): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }
      if (node.type !== AST_NODE_TYPES.TSMethodSignature && node.type !== AST_NODE_TYPES.TSPropertySignature) {
        return;
      }

      const name = getMemberName(node);
      if (!name.endsWith('__') || node.optional) {
        return;
      }

      // A getter/setter cannot be marked optional. Convert a getter phantom to its inert-marker
      // equivalent — a readonly optional property. Setters have no such equivalent, so leave them.
      if (node.type === AST_NODE_TYPES.TSMethodSignature && node.kind !== 'method') {
        const returnType = node.returnType;
        if (node.kind !== 'get' || !returnType) {
          return;
        }
        const typeText = context.sourceCode.getText().slice(returnType.typeAnnotation.range[0], returnType.typeAnnotation.range[1]);
        context.report({
          data: { name },
          fix(fixer: TSESLint.RuleFixer): TSESLint.RuleFix {
            return fixer.replaceTextRange(node.range, `readonly ${name}?: ${typeText}`);
          },
          messageId: 'mustBeOptional',
          node
        });
        return;
      }

      context.report({
        data: { name },
        fix(fixer: TSESLint.RuleFixer): TSESLint.RuleFix {
          return fixer.insertTextAfterRange(node.key.range, '?');
        },
        messageId: 'mustBeOptional',
        node
      });
    }

    return {
      TSMethodSignature: validateMember,
      TSPropertySignature: validateMember
    };
  },
  meta: {
    docs: { description: 'Phantom "__" typing-helper interface members must be optional.' },
    fixable: 'code' as const,
    messages: {
      mustBeOptional: 'Phantom "__" typing-helper member "{{name}}" must be optional (add "?").'
    },
    type: 'problem' as const
  }
};
