import type {
    MarkdownEditView,
    MarkdownPreviewView
} from 'obsidian';

/** @public @unofficial */
export interface MarkdownViewModes {
    preview: MarkdownPreviewView;
    source: MarkdownEditView;
}
