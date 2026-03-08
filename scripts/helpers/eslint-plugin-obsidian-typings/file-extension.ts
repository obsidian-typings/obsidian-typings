import type { TSESTree } from '@typescript-eslint/utils';

import type { RuleContext } from './utils.ts';

import {
    isImplementationsFile,
    normalizePath
} from './utils.ts';

export const fileExtension = {
    meta: {
        type: 'problem' as const,
        docs: { description: 'Enforce correct file extensions by directory' },
        messages: {
            shouldBeDts: 'Files outside implementations/ must use .d.ts extension.',
            shouldBeTs: 'Files inside implementations/ must use .ts extension (not .d.ts).'
        }
    },
    create(context: Pick<RuleContext, 'filename' | 'report'>) {
        return {
            Program(node: TSESTree.Program): void {
                const normalized = normalizePath(context.filename);

                if (isImplementationsFile(context.filename)) {
                    if (normalized.endsWith('.d.ts')) {
                        context.report({ node, messageId: 'shouldBeTs' });
                    }
                } else {
                    if (normalized.endsWith('.ts') && !normalized.endsWith('.d.ts')) {
                        context.report({ node, messageId: 'shouldBeDts' });
                    }
                }
            }
        };
    }
};
