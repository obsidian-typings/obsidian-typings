/**
 * The parsed form of an Ex command line, handed to the function registered for that command.
 *
 * @public
 * @unofficial
 */
export interface VimExCommandParams {
  /**
   * The whitespace-separated arguments that followed the command name.
   */
  args?: string[];

  /**
   * Everything that followed the command name, unsplit.
   */
  argString: string;

  /**
   * The name the command was invoked under, which may be an abbreviation of its full name.
   */
  commandName: string;

  /**
   * The whole command line as the user typed it, including the leading `:`.
   */
  input: string;

  /**
   * The first line of the range the command applies to.
   */
  line: number;

  /**
   * The last line of the range the command applies to, when a range was given.
   */
  lineEnd?: number;

  /**
   * The first line of the range, as derived from the current selection.
   */
  selectionLine: number;

  /**
   * The last line of the range, as derived from the current selection.
   */
  selectionLineEnd?: number;

  /**
   * The option-setting configuration parsed out of a `:set` command.
   */
  setCfg?: object;
}
