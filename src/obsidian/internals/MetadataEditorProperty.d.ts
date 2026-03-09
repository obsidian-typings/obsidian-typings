import type {
  App,
  Component
} from 'obsidian';
import type { FocusMode } from './FocusMode.d.ts';
import type { TypeInfo } from './metadata-type-manager/TypeInfo.d.ts';
import type { MetadataEditor } from './MetadataEditor.d.ts';
import type { MetadataWidget } from './MetadataWidget.d.ts';
import type { PropertyEntryData } from './PropertyEntryData.d.ts';

/**
 * Component representing a single property field in the metadata editor.
 * @public
 * @unofficial
 */
export interface MetadataEditorProperty extends Component {
  /**
   * Reference to the app.
   */
  app: App;

  /**
   * Container element for the metadata editor property.
   */
  containerEl: HTMLElement;

  /**
   * Entry information for the property.
   */
  entry: PropertyEntryData<unknown>;

  /**
   * Icon element of the property.
   */
  iconEl: HTMLSpanElement;

  /**
   * Key value of the property.
   */
  keyEl: HTMLElement;

  /**
   * Input field for key value of the property.
   */
  keyInputEl: HTMLInputElement;

  /**
   * Metadata editor the property is attached to.
   */
  metadataEditor: MetadataEditor;

  /**
   * Widget that handles user input for this property widget type.
   */
  rendered: MetadataWidget | null;

  /**
   * Info about the inferred and expected property widget given key-value pair.
   */
  typeInfo: TypeInfo;

  /**
   * Element that contains the value input or widget.
   */
  valueEl: HTMLElement;

  /**
   * Element containing the displayed warning on malformed property field.
   */
  warningEl: HTMLElement;

  /**
   * Focus on the key input element.
   */
  focusKey(): void;

  /**
   * Focus on the property (container element).
   */
  focusProperty(): void;

  /**
   * Focus on the value input element.
   *
   * @param mode - Focus mode.
   */
  focusValue(mode?: FocusMode): void;

  /**
   * Reveal the property menu on click event.
   *
   * @param event - The mouse event.
   */
  handleItemClick(event: MouseEvent): void;

  /**
   * Focus on property on blur event.
   */
  handlePropertyBlur(): void;

  /**
   * Update key of property and saves, returns `false` if error.
   *
   * @param key - New key value.
   * @returns Whether the update succeeded.
   */
  handleUpdateKey(key: string): boolean;

  /**
   * Update value of property and saves.
   *
   * @param value - New value.
   */
  handleUpdateValue(value: unknown): void;

  /**
   * Loads as draggable property element.
   */
  onload(): void;

  /**
   * Render property widget based on type.
   *
   * @param entry - Property entry data.
   * @param checkErrors - Whether to check for errors.
   * @param useExpectedType - Whether to use the expected type.
   */
  renderProperty(entry: PropertyEntryData<unknown>, checkErrors?: boolean, useExpectedType?: boolean): void;

  /**
   * Set the selected class of property.
   *
   * @param selected - Whether to select or deselect.
   */
  setSelected(selected: boolean): void;

  /**
   * Reveal property selection menu at mouse event.
   *
   * @param event - The mouse event.
   */
  showPropertyMenu(event: MouseEvent): void;
}
