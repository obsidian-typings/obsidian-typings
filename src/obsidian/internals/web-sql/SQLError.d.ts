/**
 * Represents an error returned from a WebSQL database operation.
 * @public
 * @unofficial
 */
export interface SQLError {
    /** Numeric error code identifying the type of error. */
    code: number;

    /** Human-readable error message. */
    message: string;
}
