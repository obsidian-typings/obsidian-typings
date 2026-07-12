import type { ElectronCrashReport } from './ElectronCrashReport.d.ts';
import type { ElectronCrashReporterStartOptions } from './ElectronCrashReporterStartOptions.d.ts';

/**
 * Electron CrashReporter for submitting crash reports to a remote server.
 *
 * @public
 * @unofficial
 */
export interface ElectronCrashReporter {
  /**
   * Sets an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. Parameters added in this fashion are specific to the calling process.
   *
   * @param key - The parameter key. Must be no longer than 39 bytes.
   * @param value - The parameter value. Must be no longer than 20320 bytes.
   */
  addExtraParameter(key: string, value: string): void;

  /**
   * Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded.
   *
   * @returns The last uploaded crash report, or `null` if there are no uploaded reports.
   */
  getLastCrashReport(): ElectronCrashReport;

  /**
   * Returns the current `extra` parameters of the crash reporter.
   *
   * @returns The current `extra` parameters.
   */
  getParameters(): Record<string, string>;

  /**
   * Returns all uploaded crash reports. Each report contains the date and uploaded ID.
   *
   * @returns The uploaded crash reports.
   */
  getUploadedReports(): ElectronCrashReport[];

  /**
   * Returns whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.
   *
   * @returns Whether reports should be submitted to the server.
   */
  getUploadToServer(): boolean;

  /**
   * Removes an extra parameter from the current set of parameters. Future crashes will not include this parameter.
   *
   * @param key - The parameter key to remove.
   */
  removeExtraParameter(key: string): void;

  /**
   * Sets whether reports should be submitted to the server. This would normally be controlled by user preferences. This has no effect if called before `start` is called.
   *
   * @param uploadToServer - Whether reports should be submitted to the server.
   */
  setUploadToServer(uploadToServer: boolean): void;

  /**
   * Initializes the crash reporter. This method must be called before using any other `crashReporter` APIs. Once initialized, the crashpad handler collects crashes from all subsequently created processes.
   *
   * @param options - The crash reporter options.
   */
  start(options: ElectronCrashReporterStartOptions): void;
}
