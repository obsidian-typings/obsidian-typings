import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isInsideDeclareGlobal } from './utils.ts';

interface ImportAliasEntry {
  node: TSESTree.Node;
  source: string;
}

export const noImportAliasInDeclareGlobal = {
  create(context: RuleContext): RuleListener {
    const importAliases = new Map<string, ImportAliasEntry>();
    const usedOutsideDeclareGlobal = new Set<string>();
    const usedInDeclareGlobal = new Set<string>();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        if (node.importKind !== 'type') {
          return;
        }

        const source = node.source.value;

        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
            || specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier
            || (specifier.imported.type === AST_NODE_TYPES.Identifier && specifier.imported.name === 'default')
          ) {
            importAliases.set(specifier.local.name, { node: specifier, source });
          }
        }
      },
      'Program:exit'(): void {
        for (const name of usedInDeclareGlobal) {
          if (usedOutsideDeclareGlobal.has(name)) {
            continue;
          }

          const alias = importAliases.get(name);
          if (alias) {
            context.report({
              data: {
                name,
                source: alias.source
              },
              messageId: 'noImportAlias',
              node: alias.node
            });
          }
        }
      },
      TSTypeQuery(node: TSESTree.TSTypeQuery): void {
        if (!(node.exprName.type === AST_NODE_TYPES.Identifier && importAliases.has(node.exprName.name))) {
          return;
        }

        const name = node.exprName.name;
        if (isInsideDeclareGlobal(node)) {
          usedInDeclareGlobal.add(name);
        } else {
          usedOutsideDeclareGlobal.add(name);
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Forbid import aliases used only in declare global blocks. Use `typeof import(\'module\')` instead to avoid dts-bundle-generator dropping the import.'
    },
    messages: {
      noImportAlias: 'Import alias `{{name}}` is used in a `declare global` block. Use `typeof import(\'{{source}}\')` instead, because dts-bundle-generator drops these imports when inlining declare global.'
    },
    type: 'problem' as const
  }
};
