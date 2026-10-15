import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

export const importExtensions = {
  create(context: Pick<RuleContext, 'filename' | 'report'>): RuleListener {
    const isDeclarationFile = context.filename.endsWith('.d.ts');

    function isTypeOnly(
      node: TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration | TSESTree.ImportDeclaration
    ): boolean {
      if (isDeclarationFile) {
        return true;
      }
      return (node.type === AST_NODE_TYPES.ImportDeclaration ? node.importKind : node.exportKind) === 'type';
    }

    function check(
      node: TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration | TSESTree.ImportDeclaration
    ): void {
      const source = node.source;
      if (!source) {
        return;
      }
      const value = source.value;
      if (typeof value !== 'string' || !value.startsWith('.')) {
        return;
      }
      if (!value.endsWith('.d.ts') && !value.endsWith('.ts')) {
        context.report({
          data: { source: value },
          messageId: 'missing',
          node: source
        });
        return;
      }

      if (isTypeOnly(node) && !value.endsWith('.d.ts')) {
        context.report({
          data: { expected: '.d.ts', source: value },
          messageId: 'wrongExtension',
          node: source
        });
      } else if (!isTypeOnly(node) && value.endsWith('.d.ts')) {
        context.report({
          data: { expected: '.ts', source: value },
          messageId: 'wrongExtension',
          node: source
        });
      }
    }

    return {
      ExportAllDeclaration: check,
      ExportNamedDeclaration: check,
      ImportDeclaration: check
    };
  },
  meta: {
    docs: { description: 'Enforce .d.ts or .ts extensions on relative imports' },
    messages: {
      missing: 'Relative import "{{source}}" must include .d.ts or .ts extension.',
      wrongExtension: 'Import "{{source}}" should use {{expected}} extension.'
    },
    type: 'problem' as const
  }
};
