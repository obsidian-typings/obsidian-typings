import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
    getJSDocComment,
    hasJSDocTag,
    isConstructorsFile,
    isInternalsFile
} from './utils.ts';

export const internalsInterfaceTags = {
    meta: {
        type: 'problem' as const,
        docs: { description: 'Interfaces in internals files must have @public and @unofficial interface-level tags' },
        messages: {
            missingPublic: 'Interface "{{name}}" in internals file must have @public TSDoc tag.',
            missingUnofficial: 'Interface "{{name}}" in internals file must have @unofficial TSDoc tag.'
        }
    },
    create(context: RuleContext) {
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
                if (!jsDoc && node.parent?.type === 'ExportNamedDeclaration') {
                    jsDoc = getJSDocComment(context.sourceCode, node.parent);
                }

                if (!jsDoc) {
                    context.report({ node, messageId: 'missingPublic', data: { name } });
                    context.report({ node, messageId: 'missingUnofficial', data: { name } });
                    return;
                }
                if (!hasJSDocTag(jsDoc, 'public')) {
                    context.report({ node, messageId: 'missingPublic', data: { name } });
                }
                if (!hasJSDocTag(jsDoc, 'unofficial')) {
                    context.report({ node, messageId: 'missingUnofficial', data: { name } });
                }
            }
        };
    }
};
