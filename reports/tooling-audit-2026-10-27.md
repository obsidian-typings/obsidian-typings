# Tooling dependency audit — 2026-10-27

The three independent npm packages on `main` were audited separately with
`npm audit --json`. Auditing the locks immediately before the readonly tooling
adoption (`6c52a00a^`) reproduced the current findings: root had 13 affected
packages (6 low, 3 moderate, 4 high), `workflow-scripts` had 7 (6 low, 1 high),
and `docs` had 8 (6 low, 1 moderate, 1 high). These findings predated adoption.

Compatible `npm audit fix --ignore-scripts` updates cleared the Markdown parser,
source map, HTTP client, Vite/Vitest and selector parser findings where present.
No forced fix, toolchain downgrade or broad dependency sweep was used.

The remaining chain in every package was
`markdownlint` → `micromark-extension-math` → `katex`. The installed math extension
requires `^0.16.0`, which excludes the patched release. Each package therefore
overrides KaTeX to exactly `0.18.2`, the first version fixing
[GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7).
Each adjacent `pinned-versions.json` records the reason and a command checking the
parent's range, so a future parent upgrade triggers reconsideration.

All three updated packages report zero vulnerabilities. A display-math probe
through `micromark` and `micromark-extension-math` produced both KaTeX HTML and
MathML with the override. The repository tests and all nine `main` gates verify
the updated tooling without building the full documentation site.
