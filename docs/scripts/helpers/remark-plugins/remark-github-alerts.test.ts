import type {
  Blockquote,
  Paragraph,
  Root,
  RootContent
} from 'mdast';

// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import { remarkGitHubAlerts } from './remark-github-alerts.ts';

function blockquote(...children: Blockquote['children']): Blockquote {
  return { children, type: 'blockquote' };
}

function paragraph(value: string): Paragraph {
  return { children: [{ type: 'text', value }], type: 'paragraph' };
}

function transform(...children: RootContent[]): Root {
  const tree: Root = { children, type: 'root' };
  remarkGitHubAlerts()(tree);
  return tree;
}

describe('remarkGitHubAlerts', () => {
  it.each([
    ['NOTE', 'note'],
    ['TIP', 'tip'],
    ['IMPORTANT', 'caution'],
    ['WARNING', 'caution'],
    ['CAUTION', 'danger']
  ])('should turn a %s alert into a %s aside', (type, variant) => {
    const tree = transform(blockquote(paragraph(`[!${type}]\nBody.`)));

    expect(tree.children).toEqual([{
      attributes: {},
      children: [paragraph('Body.')],
      name: variant,
      type: 'containerDirective'
    }]);
  });

  it('should drop the marker paragraph when the marker stands on a line of its own', () => {
    const tree = transform(blockquote(paragraph('[!NOTE]'), paragraph('Body.')));

    expect(tree.children).toEqual([{
      attributes: {},
      children: [paragraph('Body.')],
      name: 'note',
      type: 'containerDirective'
    }]);
  });

  it('should keep the rest of the marker paragraph when it carries more than the marker', () => {
    const markerParagraph: Paragraph = {
      children: [{ type: 'text', value: '[!TIP]' }, { children: [{ type: 'text', value: 'Bold' }], type: 'strong' }],
      type: 'paragraph'
    };
    const tree = transform(blockquote(markerParagraph));

    expect(tree.children).toEqual([{
      attributes: {},
      children: [{
        children: [{ type: 'text', value: '' }, { children: [{ type: 'text', value: 'Bold' }], type: 'strong' }],
        type: 'paragraph'
      }],
      name: 'tip',
      type: 'containerDirective'
    }]);
  });

  it('should match the alert type case-insensitively', () => {
    const tree = transform(blockquote(paragraph('[!note] Body.')));

    expect(tree.children[0]).toMatchObject({ name: 'note', type: 'containerDirective' });
  });

  it.each([
    ['an unknown alert type', blockquote(paragraph('[!DANGER] Body.'))],
    ['a marker that does not open the paragraph', blockquote(paragraph('Body [!NOTE].'))],
    ['a blockquote opening with something other than a paragraph', blockquote({ children: [], type: 'list' })],
    ['a paragraph opening with something other than text', blockquote({ children: [{ type: 'inlineCode', value: '[!NOTE]' }], type: 'paragraph' })],
    ['an empty blockquote', blockquote()]
  ])('should leave %s as a blockquote', (_description, node) => {
    const tree = transform(structuredClone(node));

    expect(tree.children).toEqual([node]);
  });

  it('should leave an alert nested in an alert as a blockquote', () => {
    const inner = blockquote(paragraph('[!TIP] Inner.'));
    const tree = transform(blockquote(paragraph('[!NOTE] Outer.'), structuredClone(inner)));

    expect(tree.children).toEqual([{
      attributes: {},
      children: [paragraph('Outer.'), inner],
      name: 'note',
      type: 'containerDirective'
    }]);
  });

  it('should convert an alert nested in a plain blockquote', () => {
    const tree = transform(blockquote(paragraph('Quote.'), blockquote(paragraph('[!TIP] Inner.'))));

    expect(tree.children).toEqual([{
      children: [paragraph('Quote.'), {
        attributes: {},
        children: [paragraph('Inner.')],
        name: 'tip',
        type: 'containerDirective'
      }],
      type: 'blockquote'
    }]);
  });
});
