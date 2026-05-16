/**
 * Capacitor exception.
 *
 * @public
 * @unofficial
 */
export declare class CapacitorException extends Error {
  /** Exception code. */
  readonly code?: string;

  /** Exception data. */
  readonly data?: unknown;

  /** Exception message. */
  readonly message: string;

  /**
   * Creates a new CapacitorException.
   *
   * @param message - Exception message.
   * @param code - Exception code.
   * @param data - Exception data.
   */
  constructor(message: string, code?: string, data?: unknown);
}
