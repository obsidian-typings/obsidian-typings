import type { Rule } from 'eslint';

import type {
  KeyedNode,
  RuleContext
} from './utils.ts';

import {
  getMemberName,
  isDirectInterfaceMember
} from './utils.ts';

export const requireOptionalUnderscoreMembers = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Phantom "__" typing-helper interface members must be optional.' },
    fixable: 'code' as const,
    messages: {
      mustBeOptional: 'Phantom "__" typing-helper member "{{name}}" must be optional (add "?").'
    }
  },
  create(context: RuleContext) {
    function checkMember(node: KeyedNode): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }
      if (node.type !== 'TSMethodSignature' && node.type !== 'TSPropertySignature') {
        return;
      }

      const name = getMemberName(node);
      if (!name.endsWith('__')) {
        return;
      }
      if (node.optional) {
        return;
      }

      // A getter/setter cannot be marked optional. Convert a getter phantom to its inert-marker
      // equivalent — a readonly optional property. Setters have no such equivalent, so leave them.
      if (node.type === 'TSMethodSignature' && node.kind !== 'method') {
        const returnType = node.returnType;
        if (node.kind !== 'get' || !returnType) {
          return;
        }
        const typeText = context.sourceCode.getText().slice(returnType.typeAnnotation.range[0], returnType.typeAnnotation.range[1]);
        context.report({
          node,
          messageId: 'mustBeOptional',
          data: { name },
          fix(fixer: Rule.RuleFixer): Rule.Fix {
            return fixer.replaceTextRange(node.range, `readonly ${name}?: ${typeText}`);
          }
        });
        return;
      }

      context.report({
        node,
        messageId: 'mustBeOptional',
        data: { name },
        fix(fixer: Rule.RuleFixer): Rule.Fix {
          return fixer.insertTextAfterRange(node.key.range, '?');
        }
      });
    }

    return {
      TSMethodSignature: checkMember,
      TSPropertySignature: checkMember
    };
  }
};
