# Protocol handler runtime verification

Verified on 2026-10-27 for the maintained `release/obsidian-public/1.14.4` and `release/obsidian-catalyst/1.14.4` streams, with an additional live check on catalyst 1.15.0.

## Source identity

The `obsidian-versions` tags `1.14.4` and `catalyst/1.14.4` contain byte-identical `obsidian.asar/app.js`: git blob `8b091268ff2b18b7939891bff0b81c4b64f6fb21`. The protocol handler is `C3`, starting at line 166770. Catalyst tag `catalyst/1.15.0` contains blob `b6482efddf06b7cf792d2e0d4362feb19c80328c`; its handler is class `ZI`.

In both implementations the constructor initializes `handlers` as a `Map`, stores `app` and `workspace`, and clears the legacy `trusted-uri-actions` local-storage entry. `register` takes an action name and callback; `dispatch` invokes the registered callback synchronously. There is no trust prompt, dispatch queue, source-name registry or replacement trust API on this handler.

## Corrected declarations

The maintained interfaces remove the nonexistent fields `dispatchQueue`, `sources` and `trustedActions`; methods `getSource`, `getTrustedActions`, `promptConfirmation`, `removeTrustedAction` and `showConfirmModal`; the specialized trust-`change` event overload; and `register`'s ignored third `source` argument. The handler still extends `Events`.

These removals are breaking type corrections. Code that writes `trustedActions[action]` would throw at runtime because `trustedActions` is `undefined`. Declaring the missing members optional would still advertise an API that these application versions do not implement.

## Verification

1. Launch owned, isolated Obsidian instances pinned to 1.14.4 and 1.15.0, each with a disposable empty vault. Dispose each instance before launching the next.
2. Capture the handler's own fields, prototype methods, constructor, `register` and `dispatch` implementations.
3. Register a disposable action, dispatch parameters carrying a probe value, assert the callback runs exactly once synchronously, and unregister it in cleanup.
4. Run the crawler's `runtimeHarvest` with the protocol handler as the root. Build the target declaration program with `buildResolver`, resolve `app.workspace.protocolHandler`, and compare `membersOfType` and `ownDeclaredMembers` against the explicitly selected root constructor group. This avoids attribution through unrelated objects reachable from the app.
5. Before correction, the comparison reports nine stale own declarations, including the specialized `on` overload. After correction, both captured runtimes have zero missing or stale own declarations against each maintained stream. Inherited event methods remain available.
6. Run the full `npm run build` on each maintained stream, including lint, spellcheck, formatting, strict declaration and bundle checks, API Extractor, and all seven consumer scenarios.

Both live samples expose own fields `_`, `app`, `handlers` and `workspace`. Their protocol-handler prototype contains `dispatch`, `execCapacitorUrl`, `handleXCallback`, `init`, `register`, `registerDefaultHandlers` and `unregister`, plus the constructor. The `_` storage belongs to the event implementation.

The 1.15.0 observation confirms the reported symptom but does not create a declaration stream for that application version. Carry the source check forward when creating newer release branches.
