import type {
    App,
    Editor,
    MarkdownFileInfo,
    MarkdownView,
    Menu,
    TFile
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { GetSelectionUnderHeadingResult } from './GetSelectionUnderHeadingResult.d.ts';
import type { NoteComposerPlugin } from './NoteComposerPlugin.d.ts';
import type { NoteComposerPluginOptions } from './NoteComposerPluginOptions.d.ts';

/** @public */
export interface NoteComposerPluginInstance extends InternalPluginInstance<NoteComposerPlugin> {
    app: App;
    defaultOn: true;
    onEnable: (app: App, plugin: NoteComposerPlugin) => Promise<void>;
    options: NoteComposerPluginOptions;
    pluginInstance: NoteComposerPlugin;

    applyTemplate(content: string, fromTitle: string, newTitle: string): Promise<string>;
    extractHeading(file: TFile, editor: Editor): void;
    getSelectionUnderHeading(file: TFile, editor: Editor, line: number): GetSelectionUnderHeadingResult | null;
    onEditorMenu(menu: Menu, editor: Editor, info: MarkdownView | MarkdownFileInfo): void;
    onExternalSettingsChange(): Promise<void>;
    onFileMenu(menu: Menu, file: TFile, source: string): void;
}
