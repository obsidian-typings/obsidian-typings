/**
 * Proxy configuration for a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronConfig {
  /** The proxy mode. If unspecified, it is determined automatically based on other options. */
  mode?: 'auto_detect' | 'direct' | 'fixed_servers' | 'pac_script' | 'system';

  /** The URL associated with the PAC file. */
  pacScript?: string;

  /** Rules indicating which URLs should bypass the proxy settings. */
  proxyBypassRules?: string;

  /** Rules indicating which proxies to use. */
  proxyRules?: string;
}
