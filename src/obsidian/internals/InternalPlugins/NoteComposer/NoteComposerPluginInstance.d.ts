import type {
    App,
    Editor,
    MarkdownFileInfo,
    MarkdownView,
    Menu,
    TFile
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { HeadingInfo } from './HeadingInfo.d.ts';
import type { NoteComposerPlugin } from './NoteComposerPlugin.d.ts';
import type { NoteComposerPluginOptions } from './NoteComposerPluginOptions.d.ts';

/**
 * Plugin instance for note composer, providing note merging and splitting functionality.
 * @public
 * @unofficial
 */
export interface NoteComposerPluginInstance extends InternalPluginInstance<NoteComposerPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Called when the plugin is enabled. */
    onEnable: (app: App, plugin: NoteComposerPlugin) => Promise<void>;

    /** Configuration options for the note composer. */
    options: NoteComposerPluginOptions;

    /** Reference to the note composer plugin registration. */
    pluginInstance: NoteComposerPlugin;

    /**
     * Apply a template to content, substituting title placeholders.
     *
     * @param content - The template content.
     * @param fromTitle - The original note title.
     * @param newTitle - The new note title.
     * @returns The processed content with substitutions applied.
     */
    applyTemplate(content: string, fromTitle: string, newTitle: string): Promise<string>;

    /**
     * Extract the content under a heading into a new note.
     *
     * @param file - The source file.
     * @param editor - The active editor.
     */
    extractHeading(file: TFile, editor: Editor): void;

    /**
     * Get the text selection range under a heading at the given line.
     *
     * @param file - The source file.
     * @param editor - The active editor.
     * @param line - The line number of the heading.
     * @returns The heading info, or `null` if no heading found.
     */
    getSelectionUnderHeading(file: TFile, editor: Editor, line: number): HeadingInfo | null;

    /**
     * Add note composer items to the editor context menu.
     *
     * @param menu - The context menu to extend.
     * @param editor - The active editor.
     * @param info - The active markdown view or file info.
     */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /**
     * Handle external settings file changes and reload configuration.
     *
     * @returns A promise that resolves when the settings are reloaded.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * Add note composer items to a file context menu.
     *
     * @param menu - The context menu to extend.
     * @param file - The target file.
     * @param source - The source of the context menu event.
     */
    onFileMenu(menu: Menu, file: TFile, source: string): void;
}
