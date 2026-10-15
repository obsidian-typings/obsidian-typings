import type { TSESTree } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  isImplementationsFile,
  normalizePath
} from './utils.ts';

export const fileExtension = {
  create(context: Pick<RuleContext, 'filename' | 'report'>): RuleListener {
    return {
      Program(node: TSESTree.Program): void {
        const normalized = normalizePath(context.filename);

        if (isImplementationsFile(context.filename)) {
          if (normalized.endsWith('.d.ts')) {
            context.report({ messageId: 'shouldBeTs', node });
          }
        } else if (normalized.endsWith('.ts') && !normalized.endsWith('.d.ts')) {
          context.report({ messageId: 'shouldBeDts', node });
        }
      }
    };
  },
  meta: {
    docs: { description: 'Enforce correct file extensions by directory' },
    messages: {
      shouldBeDts: 'Files outside implementations/ must use .d.ts extension.',
      shouldBeTs: 'Files inside implementations/ must use .ts extension (not .d.ts).'
    },
    type: 'problem' as const
  }
};
