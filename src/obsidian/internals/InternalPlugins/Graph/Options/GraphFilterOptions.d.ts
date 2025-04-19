import type {
    SearchComponent,
    Setting
} from 'obsidian';
import type { GraphOptions } from './GraphOptions.d.ts';

/** @public @unofficial */
export interface GraphFilterOptions extends GraphOptions {
    search: SearchComponent;
    searchSetting: Setting;
}
