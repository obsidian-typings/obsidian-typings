import type { View } from 'obsidian';
import { ViewType } from "../../../implementations/Constants/ViewType.js";

/** @public */
export interface SyncView extends View {
    getViewType(): typeof ViewType.Sync;
}
