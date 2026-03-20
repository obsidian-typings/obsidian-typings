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

interface CalloutType {
  representation: string;
  svgFile: string;
}

interface DirectiveNode {
  children: Element[];
  name: string;
  properties: Record<string, string>;
  tagName: string;
  type: string;
}

const STARLIGHT_BUILTIN_ASIDES = new Set(['caution', 'danger', 'note', 'tip']);

const ACCEPTABLE_CALLOUT_TYPES: Record<string, CalloutType> = {
  deprecated: { representation: 'Deprecated', svgFile: 'deprecated.svg' },
  official: { representation: 'Official', svgFile: 'official.svg' },
  remark: { representation: 'Remark', svgFile: 'remark.svg' },
  todo: { representation: 'Todo', svgFile: 'todo.svg' },
  tutorial: { representation: 'Tutorial', svgFile: 'tutorial.svg' },
  unofficial: { representation: 'Unofficial', svgFile: 'unofficial.svg' }
};

export function admonitionRenderer(): (tree: Root) => void {
  return function admonitionRendererVisitor(tree: Root): void {
    visit(tree, (node) => {
      if (node.type !== 'leafDirective' && node.type !== 'containerDirective') {
        return;
      }

      const directiveNode = toDirectiveNode(node);
      if (STARLIGHT_BUILTIN_ASIDES.has(directiveNode.name)) {
        return;
      }
      const calloutType = ACCEPTABLE_CALLOUT_TYPES[directiveNode.name];
      if (!calloutType) {
        throw new Error(`Unsupported callout type: "${directiveNode.name}". Supported types: ${Object.keys(ACCEPTABLE_CALLOUT_TYPES).join(', ')}`);
      }
      const svg = fromHtml(loadIcon(calloutType.svgFile));

      const bodyContainer = h(
        'section',
        { class: 'starlight-aside__content' },
        directiveNode.children
      );

      const titleContainer = h(
        'p',
        { 'aria-hidden': 'true', 'class': 'starlight-aside__title' },
        [svg, calloutType.representation]
      );

      directiveNode.tagName = 'aside';
      directiveNode.properties = {
        'aria-label': calloutType.representation,
        'class': `starlight-aside starlight-aside--${directiveNode.name}`
      };
      directiveNode.children = [titleContainer, bodyContainer];

      decorateHast(directiveNode as Element);
    });
  };
}

function loadIcon(svgFile: string): string {
  return readFileSync(join(ICONS_DIR, svgFile), 'utf-8');
}

function toDirectiveNode(node: unknown): DirectiveNode {
  return node as DirectiveNode;
}
