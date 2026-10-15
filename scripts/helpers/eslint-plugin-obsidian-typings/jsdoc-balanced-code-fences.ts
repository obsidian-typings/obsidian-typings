import type { TSESLint } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isJSDocComment } from './utils.ts';

const FENCE_LINE_REG_EXP = /^(?<fenceMarker>`{3,})/;
const LINE_PREFIX_REG_EXP = /^(?<prefix>\s*\*)/;
const LINE_PREFIX_STRIP_REG_EXP = /^\s*\*? ?/;
const TAG_LINE_REG_EXP = /^@\w/;

interface UnclosedFence {
  fenceMarker: string;
  openLineIndex: number;
}

/**
 * Finds the first tag line after the unclosed fence was opened. The fence has to close before the tag
 * block starts, so that line is the only place a fix can put the closing fence.
 */
function findFirstTagLineIndex(lines: string[], afterIndex: number): number {
  return lines.findIndex((line, index) => index > afterIndex && TAG_LINE_REG_EXP.test(stripLinePrefix(line)));
}

/**
 * Finds the code fence that is opened inside a JSDoc comment and never closed.
 * Returns `null` when every fence in the comment is balanced.
 */
function findUnclosedFence(lines: string[]): null | UnclosedFence {
  let open: null | UnclosedFence = null;

  for (const [index, line] of lines.entries()) {
    const fenceMarker = FENCE_LINE_REG_EXP.exec(stripLinePrefix(line))?.groups?.['fenceMarker'];
    if (fenceMarker === undefined) {
      continue;
    }

    open = open ? null : { fenceMarker, openLineIndex: index };
  }

  return open;
}

function stripLinePrefix(line: string): string {
  return line.replace(LINE_PREFIX_STRIP_REG_EXP, '').trim();
}

export const jsdocBalancedCodeFences = {
  create(context: RuleContext): RuleListener {
    return {
      Program(): void {
        for (const comment of context.sourceCode.getAllComments()) {
          if (!isJSDocComment(comment)) {
            continue;
          }

          const lines = comment.value.split('\n');
          const unclosedFence = findUnclosedFence(lines);
          if (!unclosedFence) {
            continue;
          }

          const tagLineIndex = findFirstTagLineIndex(lines, unclosedFence.openLineIndex);
          context.report({
            fix: tagLineIndex === -1
              ? null
              : (fixer: TSESLint.RuleFixer): TSESLint.RuleFix => {
                const prefix = LINE_PREFIX_REG_EXP.exec(lines[tagLineIndex] ?? '')?.groups?.['prefix'] ?? ' *';
                const fixedLines = [...lines];
                fixedLines.splice(tagLineIndex, 0, `${prefix} ${unclosedFence.fenceMarker}`);
                return fixer.replaceTextRange(
                  [comment.range[0], comment.range[1]],
                  `/*${fixedLines.join('\n')}*/`
                );
              },
            loc: comment.loc,
            messageId: 'unclosedFence'
          });
        }
      }
    };
  },
  meta: {
    docs: { description: 'Require every code fence opened in a JSDoc comment to be closed in the same comment' },
    fixable: 'code' as const,
    messages: {
      unclosedFence: 'JSDoc comment opens a code fence that is never closed, so every tag after it is swallowed by the code block.'
    },
    type: 'problem' as const
  }
};
