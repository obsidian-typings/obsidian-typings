import type {
    SearchComponent,
    Setting
} from 'obsidian';
import type { GraphOptions } from './GraphOptions.js';

/** @public */
export interface GraphFilterOptions extends GraphOptions {
    search: SearchComponent;
    searchSetting: Setting;
}
