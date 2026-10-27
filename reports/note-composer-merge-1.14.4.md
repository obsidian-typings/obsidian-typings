# Note Composer merge verification

Verified on 2026-10-27 against the `obsidian-versions` tags `1.14.4` and `catalyst/1.14.4`. Both contain the same `obsidian.asar/app.js` blob, `8b091268ff2b18b7939891bff0b81c4b64f6fb21`.

`NoteComposerPluginInstance.mergeFile(target, source, mode?)` returns `Promise<void>`. Its optional mode is `'append' | 'prepend'`, defaulting to `'append'`. The merge dialog passes `'prepend'` when Shift is held and `'append'` otherwise.

The implementation reads the source, applies the configured template with the source and target base names, and runs the merge inside `FileManager.runAsyncLinkUpdate`. It awaits insertion into the target and trashing the source, then redirects captured resolved links from the source to the target and clears their resolved paths. The promise resolves without a value after those operations complete. Errors propagate to the caller.

The declaration belongs in `src/obsidian/internals/internal-plugins/note-composer/NoteComposerPluginInstance.d.ts` on both maintained 1.14.4 streams. `main` contains documentation and tooling only. The currently extracted catalyst 1.15.0 source exposes the same signature and sequence; verify it again when a declaration stream for that version is created.
