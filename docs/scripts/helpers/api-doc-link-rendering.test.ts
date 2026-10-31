// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import type { TypeInfo } from './api-doc-types.ts';

import { TS_GLOBAL_TYPES } from './api-doc-constants.ts';
import { resolveLinks } from './api-doc-link-rendering.ts';

const AUGMENTS_ARRAY = 'Augments the built-in {@link Array} interface.';

describe('resolveLinks', () => {
  it('should link a built-in to its external documentation from its own augmentation page', () => {
    const allTypes = new Map([['Array', createType('Array')]]);
    expect(resolveLinks(AUGMENTS_ARRAY, allTypes, 'Array')).toBe(`Augments the built-in [Array](${String(TS_GLOBAL_TYPES['Array'])}) interface.`);
  });

  it('should link an augmented built-in to its augmentation page from any other page', () => {
    const allTypes = new Map([['Array', createType('Array')]]);
    const resolved = resolveLinks(AUGMENTS_ARRAY, allTypes, 'Map');
    expect(resolved).toMatch(/\[Array\]\([^)]*\/api\/[^)]*\/Array\/\)/);
  });

  it('should keep a link to its own page when the type has no external documentation', () => {
    const allTypes = new Map([['Vault', createType('Vault')]]);
    const resolved = resolveLinks('See {@link Vault}.', allTypes, 'Vault');
    expect(resolved).toMatch(/\[Vault\]\([^)]*\/api\/[^)]*\/Vault\/\)/);
  });
});

function createType(name: string): TypeInfo {
  return {
    baseTypes: [],
    description: '',
    examples: [],
    implementsTypes: [],
    isOfficial: false,
    kind: 'interface',
    methods: [],
    name,
    namespace: 'globals/augmentations',
    properties: [],
    remarks: '',
    typeParameters: []
  };
}
