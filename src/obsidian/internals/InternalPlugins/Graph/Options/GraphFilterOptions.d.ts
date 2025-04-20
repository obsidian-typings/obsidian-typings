import type {
    SearchComponent,
    Setting
} from 'obsidian';
import type { GraphOptions } from './GraphOptions.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphFilterOptions extends GraphOptions {
    /**
     * @todo Documentation incomplete.
     */
    search: SearchComponent;

    /**
     * @todo Documentation incomplete.
     */
    searchSetting: Setting;
}
