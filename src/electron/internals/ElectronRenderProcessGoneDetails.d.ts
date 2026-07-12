/**
 * Details about a renderer process that has gone (crashed or killed).
 *
 * @public
 * @unofficial
 */
export interface ElectronRenderProcessGoneDetails {
  /** The exit code of the process, unless `reason` is `launch-failed`, in which case it is a platform-specific launch failure error code. */
  exitCode: number;

  /** The reason the render process is gone. */
  reason: 'abnormal-exit' | 'clean-exit' | 'crashed' | 'integrity-failure' | 'killed' | 'launch-failed' | 'oom';
}
