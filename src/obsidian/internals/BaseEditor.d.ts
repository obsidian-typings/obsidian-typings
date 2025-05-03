import type { EditorView } from '@codemirror/view';
import type { EditorPosition } from 'obsidian';

/**
 * @remark `BaseEditor` is never used in the Obsidian codebase, but is exposed in the Obsidian module as `Editor`.
 *       However, most editor components actually make use of the extended `Editor`, so this interface is purposely.
 *       named to `BaseEditor` to not require any casting for most purposes (or overriding the `editor` property type.
 *       for all components).
 * @todo Potential risk of confusion when `Editor` is constructed from the Obsidian module, as it only has the.
 *       methods from `BaseEditor`, *not* `Editor`.
 */
/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface BaseEditor {
    /**
     * CodeMirror editor instance.
     */
    cm: EditorView;

    /**
     * HTML instance the CM editor is attached to.
     */
    containerEl: HTMLElement;

    /**
     * Clean-up function executed after indenting lists.
     */
    afterIndent(): void;

    /**
     * Expand text.
     */
    expandText(): void;

    /**
     * Indents a list by one level.
     */
    indentList(): void;

    /**
     * Insert a template callout at the current cursor position.
     */
    insertCallout(): void;

    /**
     * Insert a template code block at the current cursor position.
     */
    insertCodeblock(): void;

    /**
     * Insert a markdown link at the current cursor position.
     */
    insertLink(): void;

    /**
     * Insert a mathjax equation block at the current cursor position.
     */
    insertMathJax(): void;

    /**
     * Insert specified text at the current cursor position.
     *
     * @remark Might be broken, inserts at the end of the document.
     */
    insertText(text: string): void;

    /**
     * Inserts a new line and continues a markdown bullet point list at the same level.
     */
    newlineAndIndentContinueMarkdownList(): void;

    /**
     * Inserts a new line at the same indent level.
     */
    newlineAndIndentOnly(): void;

    /**
     * Get the character position at a mouse event.
     */
    posAtMouse(e: MouseEvent): EditorPosition;

    /**
     * Toggles blockquote syntax on paragraph under cursor.
     */
    toggleBlockquote(): void;

    /**
     * Toggle bullet point list syntax on paragraph under cursor.
     */
    toggleBulletList(): void;

    /**
     * Toggle checkbox syntax on paragraph under cursor.
     */
    toggleCheckList(): void;

    /**
     * Toggle numbered list syntax on paragraph under cursor.
     */
    toggleNumberList(): void;

    /**
     * Convert word under cursor into a wikilink.
     *
     * @param embed - Whether to embed the link or not.
     */
    triggerWikiLink(embed: boolean): void;

    /**
     * Unindents a list by one level.
     */
    unindentList(): void;
}
