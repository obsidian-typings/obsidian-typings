import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { isIndexFile } from './utils.ts';

export const oneExportPerFile = {
    meta: {
        type: 'problem' as const,
        docs: { description: 'Enforce only one export per file' },
        messages: {
            tooMany: 'Only one export per file is allowed (found {{count}}).'
        }
    },
    create(context: RuleContext) {
        if (isIndexFile(context.filename)) {
            return {};
        }

        const exports: TSESTree.Node[] = [];

        return {
            ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
                // Skip `export {};`
                if (!node.declaration && node.specifiers.length === 0) {
                    return;
                }
                // Skip re-exports like `export type { X } from '...'`
                if (!node.declaration && node.source) {
                    return;
                }
                exports.push(node);
            },
            ExportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration): void {
                exports.push(node);
            },
            ExportAllDeclaration(node: TSESTree.ExportAllDeclaration): void {
                exports.push(node);
            },
            'Program:exit'(): void {
                if (exports.length > 1) {
                    for (const exp of exports) {
                        context.report({
                            node: exp,
                            messageId: 'tooMany',
                            data: { count: String(exports.length) }
                        });
                    }
                }
            }
        };
    }
};
