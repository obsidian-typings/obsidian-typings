import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

export const noImportAliasInDeclareGlobal = {
  meta: {
    type: 'problem' as const,
    docs: {
      description:
        'Forbid import aliases used only in declare global blocks. Use `typeof import(\'module\')` instead to avoid dts-bundle-generator dropping the import.'
    },
    messages: {
      noImportAlias:
        'Import alias `{{name}}` is used in a `declare global` block. Use `typeof import(\'{{source}}\')` instead, because dts-bundle-generator drops these imports when inlining declare global.'
    }
  },
  create(context: RuleContext) {
    const importAliases = new Map<string, { node: TSESTree.Node; source: string }>();
    const usedOutsideDeclareGlobal = new Set<string>();
    const usedInDeclareGlobal = new Set<string>();

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
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        if (!node.importKind || node.importKind !== 'type') {
          return;
        }

        const source = node.source.value;

        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            importAliases.set(specifier.local.name, { node: specifier, source });
          } else if (specifier.type === 'ImportNamespaceSpecifier') {
            importAliases.set(specifier.local.name, { node: specifier, source });
          } else if (
            specifier.type === 'ImportSpecifier'
            && specifier.imported.type === 'Identifier'
            && specifier.imported.name === 'default'
          ) {
            importAliases.set(specifier.local.name, { node: specifier, source });
          }
        }
      },
      'Program:exit'(): void {
        for (const name of usedInDeclareGlobal) {
          if (!usedOutsideDeclareGlobal.has(name)) {
            const alias = importAliases.get(name);
            if (alias) {
              context.report({
                node: alias.node,
                messageId: 'noImportAlias',
                data: {
                  name,
                  source: alias.source
                }
              });
            }
          }
        }
      },
      TSTypeQuery(node: TSESTree.TSTypeQuery): void {
        if (node.exprName.type === 'Identifier' && importAliases.has(node.exprName.name)) {
          const name = node.exprName.name;
          if (isInsideDeclareGlobal(node)) {
            usedInDeclareGlobal.add(name);
          } else {
            usedOutsideDeclareGlobal.add(name);
          }
        }
      }
    };
  }
};
