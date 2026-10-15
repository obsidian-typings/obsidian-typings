import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isJSDocComment } from './utils.ts';

export const noInheritDocTag = {
  create(context: RuleContext): RuleListener {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();
        for (const comment of comments) {
          if (isJSDocComment(comment) && /@inheritDoc\b/i.test(comment.value)) {
            context.report({ messageId: 'noInheritDoc', node: comment });
          }
        }
      }
    };
  },
  meta: {
    docs: { description: 'Disallow @inheritDoc tags in TSDoc comments' },
    messages: {
      noInheritDoc: 'TSDoc comments must not contain @inheritDoc tags.'
    },
    type: 'problem' as const
  }
};
