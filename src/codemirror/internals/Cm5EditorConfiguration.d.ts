import type { Cm5Editor } from './Cm5Editor.d.ts';
import type { Cm5GutterConfig } from './Cm5GutterConfig.d.ts';
import type { Cm5InputStyle } from './Cm5InputStyle.d.ts';
import type { Cm5KeyMap } from './Cm5KeyMap.d.ts';
import type { Cm5ModeSpec } from './Cm5ModeSpec.d.ts';
import type { Cm5MouseSelectionConfiguration } from './Cm5MouseSelectionConfiguration.d.ts';
import type { Doc } from './Doc.d.ts';

/**
 * Configuration options for a CodeMirror 5 editor instance.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorConfiguration {
  /** Whether to add an extra CSS class indicating the inner mode to each token. */
  addModeClass?: boolean;
  /** When set, only files whose MIME type is in this array can be dropped. */
  allowDropFileTypes?: null | string[];
  /** Whether to enable autocapitalize on the input. */
  autocapitalize?: boolean;
  /** Whether to enable autocorrect on the input. */
  autocorrect?: boolean;
  /** Whether to auto-focus on initialization. */
  autofocus?: boolean;
  /** Whether the gutter will be covered when next to a scrollbar. */
  coverGutterNextToScrollbar?: boolean;
  /** Half-period in milliseconds used for cursor blinking. */
  cursorBlinkRate?: number;
  /** Determines the height of the cursor (0 to 1). */
  cursorHeight?: number;
  /** Extra space above and below the cursor when approaching the visible edge. */
  cursorScrollMargin?: number;
  /** Flips overall layout direction ("ltr" or "rtl"). */
  direction?: 'ltr' | 'rtl';
  /** Controls whether drag-and-drop is enabled. */
  dragDrop?: boolean;
  /** Whether to re-indent when a character is typed that might change indentation. */
  electricChars?: boolean;
  /** Can be used to specify extra keybindings for the editor. */
  extraKeys?: Cm5KeyMap | null | string;
  /** At which number to start counting lines. */
  firstLineNumber?: number;
  /** Whether the gutter stays fixed during horizontal scrolling. */
  fixedGutter?: boolean;
  /** Whether to combine adjacent tokens with the same class into a single span. */
  flattenSpans?: boolean;
  /** An array of CSS class names for gutters. */
  gutters?: Array<Cm5GutterConfig | string>;
  /** The period of inactivity (ms) before a new history event is started. */
  historyEventDelay?: number;
  /** The number of spaces a block should be indented. */
  indentUnit?: number;
  /** Whether to indent with tabs. */
  indentWithTabs?: boolean;
  /** Selects the input model ("textarea" or "contenteditable"). */
  inputStyle?: Cm5InputStyle;
  /** Configures the keymap to use. */
  keyMap?: string;
  /** Whether to show line numbers. */
  lineNumbers?: boolean;
  /** Explicitly set the line separator for the editor. */
  lineSeparator?: null | string;
  /** Whether to enable line-wise copy/cut when there is no selection. */
  lineWiseCopyCut?: boolean;
  /** Whether to enable line wrapping. */
  lineWrapping?: boolean;
  /** Position beyond which highlighting gives up. */
  maxHighlightLength?: number;
  /** The mode specification. */
  mode?: Cm5ModeSpec<unknown> | null | string;
  /** Whether to paste one line per selection when counts match. */
  pasteLinesPerSelection?: boolean;
  /** An object mapping strings to translations for i18n. */
  phrases?: Record<string, unknown>;
  /** How quickly (ms) CodeMirror should poll its input for changes. */
  pollInterval?: number;
  /** Whether the editor is read-only. */
  readOnly?: 'nocursor' | boolean;
  /** Controls whether the context menu resets the selection. */
  resetSelectionOnContextMenu?: boolean;
  /** Whether horizontal cursor movement through RTL text is visual. */
  rtlMoveVisually?: boolean;
  /** A label read by screen readers when the editor is focused. */
  screenReaderLabel?: string;
  /** Chooses a scrollbar implementation ("native" or "null"). */
  scrollbarStyle?: string;
  /** Whether multiple selections are joined when they touch. */
  selectionsMayTouch?: boolean;
  /** Whether the cursor should be drawn when a selection is active. */
  showCursorWhenSelecting?: boolean;
  /** Whether to use context-sensitive indentation. */
  smartIndent?: boolean;
  /** A regular expression for characters that should be replaced by a placeholder. */
  specialChars?: RegExp;
  /** Whether to enable spellcheck on the input. */
  spellcheck?: boolean;
  /** The tab index to assign to the editor. */
  tabindex?: number;
  /** The tab size in spaces. */
  tabSize?: number;
  /** The theme to style the editor with. */
  theme?: string;
  /** The maximum number of undo levels stored. */
  undoDepth?: number;
  /** The starting value of the editor. */
  value?: Doc | string;
  /** Specifies the amount of lines rendered above and below the visible area. */
  viewportMargin?: number;
  /** How long (ms) the highlighting thread works before sleeping. */
  workDelay?: number;
  /** How long (ms) the highlighting thread sleeps between work periods. */
  workTime?: number;
  /** Allows you to configure the behavior of mouse selection and dragging. */
  configureMouse?(cm: Cm5Editor, repeat: 'double' | 'single' | 'triple', event: Event): Cm5MouseSelectionConfiguration;
  /** A function to format line numbers. */
  lineNumberFormatter?(line: number): string;
  /** Deprecated drag event handler. */
  onDragEvent?(instance: Cm5Editor, event: DragEvent): boolean;
  /** Deprecated key event handler. */
  onKeyEvent?(instance: Cm5Editor, event: KeyboardEvent): boolean;
  /** A function that produces a DOM node for special characters. */
  specialCharPlaceholder?(char: string): HTMLElement;
  /** Additional configuration options. */
  [key: string]: unknown;
}
