/**
 * A CSS style specification object where keys are CSS properties or nested selectors.
 *
 * @public
 * @unofficial
 */
export type StyleSpec = {
  [propOrSelector: string]: null | number | string | StyleSpec;
};
