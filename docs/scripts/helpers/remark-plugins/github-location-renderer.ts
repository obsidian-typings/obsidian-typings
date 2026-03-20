import type { Element } from 'hast';
import type { Root } from 'mdast';

import { fromHtml } from 'hast-util-from-html';
import { h } from 'hastscript';
import { readFileSync } from 'node:fs';
import {
  dirname,
  join
} from 'node:path/posix';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

import { decorateHast } from './util.ts';

const ICONS_DIR = join(dirname(fileURLToPath(import.meta.url).replaceAll('\\', '/')), 'icons');

interface HeadingChild {
  value?: string;
}

interface LinkListNode {
  children: LinkNode[];
}

interface LinkNode {
  url: string;
}

interface SiblingNode {
  children?: unknown[];
  className?: string[];
  depth?: number;
  properties?: SiblingProperties;
  tagName?: string;
  type: string;
}

interface SiblingProperties {
  className?: string[];
}

interface SiblingWithLinks {
  children: LinkListNode[];
}

const SPLICE_COUNT = 2;

/**
 * Removes the "Defined in" headings, and moves the github link to the previous heading (the actual definition).
 */
export function githubLocationRenderer(): (tree: Root) => void {
  return function githubLocationVisitor(tree: Root): void {
    visit(tree, (node, index, parent) => {
      if (node.type !== 'heading' || index === undefined || !parent) {
        return;
      }

      const headingNode = node as { children: HeadingChild[]; depth: number } & typeof node;
      const firstChild = headingNode.children[0];
      if (firstChild?.value !== 'Defined in') {
        return;
      }

      const nextSibling = parent.children[index + 1] as SiblingWithLinks | undefined;
      if (!nextSibling) {
        return;
      }
      const href = nextSibling.children[0]?.children[0]?.url;

      let prevHeading: null | SiblingNode = null;
      for (let i = index - 1; i >= 0; i--) {
        const sibling = parent.children[i] as SiblingNode;

        if (
          (sibling.tagName === 'div' && sibling.properties?.className?.includes('object-signature'))
          || (sibling.type === 'heading' && (sibling.depth ?? 0) < headingNode.depth)
        ) {
          prevHeading = sibling;
          break;
        }
      }

      const githubIcon = loadGithubIcon();

      if (prevHeading?.children) {
        prevHeading.children.push(h('a', { class: 'code-location-icon', href }, [githubIcon]));
        decorateHast(prevHeading as Element);
        parent.children.splice(index, SPLICE_COUNT);
      } else {
        const containerNode = h('a', { class: 'code-location-text', href }, [githubIcon, {
          type: 'text',
          value: 'Code location'
        }]);
        decorateHast(containerNode);
        parent.children.splice(index, SPLICE_COUNT);
        parent.children.unshift(containerNode as never);
      }
    });
  };
}

function loadGithubIcon(): ReturnType<typeof fromHtml> {
  const svg = readFileSync(join(ICONS_DIR, 'github.svg'), 'utf-8');
  return fromHtml(svg.replace('width="24"', 'width="16"').replace('height="24"', 'height="16"'));
}
