import type { ElectronPrivileges } from './ElectronPrivileges.d.ts';

/**
 * A custom scheme to be registered with a protocol, along with its privileges.
 *
 * @public
 * @unofficial
 */
export interface ElectronCustomScheme {
  /** The privileges to grant to the scheme. */
  privileges?: ElectronPrivileges;

  /** Custom scheme to be registered with options. */
  scheme: string;
}
