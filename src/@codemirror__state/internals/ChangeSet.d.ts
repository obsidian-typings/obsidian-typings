import type { ChangeDesc } from './ChangeDesc.d.ts';
import type { CmText } from './CmText.d.ts';

/**
 * A change set represents a group of modifications to a document.
 *
 * @public
 * @unofficial
 */
export declare class ChangeSet extends ChangeDesc {
  /**
   * Apply the changes to a document, returning the modified document.
   *
   * @param doc - The document to apply the changes to.
   * @returns The modified document.
   */
  apply(doc: CmText): CmText;

  /**
   * Combine two subsequent change sets into a single set.
   *
   * @param other - The other change set.
   * @returns The composed change set.
   */
  compose(other: ChangeSet): ChangeSet;

  /**
   * Compute the combined effect of applying another set of changes after this one.
   *
   * @param doc - The document before this change set.
   * @returns The inverted change set.
   */
  invert(doc: CmText): ChangeSet;

  /**
   * Map this change set through a change description.
   *
   * @param other - The change description to map through.
   * @param before - Whether the changes in `other` come before or after this set.
   * @returns The mapped change set.
   */
  map(other: ChangeDesc, before?: boolean): ChangeSet;

  /**
   * Map a change description through this change set.
   *
   * @param other - The change description to map.
   * @param before - Whether the other changes came before or after this set.
   * @returns The mapped change description.
   */
  mapDesc(other: ChangeDesc, before?: boolean): ChangeDesc;
}
