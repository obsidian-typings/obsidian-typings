# obsidian-typings

## Current Task

Working on 11 docs redesign items for feature parity with official Obsidian docs. See memory/docs-todo.md.

## Pending Questions

### Q1: Re-enable graph view and link validator?

**Context**: starlight-theme-obsidian (graph) and starlight-links-validator were disabled because they caused builds to hang/timeout with 11K+ pages. The site-graph plugin took 30+ min on its own.

**Options**:
- A) Re-enable both — accept slower builds (~1hr), CI can handle it
- B) Re-enable graph only — link validator was the main bottleneck
- C) Keep both disabled for now — focus on getting the content right first, enable in a separate PR
- D) Reduce page count first (e.g., remove per-property pages) then re-enable

**Auto-selected**: **C** — Focus on content quality. Graph and link validator are production concerns that can be enabled when we're ready to deploy. The current priority is getting the generator feature-complete.
