/**
 * Options for focusing a specific property or heading in the metadata editor.
 * @public
 * @unofficial
 */
export interface FocusMetadataOptions {
  /** Whether to focus the metadata heading element. */
  focusHeading: boolean;

  /** Index of the property to focus on. */
  propertyIdx?: number;

  /** Key of the property to focus on. */
  propertyKey?: string;
}
