import type { default as moment } from 'moment';
import type {
    App,
    TFile
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { DailyNotesOptions } from './DailyNotesOptions.d.ts';
import type { DailyNotesPlugin } from './DailyNotesPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface DailyNotesPluginInstance extends InternalPluginInstance<DailyNotesPlugin> {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    defaultOn: true;

    /** @todo Documentation incomplete. */
    options: DailyNotesOptions;

    /** @todo Documentation incomplete. */
    plugin: DailyNotesPlugin;

    /** @todo Documentation incomplete. */
    getCurrentFileDateTimestamp(): null | number;

    /** @todo Documentation incomplete. */
    getDailyNote(date: typeof moment): Promise<TFile | null | undefined>;

    /** @todo Documentation incomplete. */
    getFormat(): string;

    /** @todo Documentation incomplete. */
    gotoNextExisting(timestamp: number): Promise<void>;

    /** @todo Documentation incomplete. */
    gotoPreviousExisting(timestamp: number): Promise<void>;

    /** @todo Documentation incomplete. */
    iterateDailyNotes(callback: (file: TFile, timestamp: number) => void): void;

    /** @todo Documentation incomplete. */
    onExternalSettingsChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    onOpenDailyNote(evt: Event): Promise<void>;
}
