import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
    isConstructorsFile,
    normalizePath
} from './utils.ts';

/**
 * Restricts imports of `ConstructorBase` to files inside a `constructors/` directory.
 *
 * Other code should use `ExtractConstructor` (which derives from `constructor__` methods)
 * instead of referencing `ConstructorBase` directly.
 */
export const constructorBaseRestricted = {
    meta: {
        type: 'problem' as const,
        docs: {
            description:
                'ConstructorBase may only be imported in files inside a constructors/ directory'
        },
        messages: {
            restrictedImport:
                '`ConstructorBase` may only be imported in files inside a `constructors/` directory. Use `ExtractConstructor` instead.'
        }
    },
    create(context: RuleContext) {
        const normalized = normalizePath(context.filename);

        // Allow constructors/ files to import ConstructorBase freely
        if (isConstructorsFile(normalized)) {
            return {};
        }

        return {
            ImportDeclaration(node: TSESTree.ImportDeclaration): void {
                for (const specifier of node.specifiers) {
                    if (
                        specifier.type === 'ImportSpecifier'
                        && specifier.local.name === 'ConstructorBase'
                    ) {
                        context.report({
                            node: specifier,
                            messageId: 'restrictedImport'
                        });
                    }
                }
            }
        };
    }
};
