import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

export const noInheritDocTag = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Disallow @inheritDoc tags in TSDoc comments' },
    messages: {
      noInheritDoc: 'TSDoc comments must not contain @inheritDoc tags.'
    }
  },
  create(context: RuleContext) {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();
        for (const comment of comments) {
          if ((comment.type as string) === 'Block' && comment.value.startsWith('*') && /@inheritDoc\b/i.test(comment.value)) {
            context.report({ node: comment as unknown as TSESTree.Node, messageId: 'noInheritDoc' });
          }
        }
      }
    };
  }
};
