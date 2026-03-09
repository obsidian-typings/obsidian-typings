/**
 * Represents the user's Obsidian account information and license details.
 * @public
 * @unofficial
 */
export interface Account {
  /**
   * The company associated with the activated commercial license.
   */
  company: string;

  /**
   * The email address associated with the account.
   */
  email: string;

  /** Unix timestamp of the license expiry date. */
  expiry: number;

  /** License key string. */
  key: string | undefined;

  /** Validation status or hash for the license key. */
  keyValidation: string;

  /**
   * The license available to the account.
   */
  license: '' | 'insider';

  /**
   * Profile name.
   */
  name: string;

  /** Number of seats available on the commercial license. */
  seats: number;

  /** Authentication token for the account. */
  token: string;
}
