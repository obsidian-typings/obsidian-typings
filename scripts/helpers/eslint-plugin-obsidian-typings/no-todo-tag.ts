import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

export const noTodoTag = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Disallow @todo tags in TSDoc comments' },
    messages: {
      noTodo: 'TSDoc comments must not contain @todo tags.'
    }
  },
  create(context: RuleContext) {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();
        for (const comment of comments) {
          if ((comment.type as string) === 'Block' && comment.value.startsWith('*') && /@todo\b/i.test(comment.value)) {
            context.report({ node: comment as unknown as TSESTree.Node, messageId: 'noTodo' });
          }
        }
      }
    };
  }
};
