import type { Cm5Editor } from '../Cm5Editor.d.ts';
import type { Cm5EditorConfiguration } from '../Cm5EditorConfiguration.d.ts';

/**
 * Creates a CodeMirror 5 editor from a textarea element.
 *
 * @param host - The textarea element to replace.
 * @param options - Optional editor configuration.
 * @returns The created editor instance.
 * @public
 * @unofficial
 */
export declare function fromTextArea(host: HTMLTextAreaElement, options?: Cm5EditorConfiguration): Cm5Editor;
