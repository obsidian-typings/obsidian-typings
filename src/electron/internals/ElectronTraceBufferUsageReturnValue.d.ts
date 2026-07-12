/**
 * The maximum usage across processes of the trace buffer.
 *
 * @public
 * @unofficial
 */
export interface ElectronTraceBufferUsageReturnValue {
  /** The percentage of the trace buffer maximum usage. */
  percentage: number;

  /** The value of the trace buffer maximum usage. */
  value: number;
}
