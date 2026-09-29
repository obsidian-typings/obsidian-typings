// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  collectUnrenderedAlerts,
  formatUnrenderedAlerts
} from './unrendered-alerts.ts';

describe('collectUnrenderedAlerts', () => {
  it('should report a blockquote whose first paragraph opens with an alert marker', () => {
    const alerts = collectUnrenderedAlerts([
      { html: '<h1>CHANGELOG</h1>\n<blockquote>\n<p>[!NOTE]</p>\n<p>Body.</p>\n</blockquote>', relativePath: 'a/index.html' },
      { html: '<blockquote class="x"><p dir="auto"> [!caution] Body.</p></blockquote>', relativePath: 'b/index.html' }
    ]);

    expect(alerts).toEqual([
      { marker: '[!NOTE]', relativePath: 'a/index.html' },
      { marker: '[!caution]', relativePath: 'b/index.html' }
    ]);
  });

  it('should report every unrendered alert on a page', () => {
    const html = '<blockquote><p>[!TIP] One.</p></blockquote><blockquote><p>[!WARNING] Two.</p></blockquote>';

    expect(collectUnrenderedAlerts([{ html, relativePath: 'p.html' }]).map((alert) => alert.marker)).toEqual(['[!TIP]', '[!WARNING]']);
  });

  it.each([
    ['a rendered aside', '<aside class="starlight-aside starlight-aside--note"><p>Body.</p></aside>'],
    ['a marker inside a code sample', '<pre><code>Paragraph section\n&gt; [!NOTE]\n&gt; Callout section</code></pre>'],
    ['a marker in prose', '<p>Write <code>[!NOTE]</code> to open an alert.</p>'],
    ['a blockquote whose first paragraph does not open with a marker', '<blockquote><p>Body [!NOTE].</p></blockquote>'],
    ['an unknown alert type', '<blockquote><p>[!DANGER] Body.</p></blockquote>']
  ])('should not report %s', (_description, html) => {
    expect(collectUnrenderedAlerts([{ html, relativePath: 'p.html' }])).toEqual([]);
  });
});

describe('formatUnrenderedAlerts', () => {
  it('should format one line per alert', () => {
    expect(formatUnrenderedAlerts([
      { marker: '[!NOTE]', relativePath: 'a/index.html' },
      { marker: '[!TIP]', relativePath: 'b/index.html' }
    ])).toBe('  a/index.html: [!NOTE]\n  b/index.html: [!TIP]');
  });
});
