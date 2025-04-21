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
 * @public
 * @unofficial
 */
export interface NoteComposerPluginInstance extends InternalPluginInstance<NoteComposerPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    onEnable: (app: App, plugin: NoteComposerPlugin) => Promise<void>;

    /** @todo Documentation incomplete. */
    options: NoteComposerPluginOptions;

    /** @todo Documentation incomplete. */
    pluginInstance: NoteComposerPlugin;

    /** @todo Documentation incomplete. */
    applyTemplate(content: string, fromTitle: string, newTitle: string): Promise<string>;

    /** @todo Documentation incomplete. */
    extractHeading(file: TFile, editor: Editor): void;

    /** @todo Documentation incomplete. */
    getSelectionUnderHeading(file: TFile, editor: Editor, line: number): HeadingInfo | null;

    /** @todo Documentation incomplete. */
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;

    /** @todo Documentation incomplete. */
    onExternalSettingsChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    onFileMenu(menu: Menu, file: TFile, source: string): void;
}
