/**
 * A task in the Tasks category of a Windows Jump List.
 *
 * @public
 * @unofficial
 */
export interface ElectronTask {
  /** The command line arguments when `program` is executed. */
  arguments: string;

  /** Description of this task. */
  description: string;

  /** The icon index in the icon file. If an icon file consists of one icon, this value is `0`. */
  iconIndex: number;

  /** The absolute path to an icon to be displayed in a Jump List. */
  iconPath: string;

  /** Path of the program to execute, usually `process.execPath`. */
  program: string;

  /** The string to be displayed in a Jump List. */
  title: string;

  /** The working directory. */
  workingDirectory?: string;
}
