import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isJSDocComment } from './utils.ts';

const TRAILING_TAGS = new Set(['deprecated', 'official', 'public', 'since', 'unofficial']);

export const visibilityTagsLast = {
  create(context: RuleContext): RuleListener {
    return {
      Program(): void {
        const sourceCode = context.sourceCode;
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (!isJSDocComment(comment)) {
            continue;
          }

          const strippedValue = comment.value.replaceAll(/\{@\w+\b[^}]*\}/g, '');
          const tagMatches = [...strippedValue.matchAll(/@(?<tagName>\w+)/g)];
          if (tagMatches.length === 0) {
            continue;
          }

          let lastNonVisibilityIndex = -1;
          let firstVisibilityIndex = -1;

          for (const [index, tagMatch] of tagMatches.entries()) {
            if (!TRAILING_TAGS.has(tagMatch.groups?.['tagName'] ?? '')) {
              lastNonVisibilityIndex = index;
              continue;
            }
            if (firstVisibilityIndex === -1) {
              firstVisibilityIndex = index;
            }
          }

          if (firstVisibilityIndex === -1 || lastNonVisibilityIndex <= firstVisibilityIndex) {
            continue;
          }

          const violatingTag = tagMatches[firstVisibilityIndex]?.groups?.['tagName'] ?? '';
          context.report({
            data: { tag: violatingTag },
            messageId: 'notLast',
            node: comment
          });
        }
      }
    };
  },
  meta: {
    docs: { description: '@public, @unofficial, and @official tags must be the last tags in TSDoc comments' },
    messages: {
      notLast: '@{{tag}} must be the last tag(s) in the TSDoc comment. No other tags should follow it.'
    },
    type: 'problem' as const
  }
};
