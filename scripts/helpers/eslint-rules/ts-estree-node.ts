/**
 * @file
 *
 * Views a node ESLint hands a rule as the TSESTree node it is.
 *
 * Under `@typescript-eslint/parser` every node a rule receives is a TSESTree node, but ESLint's own types describe
 * it as an ESTree one. The two shapes disagree on how `type` is typed: ESTree uses string literals, TSESTree uses
 * `AST_NODE_TYPES` enum members. So asserting straight from one to the other is an unsafe enum assignment
 * (`@typescript-eslint/no-unsafe-enum-assignment`, since typescript-eslint 8.71). This module is the one place that
 * crossing is made; a caller narrows the result within TSESTree, which is an ordinary downcast.
 */

import type { TSESTree } from '@typescript-eslint/utils';
import type { Node as EstreeNode } from 'estree';

import { castTo } from '../object-utils.ts';

/**
 * Views an ESLint (ESTree-typed) node as a TSESTree node.
 *
 * The node is returned unchanged: only its static type moves.
 *
 * @param node - The node ESLint passed to the rule.
 * @returns The same node, typed as a TSESTree node.
 */
export function toTSESTreeNode(node: EstreeNode): TSESTree.Node {
  return castTo<TSESTree.Node>(node);
}
