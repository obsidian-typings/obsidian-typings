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

    /**
     * Get the date timestamp from the currently open file name, or null if not a daily note.
     *
     * @returns The date timestamp, or null.
     */
    getCurrentFileDateTimestamp(): null | number;

    /**
     * Get or create the daily note for the given date.
     *
     * @param date - The moment date to get the daily note for.
     * @returns The daily note file, or null/undefined.
     */
    getDailyNote(date: typeof moment): Promise<TFile | null | undefined>;

    /**
     * Get the configured date format string for daily note filenames.
     *
     * @returns The date format string.
     */
    getFormat(): string;

    /**
     * Navigate to the next existing daily note after the given timestamp.
     *
     * @param timestamp - The reference timestamp.
     * @returns A promise that resolves when navigation is complete.
     */
    gotoNextExisting(timestamp: number): Promise<void>;

    /**
     * Navigate to the previous existing daily note before the given timestamp.
     *
     * @param timestamp - The reference timestamp.
     * @returns A promise that resolves when navigation is complete.
     */
    gotoPreviousExisting(timestamp: number): Promise<void>;

    /**
     * Iterate over all daily notes in the vault, invoking the callback for each.
     *
     * @param callback - The callback to invoke for each daily note.
     */
    iterateDailyNotes(callback: (file: TFile, timestamp: number) => void): void;

    /**
     * Handle external settings file changes and reload configuration.
     *
     * @returns A promise that resolves when the settings are reloaded.
     */
    onExternalSettingsChange(): Promise<void>;

    /**
     * Handle the open daily note command event.
     *
     * @param evt - The triggering event.
     * @returns A promise that resolves when the daily note is opened.
     */
    onOpenDailyNote(evt: Event): Promise<void>;
}
