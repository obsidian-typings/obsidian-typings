import {
  describe,
  expect,
  it
} from 'vitest';

import {
  getMissingAugmentations,
  getModuleExportNames
} from './augmentation-coverage.ts';

describe('getModuleExportNames', () => {
  it('lists every kind of top-level export once', () => {
    const sourceText = [
      'import { Extension } from \'@codemirror/state\';',
      'export { Extension };',
      'export class App {}',
      'export interface Command {}',
      'export type IconName = string;',
      'export enum PopoverState { Shown }',
      'export function setIcon(): void;',
      'export function setIcon(name: string): void;',
      'export const apiVersion: string;',
      'export namespace Platform {}',
      'interface Internal {}',
      'declare class NotExported {}'
    ].join('\n');

    expect(getModuleExportNames(sourceText)).toEqual([
      'Extension',
      'App',
      'Command',
      'IconName',
      'PopoverState',
      'setIcon',
      'apiVersion',
      'Platform'
    ]);
  });

  it('ignores a re-export from another module', () => {
    expect(getModuleExportNames('export { x } from \'./x\';')).toEqual([]);
  });
});

describe('getMissingAugmentations', () => {
  it('matches files in any subdirectory by base name', () => {
    expect(getMissingAugmentations({
      augmentationFilePaths: ['App.d.ts', 'bases/BasesView.d.ts', String.raw`bases\BasesQuery.d.ts`, 'bases'],
      exportNames: ['App', 'BasesQuery', 'BasesView', 'FrontmatterValue', 'Command']
    })).toEqual(['Command', 'FrontmatterValue']);
  });
});
