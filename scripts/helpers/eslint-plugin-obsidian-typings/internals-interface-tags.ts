import type { TSESTree } from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getJSDocComment,
  hasJSDocTag,
  isConstructorsFile,
  isInternalsFile
} from './utils.ts';

export const internalsInterfaceTags = {
  create(context: RuleContext): RuleListener {
    if (!isInternalsFile(context.filename)) {
      return {};
    }
    if (isConstructorsFile(context.filename)) {
      return {};
    }

    return {
      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
        const name = node.id.name;
        let jsDoc = getJSDocComment(context.sourceCode, node);
        if (!jsDoc && node.parent.type === AST_NODE_TYPES.ExportNamedDeclaration) {
          jsDoc = getJSDocComment(context.sourceCode, node.parent);
        }

        if (!jsDoc) {
          context.report({ data: { name }, messageId: 'missingPublic', node });
          context.report({ data: { name }, messageId: 'missingUnofficial', node });
          return;
        }
        if (!hasJSDocTag(jsDoc, 'public')) {
          context.report({ data: { name }, messageId: 'missingPublic', node });
        }
        if (!hasJSDocTag(jsDoc, 'unofficial')) {
          context.report({ data: { name }, messageId: 'missingUnofficial', node });
        }
      }
    };
  },
  meta: {
    docs: { description: 'Interfaces in internals files must have @public and @unofficial interface-level tags' },
    messages: {
      missingPublic: 'Interface "{{name}}" in internals file must have @public TSDoc tag.',
      missingUnofficial: 'Interface "{{name}}" in internals file must have @unofficial TSDoc tag.'
    },
    type: 'problem' as const
  }
};
