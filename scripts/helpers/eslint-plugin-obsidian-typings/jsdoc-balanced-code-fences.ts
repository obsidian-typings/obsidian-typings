import type { TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

import type { RuleContext } from './utils.ts';

const FENCE_LINE_REG_EXP = /^(`{3,})/;
const LINE_PREFIX_REG_EXP = /^(\s*\*)/;
const LINE_PREFIX_STRIP_REG_EXP = /^\s*\*? ?/;
const TAG_LINE_REG_EXP = /^@\w/;

interface UnclosedFence {
  fenceMarker: string;
  openLineIndex: number;
}

function stripLinePrefix(line: string): string {
  return line.replace(LINE_PREFIX_STRIP_REG_EXP, '').trim();
}

/**
 * Finds the code fence that is opened inside a JSDoc comment and never closed.
 * Returns `null` when every fence in the comment is balanced.
 */
function findUnclosedFence(lines: string[]): null | UnclosedFence {
  let open: null | UnclosedFence = null;

  for (let i = 0; i < lines.length; i++) {
    const match = FENCE_LINE_REG_EXP.exec(stripLinePrefix(lines[i]!));
    if (!match) {
      continue;
    }

    if (open) {
      open = null;
    } else {
      open = { fenceMarker: match[1]!, openLineIndex: i };
    }
  }

  return open;
}

/**
 * Finds the first tag line after the unclosed fence was opened. The fence has to close before the tag
 * block starts, so that line is the only place a fix can put the closing fence.
 */
function findFirstTagLineIndex(lines: string[], afterIndex: number): number {
  for (let i = afterIndex + 1; i < lines.length; i++) {
    if (TAG_LINE_REG_EXP.test(stripLinePrefix(lines[i]!))) {
      return i;
    }
  }

  return -1;
}

export const jsdocBalancedCodeFences = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Require every code fence opened in a JSDoc comment to be closed in the same comment' },
    fixable: 'code' as const,
    messages: {
      unclosedFence: 'JSDoc comment opens a code fence that is never closed, so every tag after it is swallowed by the code block.'
    }
  },
  create(context: RuleContext) {
    return {
      Program(): void {
        for (const comment of context.sourceCode.getAllComments()) {
          if ((comment.type as string) !== 'Block' || !comment.value.startsWith('*')) {
            continue;
          }

          const lines = comment.value.split('\n');
          const unclosedFence = findUnclosedFence(lines);
          if (!unclosedFence) {
            continue;
          }

          const tagLineIndex = findFirstTagLineIndex(lines, unclosedFence.openLineIndex);
          const commentNode = comment as unknown as TSESTree.Comment;

          context.report({
            fix: tagLineIndex === -1
              ? null
              : (fixer: Rule.RuleFixer): Rule.Fix => {
                const prefix = LINE_PREFIX_REG_EXP.exec(lines[tagLineIndex]!)?.[1] ?? ' *';
                const fixedLines = [...lines];
                fixedLines.splice(tagLineIndex, 0, `${prefix} ${unclosedFence.fenceMarker}`);
                return fixer.replaceTextRange(
                  [commentNode.range![0], commentNode.range![1]],
                  `/*${fixedLines.join('\n')}*/`
                );
              },
            loc: commentNode.loc!,
            messageId: 'unclosedFence'
          });
        }
      }
    };
  }
};
