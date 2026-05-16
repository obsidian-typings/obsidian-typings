import type { Doc } from './Doc.d.ts';

/**
 * Configuration options for a CodeMirror 5 editor instance.
 *
 * @public
 * @unofficial
 */
export interface Cm5EditorConfiguration {
  /** The number of spaces a block should be indented. */
  indentUnit?: number;
  /** Whether to indent with tabs. */
  indentWithTabs?: boolean;
  /** Whether to show line numbers. */
  lineNumbers?: boolean;
  /** Whether to enable line wrapping. */
  lineWrapping?: boolean;
  /** The mode specification. */
  mode?: object | string;
  /** Whether the editor is read-only. */
  readOnly?: 'nocursor' | boolean;
  /** The tab size in spaces. */
  tabSize?: number;
  /** The theme to style the editor with. */
  theme?: string;
  /** The starting value of the editor. */
  value?: Doc | string;
  /** Additional configuration options. */
  [key: string]: unknown;
}
