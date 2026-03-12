import type { TSESTree } from '@typescript-eslint/utils';
import type {
  Rule,
  SourceCode
} from 'eslint';

export type RuleContext = Rule.RuleContext;

export function normalizePath(filename: string): string {
  return filename.replace(/\\/g, '/');
}

export function isAugmentationFile(filename: string): boolean {
  return normalizePath(filename).includes('/augmentations/');
}

export function isInternalsFile(filename: string): boolean {
  return normalizePath(filename).includes('/internals/');
}

export function isImplementationsFile(filename: string): boolean {
  return normalizePath(filename).includes('/implementations/');
}

export function isIndexFile(filename: string): boolean {
  const base = normalizePath(filename).split('/').pop() ?? '';
  return /^index\./.test(base);
}

export function isConstructorsFile(filename: string): boolean {
  return normalizePath(filename).includes('/constructors/');
}

export function getJSDocComment(
  sourceCode: SourceCode,
  node: TSESTree.Node
): { type: string; value: string } | null {
  const comments = sourceCode.getCommentsBefore(node as unknown as Parameters<SourceCode['getCommentsBefore']>[0]);
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    if (comment && (comment.type as string) === 'Block' && comment.value.startsWith('*')) {
      return comment;
    }
  }
  return null;
}

export function hasJSDocTag(comment: { value: string }, tagName: string): boolean {
  return new RegExp(`@${tagName}\\b`).test(comment.value);
}

export function isDirectInterfaceMember(node: TSESTree.Node): boolean {
  return node.parent?.type === 'TSInterfaceBody';
}

export function getMemberName(node: { key?: TSESTree.Node } & TSESTree.Node): string {
  const key = node.key;
  if (key && 'name' in key) {
    return (key as TSESTree.Identifier).name;
  }
  if (key && 'value' in key) {
    return String((key as TSESTree.Literal).value);
  }
  return '(anonymous)';
}
