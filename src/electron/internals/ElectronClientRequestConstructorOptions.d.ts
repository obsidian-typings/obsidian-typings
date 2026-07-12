import type { Session } from './Session.d.ts';

/**
 * Options for constructing a `ClientRequest`.
 *
 * @public
 * @unofficial
 */
export interface ElectronClientRequestConstructorOptions {
  /**
   * Can be `include` or `omit`. Whether to send credentials with this request. If set to `include`, credentials from
   * the session associated with the request will be used. If set to `omit`, credentials will not be sent with the
   * request (and the `'login'` event will not be triggered in the event of a 401). This matches the behavior of the
   * fetch option of the same name. If this option is not specified, authentication data from the session will be
   * sent, and cookies will not be sent (unless `useSessionCookies` is set).
   */
  credentials?: 'include' | 'omit';

  /** The server host provided as a concatenation of the hostname and the port number `'hostname:port'`. */
  host?: string;

  /** The server host name. */
  hostname?: string;

  /**
   * The HTTP request method.
   *
   * @default `'GET'`
   */
  method?: string;

  /** The origin URL of the request. */
  origin?: string;

  /**
   * The name of the `partition` with which the request is associated. The `session` option supersedes `partition`.
   * Thus if a `session` is explicitly specified, `partition` is ignored.
   *
   * @default `''`
   */
  partition?: string;

  /** The path part of the request URL. */
  path?: string;

  /** The server's listening port number. */
  port?: number;

  /**
   * Can be `http:` or `https:`. The protocol scheme in the form `'scheme:'`.
   *
   * @default `'http:'`
   */
  protocol?: string;

  /**
   * Can be `follow`, `error` or `manual`. The redirect mode for this request. When mode is `error`, any redirection
   * will be aborted. When mode is `manual` the redirection will be cancelled unless `request.followRedirect` is
   * invoked synchronously during the `redirect` event.
   *
   * @default `'follow'`
   */
  redirect?: 'error' | 'follow' | 'manual';

  /** The `Session` instance with which the request is associated. */
  session?: Session;

  /** The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https. */
  url?: string;

  /**
   * Whether to send cookies with this request from the provided session. If `credentials` is specified, this option
   * has no effect.
   *
   * @default `false`
   */
  useSessionCookies?: boolean;
}
