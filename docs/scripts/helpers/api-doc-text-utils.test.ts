// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import { stripMarkdown } from './api-doc-text-utils.ts';

describe('stripMarkdown', () => {
  it('should keep the target of a bare link', () => {
    expect(stripMarkdown('It renders the base off-screen via {@link getBasesControllerFromRender}, waits.')).toBe(
      'It renders the base off-screen via getBasesControllerFromRender, waits.'
    );
  });

  it('should prefer the display text of a link that has one', () => {
    expect(stripMarkdown('See {@link App.vault | the vault}.')).toBe('See the vault.');
  });

  it('should treat linkcode and linkplain like link', () => {
    expect(stripMarkdown('{@linkcode Foo} and {@linkplain Bar | bar}')).toBe('Foo and bar');
  });

  it('should keep markdown link text and drop formatting', () => {
    expect(stripMarkdown('A `.base` file, [docs](https://example.com) and **bold**')).toBe('A .base file, docs and bold');
  });

  it('should leave text within the limit untouched', () => {
    const text = 'word '.repeat(31).trim();
    expect(text.length).toBeLessThanOrEqual(160);
    expect(stripMarkdown(text)).toBe(text);
  });

  it('should cut long text at a word boundary and end it with an ellipsis', () => {
    const result = stripMarkdown(`${'alpha '.repeat(30)}omega`);
    expect(result.length).toBeLessThanOrEqual(160);
    expect(result.endsWith('alpha…')).toBe(true);
  });

  it('should not leave trailing punctuation before the ellipsis', () => {
    const result = stripMarkdown(`${'x'.repeat(150)}, ${'y'.repeat(20)}`);
    expect(result).toBe(`${'x'.repeat(150)}…`);
  });
});
