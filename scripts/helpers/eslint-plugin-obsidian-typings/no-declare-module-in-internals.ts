import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { isInternalsFile } from './utils.ts';

export const noDeclareModuleInInternals = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Internals files must not use declare module or export {}' },
    messages: {
      noDeclareModule: 'Internals files must not use `declare module`.',
      noEmptyExport: 'Internals files must not use `export {}`.'
    }
  },
  create(context: Pick<RuleContext, 'filename' | 'report'>) {
    if (!isInternalsFile(context.filename)) {
      return {};
    }

    return {
      TSModuleDeclaration(node: TSESTree.TSModuleDeclaration): void {
        if (node.declare) {
          context.report({ node, messageId: 'noDeclareModule' });
        }
      },
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        if (!node.declaration && node.specifiers.length === 0 && !node.source) {
          context.report({ node, messageId: 'noEmptyExport' });
        }
      }
    };
  }
};
