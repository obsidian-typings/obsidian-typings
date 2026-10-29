// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import type {
  MemberInfo,
  ParameterInfo,
  TypeInfo
} from './api-doc-types.ts';

import { mergeMethodOverload } from './api-doc-type-merging.ts';

interface MethodParams {
  readonly description?: string;
  readonly isOfficial: boolean;
  readonly name: string;
  readonly overloadKey?: string;
  readonly parameters: readonly ParameterInfo[];
}

describe('mergeMethodOverload', () => {
  it('should keep every overload of the official declaration', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getLeaf', parameters: [param('newLeaf?', '\'split\''), param('direction?', 'SplitDirection')] }), true);
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getLeaf', parameters: [param('newLeaf?', 'PaneType | boolean')] }), true);
    expect(target.methods.map((m) => m.signature)).toEqual([
      'getLeaf(newLeaf?: \'split\', direction?: SplitDirection)',
      'getLeaf(newLeaf?: PaneType | boolean)'
    ]);
  });

  it('should keep every unofficial overload an augmentation adds', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ isOfficial: false, name: 'readConfigJson', parameters: [param('config', '\'appearance\'')] }), false);
    mergeMethodOverload(target, createMethod({ isOfficial: false, name: 'readConfigJson', parameters: [param('config', 'string')] }), false);
    expect(target.methods).toHaveLength(2);
  });

  it('should keep an unofficial overload beside the official one of the same name', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getLeavesOfType', parameters: [param('viewType', 'string')] }), true);
    mergeMethodOverload(target, createMethod({ isOfficial: false, name: 'getLeavesOfType', parameters: [param('viewType', 'TViewType')] }), false);
    expect(target.methods).toHaveLength(2);
  });

  it('should replace the official overload an @official augmentation member redeclares, and only that one', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getLeaf', parameters: [param('newLeaf?', '\'split\''), param('direction?', 'SplitDirection')] }), true);
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getLeaf', parameters: [param('newLeaf?', 'PaneType | boolean')] }), true);
    mergeMethodOverload(
      target,
      createMethod({ description: 'Augmented.', isOfficial: true, name: 'getLeaf', parameters: [param('newLeaf?', 'boolean | PaneType')] }),
      false
    );
    expect(target.methods.map((m) => m.signature)).toEqual([
      'getLeaf(newLeaf?: \'split\', direction?: SplitDirection)',
      'getLeaf(newLeaf?: boolean | PaneType)'
    ]);
    expect(target.methods[1]?.description).toBe('Augmented.');
  });

  it('should match a redeclaration by overload key, so each event literal replaces its own overload', () => {
    const target = createType();
    for (const eventName of ['\'changed\'', '\'deleted\'']) {
      mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'on', overloadKey: `on(${eventName})`, parameters: [param('name', eventName), param('callback', '() => any')] }), true);
    }
    for (const eventName of ['\'deleted\'', '\'changed\'']) {
      mergeMethodOverload(
        target,
        createMethod({ isOfficial: true, name: 'on', overloadKey: `on(${eventName})`, parameters: [param('name', eventName), param('callback', '() => unknown')] }),
        false
      );
    }
    expect(target.methods.map((m) => m.signature)).toEqual([
      'on(name: \'changed\', callback: () => unknown)',
      'on(name: \'deleted\', callback: () => unknown)'
    ]);
  });

  it('should strip the __ suffix of a member that overrides an official one', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ isOfficial: true, name: 'getSuggestions', parameters: [param('query', 'string')] }), true);
    mergeMethodOverload(target, createMethod({ isOfficial: false, name: 'getSuggestions__', parameters: [param('query', 'string')] }), false);
    expect(target.methods.map((m) => m.signature)).toEqual(['getSuggestions(query: string)']);
  });

  it('should take the augmentation description for an exact redeclaration', () => {
    const target = createType();
    mergeMethodOverload(target, createMethod({ description: 'Official.', isOfficial: true, name: 'load', parameters: [] }), true);
    mergeMethodOverload(target, createMethod({ description: 'Augmented.', isOfficial: true, name: 'load', parameters: [] }), false);
    expect(target.methods.map((m) => m.description)).toEqual(['Augmented.']);
  });
});

function createMethod(params: MethodParams): MemberInfo {
  return {
    description: params.description ?? '',
    examples: [],
    inheritedFrom: '',
    isOfficial: params.isOfficial,
    isStatic: false,
    name: params.name,
    overloadKey: params.overloadKey ?? params.name,
    parameters: [...params.parameters],
    remarks: '',
    returnDescription: '',
    returnType: 'void',
    signature: `${params.name}(${params.parameters.map((p) => `${p.name}: ${p.type}`).join(', ')})`,
    since: '',
    type: ''
  };
}

function createType(): TypeInfo {
  return {
    baseTypes: [],
    description: '',
    examples: [],
    implementsTypes: [],
    isOfficial: true,
    kind: 'interface',
    methods: [],
    name: 'Example',
    namespace: 'obsidian/augmentations',
    properties: [],
    remarks: '',
    typeParameters: []
  };
}

function param(name: string, type: string): ParameterInfo {
  return { description: '', name, type };
}
