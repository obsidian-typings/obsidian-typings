import type { Node as EstreeNode } from 'estree';

import {
  describe,
  expect,
  it
} from 'vitest';

import { toTSESTreeNode } from './ts-estree-node.ts';

describe('toTSESTreeNode', () => {
  it('should return the same node', () => {
    const node: EstreeNode = { name: 'foo', type: 'Identifier' };
    expect(toTSESTreeNode(node)).toBe(node);
  });
});
