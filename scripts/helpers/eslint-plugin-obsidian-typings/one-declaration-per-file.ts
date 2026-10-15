import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import { isIndexFile } from './utils.ts';

function getDeclarationName(node: TSESTree.Node): null | string {
  switch (node.type) {
    case AST_NODE_TYPES.ClassDeclaration:
    case AST_NODE_TYPES.TSEnumDeclaration:
    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration: {
      return (node as TSESTree.TSInterfaceDeclaration).id.name;
    }
    case AST_NODE_TYPES.FunctionDeclaration: {
      return node.id?.name ?? null;
    }
    case AST_NODE_TYPES.TSModuleDeclaration: {
      return node.id.type === AST_NODE_TYPES.Identifier ? node.id.name : null;
    }
    case AST_NODE_TYPES.VariableDeclaration: {
      const declarator = node.declarations[0];
      return declarator.id.type === AST_NODE_TYPES.Identifier ? declarator.id.name : null;
    }
    default: {
      return null;
    }
  }
}

function isTopLevelDeclaration(node: TSESTree.Node): boolean {
  let current = node.parent;
  while (current) {
    switch (current.type) {
      case AST_NODE_TYPES.ExportDefaultDeclaration:
      case AST_NODE_TYPES.ExportNamedDeclaration: {
        // Skip over export wrappers
        current = current.parent;
        break;
      }
      case AST_NODE_TYPES.Program: {
        return true;
      }
      case AST_NODE_TYPES.TSModuleBlock: {
        // Inside a namespace — not top-level; inside a `declare module '...'` — counts as top-level.
        return current.parent.id.type !== AST_NODE_TYPES.Identifier;
      }
      default: {
        // Inside a function body, class body, etc.
        return false;
      }
    }
  }
  return false;
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
  create(context: RuleContext): RuleListener {
    if (isIndexFile(context.filename)) {
      return {};
    }

    const declarationNodes: TSESTree.Node[] = [];
    const exportNodes: TSESTree.Node[] = [];

    function declarationListener(node: TSESTree.Node): void {
      if (!isTopLevelDeclaration(node)) {
        return;
      }
      declarationNodes.push(node);
    }

    const listeners: Record<string, (node: TSESTree.Node) => void> = {};

    for (const selector of DECLARATION_SELECTORS) {
      listeners[selector] = declarationListener;
    }

    listeners['ExportNamedDeclaration'] = (node: TSESTree.Node): void => {
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

    listeners['ExportDefaultDeclaration'] = (node: TSESTree.Node): void => {
      exportNodes.push(node);
    };

    listeners['ExportAllDeclaration'] = (node: TSESTree.Node): void => {
      exportNodes.push(node);
    };

    listeners['Program:exit'] = (): void => {
      // Group declarations by name — interface X + namespace X = one declaration
      const groups = new Map<string, TSESTree.Node[]>();
      for (const node of declarationNodes) {
        const name = getDeclarationName(node) ?? `__anonymous_${String(groups.size)}`;
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
            data: { count: String(groups.size) },
            messageId: 'tooManyDeclarations',
            node
          });
        }
      }

      if (exportNodes.length > 1) {
        for (const node of exportNodes) {
          context.report({
            data: { count: String(exportNodes.length) },
            messageId: 'tooManyExports',
            node
          });
        }
      }
    };

    return listeners;
  },
  meta: {
    docs: { description: 'Enforce only one declaration and one export per file' },
    messages: {
      tooManyDeclarations: 'Only one declaration per file is allowed (found {{count}}).',
      tooManyExports: 'Only one export per file is allowed (found {{count}}).'
    },
    type: 'problem' as const
  }
};
