import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { normalizePath } from './utils.ts';

function isGlobalVarsFile(filename: string): boolean {
  return normalizePath(filename).includes('/globals/augmentations/vars/');
}

export const requireVarInGlobalVars = {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'Variables in globals/augmentations/vars/ must use `var` (not `const`/`let`) inside `declare global` so they appear on `globalThis`.'
    },
    messages: {
      requireVar: 'Use `var` instead of `{{kind}}` in `declare global` blocks. Only `var` declarations become properties of `globalThis`.'
    }
  },
  create(context: RuleContext) {
    if (!isGlobalVarsFile(context.filename)) {
      return {};
    }

    function isInsideDeclareGlobal(node: TSESTree.Node): boolean {
      let current: TSESTree.Node | undefined = node.parent;
      while (current) {
        if (
          current.type === 'TSModuleDeclaration'
          && current.declare
          && current.global
        ) {
          return true;
        }
        current = current.parent;
      }
      return false;
    }

    return {
      VariableDeclaration(node: TSESTree.VariableDeclaration): void {
        if (node.kind !== 'var' && isInsideDeclareGlobal(node)) {
          context.report({
            node,
            messageId: 'requireVar',
            data: { kind: node.kind }
          });
        }
      }
    };
  }
};
