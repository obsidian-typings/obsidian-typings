/**
 * @file
 *
 * Finds GitHub alerts that reached the built documentation site as plain blockquotes.
 */

/**
 * A built page of the site.
 */
export interface BuiltPage {
  /**
   * The page's HTML.
   */
  html: string;

  /**
   * The page's path relative to the output root.
   */
  relativePath: string;
}

/**
 * A GitHub alert that rendered as a plain blockquote.
 */
export interface UnrenderedAlert {
  /**
   * The alert marker as it appears on the page, e.g. `[!WARNING]`.
   */
  marker: string;

  /**
   * The page's path relative to the output root.
   */
  relativePath: string;
}

/**
 * Matches a blockquote whose first paragraph opens with a GitHub alert marker -- the exact shape an alert takes when
 * nothing converted it. A marker quoted in prose or inside a code sample does not match, because it does not open a
 * blockquote's first paragraph; four generated API pages carry one inside a code sample, which is why this is not a
 * plain search for `[!NOTE]`.
 */
const UNRENDERED_ALERT_REG_EXP = /<blockquote[^>]*>\s*<p[^>]*>\s*\[!(?:caution|important|note|tip|warning)\]/giu;

/**
 * Collects every GitHub alert that rendered as a plain blockquote rather than as a Starlight aside.
 *
 * The conversion is a Markdown-processor plugin, and when a processor switch leaves it unregistered nothing fails: the
 * site builds and every alert shows its literal `[!TYPE]` marker. Scanning the output is the check that holds
 * whichever plugin performs the conversion.
 *
 * @param pages - The built pages.
 * @returns The unrendered alerts, in page order.
 */
export function collectUnrenderedAlerts(pages: readonly BuiltPage[]): UnrenderedAlert[] {
  const unrenderedAlerts: UnrenderedAlert[] = [];
  for (const page of pages) {
    for (const match of page.html.matchAll(UNRENDERED_ALERT_REG_EXP)) {
      unrenderedAlerts.push({
        marker: match[0].slice(match[0].indexOf('[!')),
        relativePath: page.relativePath
      });
    }
  }

  return unrenderedAlerts;
}

/**
 * Formats unrendered alerts as one line each.
 *
 * @param unrenderedAlerts - The unrendered alerts.
 * @returns The formatted report.
 */
export function formatUnrenderedAlerts(unrenderedAlerts: readonly UnrenderedAlert[]): string {
  return unrenderedAlerts.map((alert) => `  ${alert.relativePath}: ${alert.marker}`).join('\n');
}
