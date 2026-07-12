import type { ElectronFromPartitionOptions } from './ElectronFromPartitionOptions.d.ts';
import type { Session } from './Session.d.ts';

/**
 * The `session` module accessor exposed by Electron, providing the default session and a factory for partition-based sessions.
 *
 * @public
 * @unofficial
 */
export interface ElectronSessionModule {
  /** The default session object of the app. */
  defaultSession: Session;

  /**
   * Returns a session instance from a `partition` string. When there is an existing `Session` with the same `partition`, it will be returned; otherwise a new `Session` instance will be created with `options`.
   *
   * If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. If the `partition` is empty then default session of the app will be returned.
   *
   * @param partition - The partition string identifying the session.
   * @param options - Options used when creating the session.
   * @returns The `Session` instance for the given partition.
   */
  fromPartition(partition: string, options?: ElectronFromPartitionOptions): Session;
}
