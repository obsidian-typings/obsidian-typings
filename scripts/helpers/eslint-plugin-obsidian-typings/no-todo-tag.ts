import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isJSDocComment } from './utils.ts';

export const noTodoTag = {
  create(context: RuleContext): RuleListener {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();
        for (const comment of comments) {
          if (isJSDocComment(comment) && /@todo\b/i.test(comment.value)) {
            context.report({ messageId: 'noTodo', node: comment });
          }
        }
      }
    };
  },
  meta: {
    docs: { description: 'Disallow @todo tags in TSDoc comments' },
    messages: {
      noTodo: 'TSDoc comments must not contain @todo tags.'
    },
    type: 'problem' as const
  }
};
