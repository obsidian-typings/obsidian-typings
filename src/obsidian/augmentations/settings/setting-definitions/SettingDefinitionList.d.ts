export {};

declare module 'obsidian' {
  /**
   * A specialized {@link SettingDefinitionGroup} for collections of mutable
   * data: entries the user adds, reorders, or removes. Rendered with a more
   * compact visual style than a group, and supports `emptyState`, `onReorder`,
   * and `onDelete` for the mutation affordances.
   *
   * @since 1.13.0
   */
  interface SettingDefinitionList<K extends string = string> extends SettingDefinitionGroup<K> {
    /**
     * Add-entry affordance. The framework renders a platform-appropriate
     * control: on desktop, a `+` button in the list header (with `name` as
     * the tooltip); on mobile, a tappable `+ {name}` row appended below
     * the list.
     *
     * The mobile row is not part of the indexed `items`: it does not appear
     * in search, does not receive delete or reorder affordances, and is not
     * counted by `onDelete`/`onReorder` indices.
     *
     * @official
     * @since 1.13.0
     */
    addItem?: SettingDefinitionAddItem;

    /**
     * Text to display when `items` is empty.
     *
     * @official
     * @since 1.13.0
     */
    emptyState?: DocumentFragment | string;

    /**
     * Discriminant narrowing the parent's `'group' | 'list'` to `'list'`.
     *
     * @official
     * @since 1.13.0
     */
    type: 'list';

    /**
     * When set, adds a delete button to each item and enables Delete/Backspace
     * keyboard shortcut. Called with the item index.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link onDelete} instead.
     */
    onDelete__?(index: number): void;

    /**
     * When set, adds a drag handle to each item and enables drag-to-reorder.
     * Called with old and new indices.
     *
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes. Use {@link onReorder} instead.
     */
    onReorder__?(oldIndex: number, newIndex: number): void;
  }
}
