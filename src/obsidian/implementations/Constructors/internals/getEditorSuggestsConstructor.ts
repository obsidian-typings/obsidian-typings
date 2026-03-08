import type { App } from 'obsidian';
import type { EditorSuggestsConstructor } from '../../../internals/Constructors/internals/EditorSuggestsConstructor.ts';

/**
 * Get the EditorSuggests constructor.
 *
 * @param app - The app instance.
 * @returns The EditorSuggests constructor.
 *
 * @public
 * @unofficial
 */
export function getEditorSuggestsConstructor(app: App): EditorSuggestsConstructor {
    return app.workspace.editorSuggest.constructor as EditorSuggestsConstructor;
}
