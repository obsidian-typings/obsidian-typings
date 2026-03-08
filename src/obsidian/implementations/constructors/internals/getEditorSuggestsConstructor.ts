import type { App } from 'obsidian';
import type { EditorSuggests } from '../../../internals/EditorSuggests.d.ts';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the EditorSuggests constructor.
 *
 * @param app - The app instance.
 * @returns The EditorSuggests constructor.
 *
 * @public
 * @unofficial
 */
export function getEditorSuggestsConstructor(app: App): ExtractConstructor<EditorSuggests> {
    return app.workspace.editorSuggest.constructor as ExtractConstructor<EditorSuggests>;
}
