import type { View } from 'obsidian';
import { ViewType } from "../../../implementations/ViewType.js";

/** @public */
export interface SyncView extends View {
    getViewType(): typeof ViewType.Sync;
}
