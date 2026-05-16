import type { EditorState } from '../../@codemirror__state/internals/EditorState.d.ts';
import type { Extension } from '../../@codemirror__state/internals/Extension.d.ts';
import type { Facet } from '../../@codemirror__state/internals/Facet.d.ts';
import type { StateEffectType } from '../../@codemirror__state/internals/StateEffectType.d.ts';
import type { Transaction } from '../../@codemirror__state/internals/Transaction.d.ts';
import type { TransactionSpec } from '../../@codemirror__state/internals/TransactionSpec.d.ts';
import type { StyleModule } from '../../style-mod/internals/StyleModule.d.ts';
import type { StyleSpec } from '../../style-mod/internals/StyleSpec.d.ts';
import type { DecorationSet } from './DecorationSet.d.ts';
import type { DOMEventHandlers } from './DOMEventHandlers.d.ts';
import type { EditorViewConfig } from './EditorViewConfig.d.ts';
import type { MeasureRequest } from './MeasureRequest.d.ts';
import type { PluginValue } from './PluginValue.d.ts';
import type { Rect } from './Rect.d.ts';
import type { ViewPlugin } from './ViewPlugin.d.ts';
import type { ViewUpdate } from './ViewUpdate.d.ts';

/**
 * The main editor view class that manages the editor's DOM and state.
 *
 * @public
 * @unofficial
 */
export declare class EditorView {
  /** A facet that announces messages to screen readers. */
  static announce: StateEffectType<string>;

  /** The editable content DOM element. */
  readonly contentDOM: HTMLElement;

  /** A facet to provide decorations to the editor. */
  static decorations: Facet<((view: EditorView) => DecorationSet) | DecorationSet, readonly (((view: EditorView) => DecorationSet) | DecorationSet)[]>;

  /** The outer DOM element of the editor. */
  readonly dom: HTMLElement;

  /** A facet controlling whether the editor is editable. */
  static editable: Facet<boolean, boolean>;

  /** The scrollable DOM element. */
  readonly scrollDOM: HTMLElement;

  /** A facet for providing style modules to the editor. */
  static styleModule: Facet<StyleModule, readonly StyleModule[]>;

  /** A facet for registering update listeners. */
  static updateListener: Facet<(update: ViewUpdate) => void, readonly ((update: ViewUpdate) => void)[]>;

  /** */
  constructor(config?: EditorViewConfig);

  /**
   * Create an extension that provides a base theme.
   *
   * @param spec - The theme specification.
   * @returns An extension.
   */
  static baseTheme(spec: { [selector: string]: StyleSpec }): Extension;

  /** Whether the editor is currently composing (IME input). */
  get composing(): boolean;

  /**
   * Get the coordinates at a document position.
   *
   * @param pos - The document position.
   * @param side - Which side of the character to measure.
   * @returns The coordinates, or `null` if not available.
   */
  coordsAtPos(pos: number, side?: -1 | 1): null | Rect;

  /** The default character width in pixels. */
  get defaultCharacterWidth(): number;

  /** The default line height in pixels. */
  get defaultLineHeight(): number;

  /** Destroy the editor view. */
  destroy(): void;

  /**
   * Dispatch a transaction to the editor.
   *
   * @param tr - The transaction to dispatch.
   */
  dispatch(tr: Transaction): void;
  /**
   * Dispatch multiple transactions to the editor.
   *
   * @param trs - The transactions to dispatch.
   */
  dispatch(trs: readonly Transaction[]): void;
  /**
   * Dispatch transaction specs to the editor.
   *
   * @param specs - The transaction specs to dispatch.
   */
  dispatch(...specs: TransactionSpec[]): void;

  /**
   * Create DOM event handler extensions.
   *
   * @param handlers - The event handlers.
   * @returns An extension.
   */
  static domEventHandlers(handlers: DOMEventHandlers<PluginValue>): Extension;

  /**
   * Create DOM event observer extensions.
   *
   * @param observers - The event observers.
   * @returns An extension.
   */
  static domEventObservers(observers: DOMEventHandlers<PluginValue>): Extension;

  /**
   * Find an editor view from a DOM element.
   *
   * @param dom - The DOM element to search from.
   * @returns The editor view, or `null` if not found.
   */
  static findFromDOM(dom: HTMLElement): EditorView | null;

  /** Focus the editor. */
  focus(): void;

  /** Whether the editor currently has focus. */
  get hasFocus(): boolean;

  /** Whether the editor is currently visible in the viewport. */
  get inView(): boolean;

  /**
   * Get the value of a view plugin.
   *
   * @param plugin - The view plugin to look up.
   * @returns The plugin value, or `null` if not present.
   */
  plugin<T extends PluginValue>(plugin: ViewPlugin<T>): null | T;

  /**
   * Find the document position at the given screen coordinates.
   *
   * @param coords - The screen coordinates.
   * @returns The document position, or `null` if not found.
   */
  posAtCoords(coords: { x: number; y: number }): null | number;

  /**
   * Find the document position corresponding to a DOM node and offset.
   *
   * @param node - The DOM node.
   * @param offset - The offset within the node.
   * @returns The document position.
   */
  posAtDOM(node: Node, offset?: number): number;

  /**
   * Schedule a layout measurement.
   *
   * @param request - The measurement request.
   */
  requestMeasure<T>(request?: MeasureRequest<T>): void;

  /**
   * Replace the editor state.
   *
   * @param newState - The new editor state.
   */
  setState(newState: EditorState): void;

  /** The current editor state. */
  get state(): EditorState;

  /**
   * Create an extension that provides a theme.
   *
   * @param spec - The theme specification.
   * @param options - Optional theme options.
   * @returns An extension.
   */
  static theme(spec: { [selector: string]: StyleSpec }, options?: { dark?: boolean }): Extension;

  /**
   * Apply transactions to the editor.
   *
   * @param transactions - The transactions to apply.
   */
  update(transactions: readonly Transaction[]): void;

  /** The currently visible viewport range. */
  get viewport(): { from: number; to: number };

  /** The ranges of the document that are currently visible. */
  get visibleRanges(): readonly { from: number; to: number }[];
}
