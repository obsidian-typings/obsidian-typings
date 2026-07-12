/**
 * Details of a console message logged by a service worker.
 *
 * @public
 * @unofficial
 */
export interface ElectronMessageDetails {
  /** The log level, from 0 to 3, matching `verbose`, `info`, `warning` and `error`. */
  level: number;

  /** The line number of the source that triggered this console message. */
  lineNumber: number;

  /** The actual console message. */
  message: string;

  /** The type of source for this message. */
  source: 'console-api' | 'deprecation' | 'intervention' | 'javascript' | 'network' | 'other' | 'recommendation' | 'rendering' | 'security' | 'storage' | 'violation' | 'worker' | 'xml';

  /** The URL the message came from. */
  sourceUrl: string;

  /** The version ID of the service worker that sent the log message. */
  versionId: number;
}
