import type { Range } from '@codemirror/state';
import type { DecorationSet } from '@codemirror/view';

import type { LineDecorationSpec } from '../internals/LineDecorationSpec.d.ts';
import type { MarkDecorationSpec } from '../internals/MarkDecorationSpec.d.ts';
import type { ReplaceDecorationSpec } from '../internals/ReplaceDecorationSpec.d.ts';
import type { WidgetDecorationSpec } from '../internals/WidgetDecorationSpec.d.ts';

export {};

declare module '@codemirror/view' {
  interface Decoration {
    /**
     * The config object used to create this decoration.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link spec} instead.
     */
    readonly spec__?: unknown;
  }

  namespace Decoration {
    /**
     * Create a mark decoration, which influences the styling of the content in its range.
     *
     * @param spec - The mark decoration spec.
     * @returns The decoration.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.mark} instead.
     */
    function mark__(spec: MarkDecorationSpec): Decoration;

    /**
     * Create a widget decoration, which displays a DOM element at the given position.
     *
     * @param spec - The widget decoration spec.
     * @returns The decoration.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.widget} instead.
     */
    function widget__(spec: WidgetDecorationSpec): Decoration;

    /**
     * Create a replace decoration which replaces the given range with a widget, or simply
     * hides it.
     *
     * @param spec - The replace decoration spec.
     * @returns The decoration.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.replace} instead.
     */
    function replace__(spec: ReplaceDecorationSpec): Decoration;

    /**
     * Create a line decoration, which can add DOM attributes to the line starting at the
     * given position.
     *
     * @param spec - The line decoration spec.
     * @returns The decoration.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.line} instead.
     */
    function line__(spec: LineDecorationSpec): Decoration;

    /**
     * Build a DecorationSet from the given decorated range or ranges.
     *
     * @param of - The range or ranges.
     * @param sort - Whether to sort the ranges.
     * @returns The decoration set.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.set} instead.
     */
    function set__(of: Range<Decoration> | readonly Range<Decoration>[], sort?: boolean): DecorationSet;

    /**
     * The empty set of decorations.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Decoration.none} instead.
     */
    const none__: DecorationSet;
  }
}
