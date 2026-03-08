import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import { normalizePath } from './utils.ts';

function isConstructorGetterFile(filename: string): boolean {
    const normalized = normalizePath(filename);
    return normalized.includes('/implementations/constructors/')
        && /\/get\w+Constructor\.ts$/.test(normalized);
}

function isAugmentationGetter(filename: string): boolean {
    return normalizePath(filename).includes('/implementations/constructors/augmentations/');
}

function isInternalGetter(filename: string): boolean {
    const normalized = normalizePath(filename);
    return normalized.includes('/implementations/constructors/internals/')
        && !normalized.includes('/views/');
}

export const constructorGetterPlacement = {
    meta: {
        type: 'problem' as const,
        docs: {
            description:
                'Ensure constructor getter files are in the correct parallel directory (augmentations vs internals)'
        },
        messages: {
            augmentationMustValueImport:
                'Augmentation constructor getter must have a value import (not type-only) from \'obsidian\'.',
            internalMustNotValueImport:
                'Internal constructor getter must not have a value import from \'obsidian\'. Use type-only imports instead.'
        }
    },
    create(context: RuleContext) {
        if (!isConstructorGetterFile(context.filename)) {
            return {};
        }

        const isAug = isAugmentationGetter(context.filename);
        const isInt = isInternalGetter(context.filename);

        if (!isAug && !isInt) {
            return {};
        }

        let hasValueImportFromObsidian = false;

        return {
            ImportDeclaration(node: TSESTree.ImportDeclaration): void {
                if (node.source.value !== 'obsidian') {
                    return;
                }
                if (node.importKind !== 'type') {
                    hasValueImportFromObsidian = true;
                }
            },
            'Program:exit'(node: TSESTree.Program): void {
                if (isAug && !hasValueImportFromObsidian) {
                    context.report({ node, messageId: 'augmentationMustValueImport' });
                }
                if (isInt && hasValueImportFromObsidian) {
                    context.report({ node, messageId: 'internalMustNotValueImport' });
                }
            }
        };
    }
};
