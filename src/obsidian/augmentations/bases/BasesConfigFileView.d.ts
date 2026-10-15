import type { BasesConfigFileViewGroupBy } from '../../internals/bases/BasesConfigFileViewGroupBy.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Configuration for a single view in a Bases config file.
   *
   * @since 1.10.0
   */
  interface BasesConfigFileView {
    /**
     * Additional filters, applied only to this view.
     *
     * @official
     * @since 1.10.0
     */
    filters?: BasesConfigFileFilter;

    /**
     * Configuration for grouping the results of this view.
     *
     * @official
     * @since 1.10.0
     */
    groupBy?: BasesConfigFileViewGroupBy;

    /**
     * Ordered list of the groupBy values to show. When set, only these groups appear, in this order.
     * `null` is the group of entries with no value.
     *
     * @official
     * @since 1.14.3
     */
    groupOrder?: FrontmatterValue[];

    /**
     * Friendly name for this view, displayed in the UI to select between views.
     *
     * @official
     * @since 1.10.0
     */
    name: string;

    /**
     * An ordered list of the properties to display in this view.
     *
     * @official
     * @since 1.10.0
     */
    order?: string[];

    /**
     * Configuration of summaries to display for each property in this view.
     *
     * Key: Property name.
     * Value: Summary formula name.
     *
     * @official
     * @since 1.10.0
     */
    summaries?: Record<string, string>;

    /**
     * Unique identifier for the view type. Used to select the correct view renderer.
     *
     * @official
     * @since 1.10.0
     */
    type: string;
  }
}
