/**
 * A mode specification for CodeMirror 5 with a required name and additional options.
 *
 * @public
 * @unofficial
 */
export type Cm5ModeSpec<T> = { [P in keyof T]: T[P] } & { name: string };
