/**
 * An i18next plugin module.
 *
 * @public
 * @unofficial
 */
export interface Module {
  /** The type of the module. */
  type: '3rdParty' | 'backend' | 'formatter' | 'i18nFormat' | 'languageDetector' | 'logger' | 'postProcessor';
}
