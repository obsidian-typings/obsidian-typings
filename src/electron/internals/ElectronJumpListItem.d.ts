/**
 * A single item in a Windows Jump List.
 *
 * @public
 * @unofficial
 */
export interface ElectronJumpListItem {
  /** The command line arguments when `program` is executed. Should only be set if `type` is `task`. */
  args?: string;

  /** Description of the task (displayed in a tooltip). Should only be set if `type` is `task`. Maximum length 260 characters. */
  description?: string;

  /** The zero-based index of the icon in the resource file. */
  iconIndex?: number;

  /** The absolute path to an icon to be displayed in a Jump List. */
  iconPath?: string;

  /** Path of the file to open. Should only be set if `type` is `file`. */
  path?: string;

  /** Path of the program to execute. Should only be set if `type` is `task`. */
  program?: string;

  /** The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`. */
  title?: string;

  /** The type of the Jump List item. */
  type?: 'file' | 'separator' | 'task';

  /** The working directory. */
  workingDirectory?: string;
}
