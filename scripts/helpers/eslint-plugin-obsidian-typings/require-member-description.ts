import type { TSESTree } from '@typescript-eslint/utils';

import type {
  KeyedNode,
  RuleContext
} from './utils.ts';

import {
  getJSDocComment,
  getMemberName,
  isDirectInterfaceMember
} from './utils.ts';

interface CommentValue {
  value: string;
}

/**
 * Extracts the description text from a JSDoc comment (text before any `@` tags).
 */
function getJSDocDescription(comment: CommentValue): string {
  const lines = comment.value.split('\n');
  const descriptionLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.replace(/^\s*\*\s?/, '').trim();
    if (trimmed.startsWith('@')) {
      break;
    }
    descriptionLines.push(trimmed);
  }

  return descriptionLines.join(' ').trim();
}

export const requireMemberDescription = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Exported interface members must have a non-empty TSDoc description' },
    messages: {
      missingDescription: 'Member "{{name}}" must have a non-empty TSDoc description.'
    }
  },
  create(context: RuleContext) {
    function checkMember(node: KeyedNode): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }

      const name = getMemberName(node);
      const jsDoc = getJSDocComment(context.sourceCode, node);
      if (!jsDoc || getJSDocDescription(jsDoc) === '') {
        context.report({ node, messageId: 'missingDescription', data: { name } });
      }
    }

    return {
      MethodDefinition: checkMember,
      PropertyDefinition: checkMember,
      TSIndexSignature(node: TSESTree.TSIndexSignature): void {
        if (!isDirectInterfaceMember(node)) {
          return;
        }
        const jsDoc = getJSDocComment(context.sourceCode, node);
        if (!jsDoc || getJSDocDescription(jsDoc) === '') {
          context.report({ node, messageId: 'missingDescription', data: { name: '[index]' } });
        }
      },
      TSMethodSignature: checkMember,
      TSPropertySignature: checkMember
    };
  }
};
