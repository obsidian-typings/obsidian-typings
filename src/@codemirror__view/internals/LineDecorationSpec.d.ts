import type { DecorationAttributes } from './DecorationAttributes.d.ts';

/**
 * Specification for a line decoration that styles an entire line.
 *
 * @public
 * @unofficial
 */
export interface LineDecorationSpec {
  /** HTML attributes to add to the line element. */
  attributes?: DecorationAttributes;

  /** CSS class to add to the line element. */
  class?: string;
}
