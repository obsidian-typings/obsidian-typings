import type {
  TSESLint,
  TSESTree
} from '@typescript-eslint/utils';

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

import type {
  RuleContext,
  RuleListener
} from './utils.ts';

import {
  getJSDocComment,
  hasJSDocTag,
  isDirectInterfaceMember
} from './utils.ts';

interface CommentValue {
  value: string;
}

/**
 * Checks whether a JSDoc comment has an empty line between description and the first tag.
 * Returns the index of the first tag line if a blank line is missing, or -1 if OK.
 */
function findMissingBlankLineIndex(comment: CommentValue): number {
  const lines = comment.value.split('\n');
  let lastDescriptionIndex = -1;
  let firstTagIndex = -1;

  for (const [index, line] of lines.entries()) {
    const trimmed = stripLinePrefix(line);
    if (trimmed.startsWith('@')) {
      firstTagIndex = index;
      break;
    }

    if (trimmed !== '') {
      lastDescriptionIndex = index;
    }
  }

  if (lastDescriptionIndex === -1 || firstTagIndex === -1) {
    return -1;
  }

  // An empty line anywhere between the description and the first tag is enough.
  return lines.slice(lastDescriptionIndex + 1, firstTagIndex).some((line) => stripLinePrefix(line) === '') ? -1 : firstTagIndex;
}

function stripLinePrefix(line: string): string {
  return line.replace(/^\s*\*\s?/, '').trim();
}

export const jsdocEmptyLineBeforeTags = {
  create(context: RuleContext): RuleListener {
    function validateComment(node: TSESTree.Node): void {
      const jsDoc = getJSDocComment(context.sourceCode, node);
      if (!jsDoc) {
        return;
      }
      if (!hasJSDocTag(jsDoc, 'official') && !hasJSDocTag(jsDoc, 'unofficial')) {
        return;
      }

      const firstTagLineIndex = findMissingBlankLineIndex(jsDoc);
      if (firstTagLineIndex === -1) {
        return;
      }

      context.report({
        fix(fixer: TSESLint.RuleFixer): TSESLint.RuleFix {
          const lines = jsDoc.value.split('\n');
          const indent = /^(?<indent>\s*)\*/.exec(lines[firstTagLineIndex] ?? '')?.groups?.['indent'] ?? ' ';
          const emptyLine = `${indent}*`;
          lines.splice(firstTagLineIndex, 0, emptyLine);
          const newValue = lines.join('\n');

          return fixer.replaceTextRange(
            [jsDoc.range[0], jsDoc.range[1]],
            `/*${newValue}*/`
          );
        },
        loc: jsDoc.loc,
        messageId: 'missingEmptyLine'
      });
    }

    function validateMember(node: TSESTree.Node): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }
      validateComment(node);
    }

    return {
      MethodDefinition: validateMember,
      PropertyDefinition: validateMember,
      TSIndexSignature(node: TSESTree.TSIndexSignature): void {
        if (!isDirectInterfaceMember(node)) {
          return;
        }
        validateComment(node);
      },
      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
        validateComment(node.parent.type === AST_NODE_TYPES.ExportNamedDeclaration ? node.parent : node);
      },
      TSMethodSignature: validateMember,
      TSPropertySignature: validateMember
    };
  },
  meta: {
    docs: { description: 'Require an empty line between JSDoc description and @official/@unofficial tags' },
    fixable: 'whitespace' as const,
    messages: {
      missingEmptyLine: 'JSDoc comment must have an empty line between description and tags.'
    },
    type: 'problem' as const
  }
};
