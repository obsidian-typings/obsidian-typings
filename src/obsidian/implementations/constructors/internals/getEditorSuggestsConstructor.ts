import type { App } from 'obsidian';
import type { EditorSuggests } from '../../../internals/EditorSuggests.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type EditorSuggestsConstructor = ExtractConstructor<EditorSuggests>;

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
