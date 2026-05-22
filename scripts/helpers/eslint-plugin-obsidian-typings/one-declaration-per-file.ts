import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { isIndexFile } from './utils.ts';

function isTopLevelDeclaration(node: TSESTree.Node): boolean {
  let current = node.parent;
  while (current) {
    switch (current.type) {
      case 'Program':
        return true;
      case 'TSModuleBlock': {
        const moduleDecl = current.parent;
        if (
          moduleDecl?.type === 'TSModuleDeclaration'
          && moduleDecl.id.type === 'Identifier'
        ) {
          // Inside a namespace — not top-level
          return false;
        }
        // Inside a `declare module '...'` — counts as top-level
        return true;
      }
      case 'ExportNamedDeclaration':
      case 'ExportDefaultDeclaration':
        // Skip over export wrappers
        current = current.parent;
        break;
      default:
        // Inside a function body, class body, etc.
        return false;
    }
  }
  return false;
}

function getDeclarationName(node: TSESTree.Node): null | string {
  switch (node.type) {
    case 'TSInterfaceDeclaration':
    case 'TSTypeAliasDeclaration':
    case 'ClassDeclaration':
    case 'TSEnumDeclaration':
      return (node as TSESTree.TSInterfaceDeclaration).id.name;
    case 'TSModuleDeclaration':
      if (node.id.type === 'Identifier') {
        return node.id.name;
      }
      return null;
    case 'FunctionDeclaration':
      return (node as TSESTree.FunctionDeclaration).id?.name ?? null;
    case 'VariableDeclaration': {
      const declarator = (node as TSESTree.VariableDeclaration).declarations[0];
      if (declarator?.id.type === 'Identifier') {
        return declarator.id.name;
      }
      return null;
    }
    default:
      return null;
  }
}

const DECLARATION_SELECTORS = [
  'TSInterfaceDeclaration',
  'TSTypeAliasDeclaration',
  'TSModuleDeclaration[id.type="Identifier"]',
  'ClassDeclaration',
  'TSEnumDeclaration',
  'FunctionDeclaration',
  'VariableDeclaration'
] as const;

export const oneDeclarationPerFile = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Enforce only one declaration and one export per file' },
    messages: {
      tooManyDeclarations: 'Only one declaration per file is allowed (found {{count}}).',
      tooManyExports: 'Only one export per file is allowed (found {{count}}).'
    }
  },
  create(context: RuleContext) {
    if (isIndexFile(context.filename)) {
      return {};
    }

    const declarationNodes: TSESTree.Node[] = [];
    const exportNodes: TSESTree.Node[] = [];

    const declarationListener = (node: TSESTree.Node): void => {
      if (!isTopLevelDeclaration(node)) {
        return;
      }
      declarationNodes.push(node);
    };

    const listeners: Record<string, (node: TSESTree.Node) => void> = {};

    for (const selector of DECLARATION_SELECTORS) {
      listeners[selector] = declarationListener;
    }

    listeners['ExportNamedDeclaration'] = (node: TSESTree.Node) => {
      const exportNode = node as TSESTree.ExportNamedDeclaration;
      // Skip `export {};`
      if (!exportNode.declaration && exportNode.specifiers.length === 0) {
        return;
      }
      // Skip re-exports like `export type { X } from '...'`
      if (!exportNode.declaration && exportNode.source) {
        return;
      }
      exportNodes.push(node);
    };

    listeners['ExportDefaultDeclaration'] = (node: TSESTree.Node) => {
      exportNodes.push(node);
    };

    listeners['ExportAllDeclaration'] = (node: TSESTree.Node) => {
      exportNodes.push(node);
    };

    listeners['Program:exit'] = () => {
      // Group declarations by name — interface X + namespace X = one declaration
      const groups = new Map<string, TSESTree.Node[]>();
      for (const node of declarationNodes) {
        const name = getDeclarationName(node) ?? `__anonymous_${groups.size}`;
        const group = groups.get(name);
        if (group) {
          group.push(node);
        } else {
          groups.set(name, [node]);
        }
      }

      if (groups.size > 1) {
        for (const node of declarationNodes) {
          context.report({
            node,
            messageId: 'tooManyDeclarations',
            data: { count: String(groups.size) }
          });
        }
      }

      if (exportNodes.length > 1) {
        for (const node of exportNodes) {
          context.report({
            node,
            messageId: 'tooManyExports',
            data: { count: String(exportNodes.length) }
          });
        }
      }
    };

    return listeners;
  }
};
