/**
 * Trace configuration controlling which categories are traced and how the recording behaves.
 *
 * @public
 * @unofficial
 */
export interface ElectronTraceConfig {
  /**
   * If `true`, filter event data according to a specific list of events that have been manually vetted to not include
   * any PII. See the implementation in Chromium for specifics.
   */
  enable_argument_filter?: boolean;

  /**
   * A list of tracing categories to exclude. Can include glob-like patterns using `*` at the end of the category name.
   * See tracing categories for the list of categories.
   */
  excluded_categories?: string[];

  /** A list of histogram names to report with the trace. */
  histogram_names?: string[];

  /**
   * A list of tracing categories to include. Can include glob-like patterns using `*` at the end of the category name.
   * See tracing categories for the list of categories.
   */
  included_categories?: string[];

  /** A list of process IDs to include in the trace. If not specified, trace all processes. */
  included_process_ids?: number[];

  /**
   * If the `disabled-by-default-memory-infra` category is enabled, this contains optional additional configuration for
   * data collection. See the Chromium memory-infra docs for more information.
   */
  memory_dump_config?: Record<string, unknown>;

  /**
   * Can be `record-as-much-as-possible`, `record-continuously`, `record-until-full` or `trace-to-console`.
   *
   * @default `record-until-full`
   */
  recording_mode?: 'record-as-much-as-possible' | 'record-continuously' | 'record-until-full' | 'trace-to-console';

  /** Maximum size of the trace recording buffer in events. */
  trace_buffer_size_in_events?: number;

  /** Maximum size of the trace recording buffer in kilobytes. Defaults to 100MB. */
  trace_buffer_size_in_kb?: number;
}
