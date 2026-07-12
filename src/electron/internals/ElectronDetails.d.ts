/**
 * Details about a child process that has gone (crashed or killed).
 *
 * @public
 * @unofficial
 */
export interface ElectronDetails {
  /** The exit code for the process. */
  exitCode: number;

  /** The name of the process. */
  name?: string;

  /** The reason the child process is gone. */
  reason: 'abnormal-exit' | 'clean-exit' | 'crashed' | 'integrity-failure' | 'killed' | 'launch-failed' | 'oom';

  /** The non-localized name of the process. */
  serviceName?: string;

  /** Process type. */
  type: 'GPU' | 'Pepper Plugin' | 'Pepper Plugin Broker' | 'Sandbox helper' | 'Unknown' | 'Utility' | 'Zygote';
}
