/**
 * @file
 *
 * Tests for the declared-surface name list a release publishes.
 *
 * Only the pure half is tested here, following `changelog.test.ts` beside it: turning a declaration file into
 * names, diffing two name sets, and rendering the diff. The git read is `ls-tree` plus `cat-file --batch`.
 */

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  collectApiNames,
  composeApiChangeLines,
  diffApiSurfaces,
  MAX_LISTED_API_NAMES
} from './api-surface.ts';

describe('collectApiNames', () => {
  it('names an augmentation and its members, and nothing about their signatures', () => {
    const text = [
      'import type { Cli } from \'../internals/cli/Cli.d.ts\';',
      'export {};',
      'declare module \'obsidian\' {',
      '  interface App {',
      '    /** CLI handler. */',
      '    cli: Cli;',
      '    getBaseFontSize(): number;',
      '    getBaseFontSize(fallback: number): number;',
      '    \'quoted-name\': string;',
      '    [key: string]: unknown;',
      '  }',
      '}'
    ].join('\n');

    expect(collectApiNames('App.d.ts', text)).toEqual(['App', 'App.cli', 'App.getBaseFontSize', 'App.getBaseFontSize', 'App.quoted-name']);
  });

  it('names top-level internals of every declaration kind', () => {
    const text = [
      'export interface Cli { run(): void; }',
      'export type CliName = string;',
      'export declare class CliImpl { constructor(); private secret: number; }',
      'export declare function getCli(): Cli;',
      'export declare const CLI_VERSION: string;',
      'export declare enum CliMode { A }'
    ].join('\n');

    expect(collectApiNames('Cli.d.ts', text)).toEqual([
      'Cli',
      'Cli.run',
      'CliName',
      'CliImpl',
      'CliImpl.constructor',
      'CliImpl.secret',
      'getCli',
      'CLI_VERSION',
      'CliMode'
    ]);
  });
});

describe('diffApiSurfaces', () => {
  it('lists what each side has and the other lacks, sorted', () => {
    expect(diffApiSurfaces(new Set(['App', 'App.b', 'App.old']), new Set(['App', 'App.a', 'App.b', 'App.z']))).toEqual({
      added: ['App.a', 'App.z'],
      removed: ['App.old']
    });
  });
});

describe('composeApiChangeLines', () => {
  it('writes nothing when the surface did not change', () => {
    expect(composeApiChangeLines({ added: [], removed: [] }, 'tag')).toEqual([]);
  });

  it('writes both lists, each counted', () => {
    expect(composeApiChangeLines({ added: ['App.a'], removed: ['App.old', 'Cli'] }, 'tag')).toEqual([
      '### Declared API changes',
      '',
      'Names only, compared with `tag`.',
      '',
      '**Added (1):**',
      '',
      '- `App.a`',
      '',
      '**Removed (2):**',
      '',
      '- `App.old`',
      '- `Cli`'
    ]);
  });

  it('summarizes a list past the cap rather than listing it whole', () => {
    const added = Array.from({ length: MAX_LISTED_API_NAMES + 2 }, (_, index) => `App.m${String(index).padStart(4, '0')}`);
    const lines = composeApiChangeLines({ added, removed: [] }, 'tag');

    expect(lines.filter((line) => line.startsWith('- `'))).toHaveLength(MAX_LISTED_API_NAMES);
    expect(lines.at(-1)).toBe('- ...and 2 more');
  });
});
