import type {
    EditableFileView,
    TFile
} from 'obsidian';
import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/** @todo Documentation incomplete */
/** @public @unofficial */
export interface PdfView extends EditableFileView {
    viewer: unknown;

    /**
     * Get the current view type.
     */
    getViewType(): typeof ViewType.Pdf;
    /**
     * Is called when the vault has a 'modify' event. Reloads the file if the modified file is the file in this view.
     * @param file - The modified file.
     */
    onModify(file: TFile): void;
    /**
     * Shows the search.
     */
    showSearch(): void;
}
