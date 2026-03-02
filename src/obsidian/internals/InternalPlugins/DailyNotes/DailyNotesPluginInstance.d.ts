import type { moment } from 'obsidian';
import type {
    App,
    TFile
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { DailyNotesOptions } from './DailyNotesOptions.d.ts';
import type { DailyNotesPlugin } from './DailyNotesPlugin.d.ts';

/**
 * Plugin instance for daily notes, providing date-based note creation and navigation.
 * @public
 * @unofficial
 */
export interface DailyNotesPluginInstance extends InternalPluginInstance<DailyNotesPlugin> {
    /** Reference to the app. */
    app: App;

    /** Whether this plugin is enabled by default. */
    defaultOn: true;

    /** Configuration options for daily notes. */
    options: DailyNotesOptions;

    /** Reference to the daily notes plugin registration. */
    plugin: DailyNotesPlugin;

    /** Get the date timestamp from the currently open file name, or null if not a daily note. */
    getCurrentFileDateTimestamp(): null | number;

    /** Get or create the daily note for the given date. */
    getDailyNote(date: typeof moment): Promise<TFile | null | undefined>;

    /** Get the configured date format string for daily note filenames. */
    getFormat(): string;

    /** Navigate to the next existing daily note after the given timestamp. */
    gotoNextExisting(timestamp: number): Promise<void>;

    /** Navigate to the previous existing daily note before the given timestamp. */
    gotoPreviousExisting(timestamp: number): Promise<void>;

    /** Iterate over all daily notes in the vault, invoking the callback for each. */
    iterateDailyNotes(callback: (file: TFile, timestamp: number) => void): void;

    /** Handle external settings file changes and reload configuration. */
    onExternalSettingsChange(): Promise<void>;

    /** Handle the open daily note command event. */
    onOpenDailyNote(evt: Event): Promise<void>;
}
