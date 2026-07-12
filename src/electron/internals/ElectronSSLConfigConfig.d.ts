/**
 * SSL configuration for a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronSSLConfigConfig {
  /** List of cipher suites which should be explicitly prevented from being used, in addition to those disabled by the net built-in policy. */
  disabledCipherSuites?: number[];

  /** The maximum SSL version to allow when connecting to remote servers. Can be `tls1.2` or `tls1.3`. */
  maxVersion?: string;

  /** The minimum SSL version to allow when connecting to remote servers. Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. */
  minVersion?: string;
}
