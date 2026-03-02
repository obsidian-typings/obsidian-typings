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

    /** Apply a template to content, substituting title placeholders. */
    applyTemplate(content: string, fromTitle: string, newTitle: string): Promise<string>;

    /** Extract the content under a heading into a new note. */
    extractHeading(file: TFile, editor: Editor): void;

    /** Get the text selection range under a heading at the given line. */
    getSelectionUnderHeading(file: TFile, editor: Editor, line: number): HeadingInfo | null;

    /** Add note composer items to the editor context menu. */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /** Handle external settings file changes and reload configuration. */
    onExternalSettingsChange(): Promise<void>;

    /** Add note composer items to a file context menu. */
    onFileMenu(menu: Menu, file: TFile, source: string): void;
}
