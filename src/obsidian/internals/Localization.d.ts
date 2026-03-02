/**
 * Nested dictionary of localization strings for internationalization.
 * @public
 * @unofficial
 */
export interface Localization {
    /** Localized string value, or nested localization group. */
    [key: string]: string | Localization;
}
