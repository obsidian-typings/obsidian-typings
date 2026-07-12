/**
 * Electron ContextBridge for exposing APIs from an isolated preload script to the main world.
 *
 * @public
 * @unofficial
 */
export interface ElectronContextBridge {
  /**
   * Exposes an API to the main world under `window[apiKey]`. The `api` is proxied across the context bridge so that the main world cannot mutate the isolated world's objects.
   *
   * @param apiKey - The key on `window` the `api` is exposed under.
   * @param api - The API object to expose. Modeled as `unknown` (the upstream type is `any`).
   */
  exposeInMainWorld(apiKey: string, api: unknown): void;
}
