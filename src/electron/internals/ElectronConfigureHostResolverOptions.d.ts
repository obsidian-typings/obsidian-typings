/**
 * Options for configuring host resolution (DNS and DNS-over-HTTPS).
 *
 * @public
 * @unofficial
 */
export interface ElectronConfigureHostResolverOptions {
  /**
   * Controls whether additional DNS query types (e.g. HTTPS, DNS type 65) are allowed besides the
   * traditional A and AAAA queries when a request is made via insecure DNS.
   *
   * @default `true`
   */
  enableAdditionalDnsQueryTypes?: boolean;

  /**
   * Whether the built-in host resolver is used in preference to `getaddrinfo`. Enabled by default on
   * macOS, disabled by default on Windows and Linux.
   */
  enableBuiltInResolver?: boolean;

  /**
   * Configures the DNS-over-HTTP mode. Can be `off`, `automatic` or `secure`.
   *
   * @default `'automatic'`
   */
  secureDnsMode?: string;

  /** A list of DNS-over-HTTP server templates. */
  secureDnsServers?: string[];
}
