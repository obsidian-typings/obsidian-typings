import type {
  Blockquote,
  Paragraph,
  Root,
  Text
} from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';

import {
  SKIP,
  visit
} from 'unist-util-visit';

/**
 * The Starlight aside variant each GitHub alert type renders as.
 *
 * Starlight has four variants for GitHub's five types, so `IMPORTANT` and `WARNING` share `caution`, and `CAUTION` --
 * GitHub's most severe -- takes `danger`. This is the mapping `starlight-github-alerts` uses, and the one
 * `obsidian-dev-utils`' own copy of this conversion uses.
 */
export const GITHUB_ALERT_ASIDE_VARIANTS: ReadonlyMap<string, string> = new Map([
  ['caution', 'danger'],
  ['important', 'caution'],
  ['note', 'note'],
  ['tip', 'tip'],
  ['warning', 'caution']
]);

const ALERT_MARKER_REG_EXP = /^\[!(?<Type>\w+)\][\r\n]*/;

interface Alert {
  markerLength: number;
  markerParagraph: Paragraph;
  markerText: Text;
  variant: string;
}

/**
 * Remark plugin that turns GitHub alerts (`> [!NOTE]` and the other four) into Starlight asides.
 *
 * The site's Markdown runs on the `unified` processor, not on Sätteri: `astro-config.ts` sets
 * `markdown.remarkPlugins` and `@astrojs/markdown-remark` is installed, and Astro 7.3 switches the processor to
 * `unified()` for exactly that combination. Nothing in that pipeline knows GitHub's alert syntax, so until this
 * plugin every alert rendered as a plain blockquote opening with a literal `[!NOTE]` -- the changelog page, which
 * imports the checkout's `CHANGELOG.md`, is where one reaches the site.
 *
 * It replaces the blockquote with a `containerDirective` named after the aside variant, which is exactly what
 * `:::note` parses to, and Starlight's own `remarkAsides` -- which Starlight appends after the site's plugins --
 * renders it. So this has to run before that plugin, and it does by being in `markdown.remarkPlugins` at all.
 *
 * `obsidian-dev-utils` carries the same conversion as a Sätteri plugin; that API is not remark's, and this repository
 * deliberately takes no dependency on that package, so this is a port rather than an import.
 *
 * @returns The transformer.
 */
export function remarkGitHubAlerts(): (tree: Root) => void {
  return function remarkGitHubAlertsTransformer(tree: Root): void {
    visit(tree, 'blockquote', (node, index, parent) => {
      const alert = parseAlert(node);
      if (alert === null || parent === undefined || index === undefined) {
        return;
      }

      alert.markerText.value = alert.markerText.value.slice(alert.markerLength).trimStart();
      const children = [...node.children];
      // `> [!NOTE]` on a line of its own leaves its paragraph empty once the marker is gone; GitHub renders nothing
      // there, and neither should the aside.
      if (alert.markerText.value === '' && alert.markerParagraph.children.length === 1) {
        children.shift();
      }

      const directive: ContainerDirective = {
        attributes: {},
        children,
        name: alert.variant,
        type: 'containerDirective'
      };
      parent.children[index] = directive;
      // GitHub does not nest alerts, so neither do we: skipping the converted alert's children leaves an alert
      // inside an alert as a blockquote. An alert inside a plain blockquote is still reached and converted.
      return SKIP;
    });
  };
}

function parseAlert(node: Blockquote): Alert | null {
  const [firstChild] = node.children;
  if (firstChild?.type !== 'paragraph') {
    return null;
  }

  const [firstGrandChild] = firstChild.children;
  if (firstGrandChild?.type !== 'text') {
    return null;
  }

  const match = ALERT_MARKER_REG_EXP.exec(firstGrandChild.value);
  const type = match?.groups?.['Type']?.toLowerCase();
  if (match === null || type === undefined) {
    return null;
  }

  const variant = GITHUB_ALERT_ASIDE_VARIANTS.get(type);
  return variant === undefined
    ? null
    : {
      markerLength: match[0].length,
      markerParagraph: firstChild,
      markerText: firstGrandChild,
      variant
    };
}
