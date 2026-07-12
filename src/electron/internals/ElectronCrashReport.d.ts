/**
 * The date and ID of a crash report.
 *
 * @public
 * @unofficial
 */
export interface ElectronCrashReport {
  /** The date the crash report was created. */
  date: Date;

  /** The uploaded ID of the crash report. */
  id: string;
}
