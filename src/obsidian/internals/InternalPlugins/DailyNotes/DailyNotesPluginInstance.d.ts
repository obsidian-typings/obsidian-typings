import type moment from 'moment';
import type {
    App,
    TFile
} from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { DailyNotesOptions } from './DailyNotesOptions.d.ts';
import type { DailyNotesPlugin } from './DailyNotesPlugin.d.ts';

/** @public */
export interface DailyNotesPluginInstance extends InternalPluginInstance<DailyNotesPlugin> {
    app: App;
    defaultOn: true;
    options: DailyNotesOptions;
    plugin: DailyNotesPlugin;

    getCurrentFileDateTimestamp(): null | number;
    getDailyNote(date: typeof moment): Promise<TFile | null | undefined>;
    getFormat(): string;
    gotoNextExisting(timestamp: number): Promise<void>;
    gotoPreviousExisting(timestamp: number): Promise<void>;
    iterateDailyNotes(callback: (file: TFile, timestamp: number) => void): void;
    onExternalSettingsChange(): Promise<void>;
    onOpenDailyNote(evt: Event): Promise<void>;
}
