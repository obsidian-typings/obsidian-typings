/*
 * `var` in this file's names is the keyword the rule requires, and `vars` is the `globals/augmentations/vars/`
 * folder it polices; neither is an abbreviation. The rule's id, `require-var-in-global-vars`, names the file.
 */
/* eslint-disable unicorn/name-replacements -- See the comment above. */
import type { TSESTree } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  isInsideDeclareGlobal,
  normalizePath
} from './utils.ts';

function isGlobalVarsFile(filename: string): boolean {
  return normalizePath(filename).includes('/globals/augmentations/vars/');
}

export const requireVarInGlobalVars = {
  create(context: RuleContext): RuleListener {
    if (!isGlobalVarsFile(context.filename)) {
      return {};
    }

    return {
      VariableDeclaration(node: TSESTree.VariableDeclaration): void {
        if (node.kind !== 'var' && isInsideDeclareGlobal(node)) {
          context.report({
            data: { kind: node.kind },
            messageId: 'requireVar',
            node
          });
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Variables in globals/augmentations/vars/ must use `var` (not `const`/`let`) inside `declare global` so they appear on `globalThis`.'
    },
    messages: {
      requireVar: 'Use `var` instead of `{{kind}}` in `declare global` blocks. Only `var` declarations become properties of `globalThis`.'
    },
    type: 'problem' as const
  }
};
/* eslint-enable unicorn/name-replacements -- Pairs with the disable at the top of the file. */
