/**
 * Represents an HTTP referrer and its policy.
 *
 * @public
 * @unofficial
 */
export interface ElectronReferrer {
  /**
   * The referrer policy. See the Referrer-Policy spec for more details on the meaning of these values.
   */
  policy: 'default' | 'no-referrer-when-downgrade' | 'no-referrer' | 'origin' | 'same-origin' | 'strict-origin-when-cross-origin' | 'strict-origin' | 'unsafe-url';

  /** HTTP Referrer URL. */
  url: string;
}
