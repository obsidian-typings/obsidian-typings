import type {
  TSESLint,
  TSESTree
} from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

import {
  AST_NODE_TYPES,
  AST_TOKEN_TYPES
} from '@typescript-eslint/utils';

export type KeyedNode = KeyedNodeFields & TSESTree.Node;

/**
 * A rule of this plugin, written against typescript-eslint's types: under `@typescript-eslint/parser` every node a
 * rule receives is a TSESTree node, and typing it as one is what lets a rule compare `node.type` with
 * `AST_NODE_TYPES` and read TSESTree-only fields without a cast at every use.
 */
export interface ObsidianTypingsRule {
  readonly create: (context: RuleContext) => RuleListener;
  readonly meta: Rule.RuleMetaData;
}

export type RuleContext = Readonly<TSESLint.RuleContext<string, readonly unknown[]>>;

export type RuleListener = TSESLint.RuleListener;

interface CommentValue {
  readonly value: string;
}

interface KeyedNodeFields {
  readonly key?: TSESTree.Node;
}

export function getJSDocComment(
  sourceCode: Readonly<TSESLint.SourceCode>,
  node: TSESTree.Node
): null | TSESTree.Comment {
  const comments = sourceCode.getCommentsBefore(node);
  for (let index = comments.length - 1; index >= 0; index--) {
    const comment = comments[index];
    if (comment && isJSDocComment(comment)) {
      return comment;
    }
  }
  return null;
}

export function getMemberName(node: KeyedNode): string {
  const key = node.key;
  if (key && 'name' in key) {
    return (key as TSESTree.Identifier).name;
  }
  return key && 'value' in key ? String((key as TSESTree.Literal).value) : '(anonymous)';
}

export function hasJSDocTag(comment: CommentValue, tagName: string): boolean {
  return new RegExp(String.raw`@${tagName}\b`).test(comment.value);
}

export function isAugmentationFile(filename: string): boolean {
  return normalizePath(filename).includes('/augmentations/');
}

export function isConstructorsFile(filename: string): boolean {
  return normalizePath(filename).includes('/constructors/');
}

export function isDirectInterfaceMember(node: TSESTree.Node): boolean {
  return node.parent?.type === AST_NODE_TYPES.TSInterfaceBody;
}

export function isImplementationsFile(filename: string): boolean {
  return normalizePath(filename).includes('/implementations/');
}

export function isIndexFile(filename: string): boolean {
  const base = normalizePath(filename).split('/').pop() ?? '';
  return base.startsWith('index.');
}

export function isInsideDeclareGlobal(node: TSESTree.Node): boolean {
  let current: TSESTree.Node | undefined = node.parent;
  while (current) {
    if (
      current.type === AST_NODE_TYPES.TSModuleDeclaration
      && current.declare
      && current.kind === 'global'
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

export function isInternalsFile(filename: string): boolean {
  return normalizePath(filename).includes('/internals/');
}

export function isJSDocComment(comment: TSESTree.Comment): boolean {
  return comment.type === AST_TOKEN_TYPES.Block && comment.value.startsWith('*');
}

export function normalizePath(filename: string): string {
  return filename.replaceAll('\\', '/');
}

/**
 * Views a rule of this plugin as the `Rule.RuleModule` ESLint's own types expect.
 *
 * ESLint describes the same object with ESTree nodes, which disagree with TSESTree's on how `type` is typed, so the
 * two types are not assignable either way although the object is the same at runtime. This is the one place that
 * crossing is made, the way `@mnaoumov/typescript-dev-toolkit`'s `toTSESTreeNode` makes the mirror-image one.
 *
 * @param rule - The rule.
 * @returns The same rule, typed for ESLint.
 */
export function toEslintRule(rule: ObsidianTypingsRule): Rule.RuleModule {
  // eslint-disable-next-line no-restricted-syntax -- The two descriptions of one runtime object share no overlap TypeScript accepts.
  return rule as unknown as Rule.RuleModule;
}
