import type { RuleContext } from './utils.ts';

const TRAILING_TAGS = ['deprecated', 'official', 'public', 'since', 'unofficial'];

export const visibilityTagsLast = {
  meta: {
    type: 'problem' as const,
    docs: { description: '@public, @unofficial, and @official tags must be the last tags in TSDoc comments' },
    messages: {
      notLast: '@{{tag}} must be the last tag(s) in the TSDoc comment. No other tags should follow it.'
    }
  },
  create(context: RuleContext) {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if ((comment.type as string) !== 'Block' || !comment.value.startsWith('*')) {
            continue;
          }

          const strippedValue = comment.value.replace(/\{@\w+\b[^}]*\}/g, '');
          const tagMatches = [...strippedValue.matchAll(/@(\w+)/g)];
          if (tagMatches.length === 0) {
            continue;
          }

          let lastNonVisibilityIndex = -1;
          let firstVisibilityIndex = -1;

          for (let i = 0; i < tagMatches.length; i++) {
            const tagName = tagMatches[i]![1]!;
            if (TRAILING_TAGS.includes(tagName)) {
              if (firstVisibilityIndex === -1) {
                firstVisibilityIndex = i;
              }
            } else {
              lastNonVisibilityIndex = i;
            }
          }

          if (firstVisibilityIndex !== -1 && lastNonVisibilityIndex > firstVisibilityIndex) {
            const violatingTag = tagMatches[firstVisibilityIndex]![1]!;
            context.report({
              data: { tag: violatingTag },
              messageId: 'notLast',
              node: comment
            });
          }
        }
      }
    };
  }
};
