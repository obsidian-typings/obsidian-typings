import type { TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

import type { RuleContext } from './utils.ts';

import {
  getJSDocComment,
  hasJSDocTag,
  isDirectInterfaceMember
} from './utils.ts';

/**
 * Checks whether a JSDoc comment has an empty line between description and the first tag.
 * Returns the index of the first tag line if a blank line is missing, or -1 if OK.
 */
function findMissingBlankLineIndex(comment: { value: string }): number {
  const lines = comment.value.split('\n');
  let lastDescriptionIndex = -1;
  let firstTagIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i]!.replace(/^\s*\*\s?/, '').trim();
    if (trimmed.startsWith('@')) {
      firstTagIndex = i;
      break;
    }

    if (trimmed !== '') {
      lastDescriptionIndex = i;
    }
  }

  if (lastDescriptionIndex === -1 || firstTagIndex === -1) {
    return -1;
  }

  // Check if there's an empty line between description and first tag
  if (firstTagIndex - lastDescriptionIndex >= 2) {
    // There's at least one line between them - check if it's empty
    for (let i = lastDescriptionIndex + 1; i < firstTagIndex; i++) {
      const trimmed = lines[i]!.replace(/^\s*\*\s?/, '').trim();
      if (trimmed === '') {
        return -1;
      }
    }
  }

  return firstTagIndex;
}

export const jsdocEmptyLineBeforeTags = {
  meta: {
    type: 'problem' as const,
    docs: { description: 'Require an empty line between JSDoc description and @official/@unofficial tags' },
    fixable: 'whitespace' as const,
    messages: {
      missingEmptyLine: 'JSDoc comment must have an empty line between description and tags.'
    }
  },
  create(context: RuleContext) {
    function checkComment(node: TSESTree.Node): void {
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

      const commentNode = jsDoc as unknown as TSESTree.Comment;

      context.report({
        loc: commentNode.loc!,
        messageId: 'missingEmptyLine',
        fix(fixer: Rule.RuleFixer) {
          const lines = jsDoc.value.split('\n');
          const tagLine = lines[firstTagLineIndex]!;
          const indent = tagLine.match(/^(\s*)\*/)?.[1] ?? ' ';
          const emptyLine = `${indent}*`;
          lines.splice(firstTagLineIndex, 0, emptyLine);
          const newValue = lines.join('\n');

          return fixer.replaceTextRange(
            [commentNode.range![0], commentNode.range![1]],
            `/*${newValue}*/`
          );
        }
      });
    }

    function checkMember(node: TSESTree.Node): void {
      if (!isDirectInterfaceMember(node)) {
        return;
      }
      checkComment(node);
    }

    return {
      MethodDefinition: checkMember,
      PropertyDefinition: checkMember,
      TSIndexSignature(node: TSESTree.TSIndexSignature): void {
        if (!isDirectInterfaceMember(node)) {
          return;
        }
        checkComment(node);
      },
      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration): void {
        let target: TSESTree.Node = node;
        if (node.parent?.type === 'ExportNamedDeclaration') {
          target = node.parent;
        }
        checkComment(target);
      },
      TSMethodSignature: checkMember,
      TSPropertySignature: checkMember
    };
  }
};
