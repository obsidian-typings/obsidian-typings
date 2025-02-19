import type {
    MarkdownEditView,
    MarkdownPreviewView
} from 'obsidian';

/** @public */
export interface MarkdownViewModes {
    preview: MarkdownPreviewView;
    source: MarkdownEditView;
}
