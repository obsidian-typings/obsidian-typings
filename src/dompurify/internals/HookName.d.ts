/**
 * Names of hooks available in DOMPurify's sanitization lifecycle.
 *
 * @public
 * @unofficial
 */
export type HookName =
  | 'afterSanitizeAttributes'
  | 'afterSanitizeElements'
  | 'afterSanitizeShadowDOM'
  | 'beforeSanitizeAttributes'
  | 'beforeSanitizeElements'
  | 'beforeSanitizeShadowDOM'
  | 'uponSanitizeAttribute'
  | 'uponSanitizeElement'
  | 'uponSanitizeShadowNode';
