import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

export const importExtensions = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Enforce .d.ts or .ts extensions on relative imports' },
    messages: {
      missing: 'Relative import "{{source}}" must include .d.ts or .ts extension.',
      wrongExt: 'Import "{{source}}" should use {{expected}} extension.'
    }
  },
  create(context: Pick<RuleContext, 'filename' | 'report'>) {
    const isDeclarationFile = context.filename.endsWith('.d.ts');

    function isTypeOnly(
      node: TSESTree.ExportAllDeclaration | TSESTree.ExportNamedDeclaration | TSESTree.ImportDeclaration
    ): boolean {
      if (isDeclarationFile) {
        return true;
      }
      if (node.type === 'ImportDeclaration') {
        return node.importKind === 'type';
      }
      if (node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') {
        return (node as TSESTree.ExportNamedDeclaration).exportKind === 'type';
      }
      return false;
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
          node: source,
          messageId: 'missing',
          data: { source: value }
        });
        return;
      }

      if (isTypeOnly(node) && !value.endsWith('.d.ts')) {
        context.report({
          node: source,
          messageId: 'wrongExt',
          data: { source: value, expected: '.d.ts' }
        });
      } else if (!isTypeOnly(node) && value.endsWith('.d.ts')) {
        context.report({
          node: source,
          messageId: 'wrongExt',
          data: { source: value, expected: '.ts' }
        });
      }
    }

    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check
    };
  }
};
