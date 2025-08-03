export {};

declare module '@codemirror/state' {
    /**
     * Changes to the editor state are grouped into transactions.
     * Typically, a user action creates a single transaction, which may
     * contain any number of document changes, may change the selection,
     * or have other effects. Create a transaction by calling
     * [`EditorState.update`](https://codemirror.net/6/docs/ref/#state.EditorState.update), or immediately
     * dispatch one by calling
     * [`EditorView.dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch).
     */
    interface Transaction {
        /**
         * Check whether the user deletes a content.
         * 
         * @official
         */
        isUserEvent(event: 'delete'): boolean;

        /**
         * Check whether the user deletes backward from the selection.
         * Included in `'delete'` event.
         * 
         * @official
         */
        isUserEvent(event: 'delete.backward'): boolean;

        /**
         * Check whether the user cuts a content to the clipboard.
         * Included in `'delete'` event.
         * 
         * @official
         */
        isUserEvent(event: 'delete.cut'): boolean;

        /**
         * Check whether the user dedents a line or lines, usually by typing `Shift + Tab` keys.
         * Included in `'delete'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'delete.dedent'): boolean;

        /**
         * Check whether the user deletes forward from the selection.
         * Included in `'delete'` event.
         * 
         * @official
         */
        isUserEvent(event: 'delete.forward'): boolean;

        /**
         * Check whether the user deletes a line or lines, usually by typing `Ctrl + Shift + K` keys.
         * Included in `'delete'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'delete.line'): boolean;

        /**
         * Check whether the user deletes selected content.
         * Included in `'delete'` event.
         * 
         * @official
         */
        isUserEvent(event: 'delete.selection'): boolean;

        /**
         * Check whether the user inputs a content.
         * 
         * @official
         */
        isUserEvent(event: 'input'): boolean;

        /**
         * Check whether the user inputs a content through Obsidian editor suggest autocompletion.
         * Currently, this event is only dispatched when autocompleting a wikilink or inserting Markdown link through command.
         * Included in `'input'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'input.autocomplete'): boolean;

        /**
         * Check whether the user inputs a content through CodeMirror native autocompletion.
         * Included in `'input'` event.
         * 
         * @official
         */
        isUserEvent(event: 'input.complete'): boolean;

        /**
         * Check whether the user creates a copy of the selected lines.
         * Usually dispatched when performing [`copyLineUp`](https://codemirror.net/docs/ref/#commands.copyLineUp) or [`copyLineDown`](https://codemirror.net/docs/ref/#commands.copyLineDown) commands.
         * Included in `'input'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'input.copyline'): boolean;

        /**
         * Check whether the user inputs a content through drop event.
         * Included in `'input'` event.
         * 
         * @official
         */
        isUserEvent(event: 'input.drop'): boolean;

        /**
         * Check whether the user indents a line or lines, usually by typing `Tab` key.
         * Included in `'input'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'input.indent'): boolean;

        /**
         * Check whether the user pastes a content into the editor.
         * Included in `'input'` event.
         * 
         * @official
         */
        isUserEvent(event: 'input.paste'): boolean;

        /**
         * Check whether the user input triggers auto-renumbering ordered list.
         * Included in `'input'` event.
         * 
         * @remark This event cannot be captured since Obsidian will filtered it out as soon as it was dispatched.
         * @official
         */
        isUserEvent(event: 'input.renumber'): boolean;

        /**
         * Check whether the user replaces search match(es).
         * Usually dispatched when performing [`replaceNext`](https://codemirror.net/docs/ref/#commands.replaceNext) or [`replaceAll`](https://codemirror.net/docs/ref/#commands.replaceAll) commands.
         * Included in `'input'` event.
         * 
         * @remark Obsidian native editor search does not dispatch this event.
         * @unofficial
         */
        isUserEvent(event: 'input.replace'): boolean;

        /**
         * Check whether the user replaces all search matches.
         * Usually dispatched when performing [`replaceAll`](https://codemirror.net/docs/ref/#commands.replaceAll) command.
         * Included in `'input'` and `'input.replace'` events.
         * 
         * @remark Obsidian native editor search does not dispatch this event.
         * @unofficial
         */
        isUserEvent(event: 'input.replace.matches'): boolean;

        /**
         * Check whether the user inputs a content through typed input.
         * Included in `'input'` event.
         * 
         * @official
         */
        isUserEvent(event: 'input.type'): boolean;

        /**
         * Check whether the user inputs a content through composition.
         * Included in `'input'` and `'input.type'` events.
         * 
         * @official
         */
        isUserEvent(event: 'input.type.compose'): boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        isUserEvent(event: 'input.type.compose.start'): boolean;

        /**
         * Check whether the user moves a content.
         * 
         * @official
         */
        isUserEvent(event: 'move'): boolean;

        /**
         * Check whether the user flips the characters before and after the cursor(s).
         * Usually dispatched when performing [`transposeChars`](https://codemirror.net/docs/ref/#commands.transposeChars) command.
         * Included in `'move'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'move.character'): boolean;

        /**
         * Check whether the user moves a content within the editor through drag-and-drop.
         * Included in `'move'` event.
         * 
         * @official
         */
        isUserEvent(event: 'move.drop'): boolean;

        /**
         * Check whether the user moves the selected line up or down.
         * Usually dispatched when performing [`moveLineUp`](https://codemirror.net/docs/ref/#commands.moveLineUp) or [`moveLineDown`](https://codemirror.net/docs/ref/#commands.moveLineDown) commands.
         * Included in `'move'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'move.line'): boolean;

        /**
         * Check whether the user redoes a content change.
         * 
         * @official
         */
        isUserEvent(event: 'redo'): boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        isUserEvent(event: 'scroll'): boolean;

        /**
         * Check whether the user explicitly changes the selection.
         * 
         * @official
         */
        isUserEvent(event: 'select'): boolean;

        /**
         * Check whether the user changes the selection with mouse or other pointing device.
         * Included in `'select'` event.
         * 
         * @official
         */
        isUserEvent(event: 'select.pointer'): boolean;

        /**
         * Check whether the user redoes a selection change.
         * Usually dispatched when performing [`redoSelection`](https://codemirror.net/docs/ref/#commands.redoSelection) command.
         * Included in `'select'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'select.redo'): boolean;

        /**
         * Check whether the user selects search match(es).
         * Usually dispatched when performing [`findNext`](https://codemirror.net/docs/ref/#search.findNext) and [`findPrevious`](https://codemirror.net/docs/ref/#search.findPrevious) commands.
         * Included in `'select'` and `'select.search'` events.
         * 
         * @remark Obsidian native editor search does not dispatch this event.
         * @unofficial
         */
        isUserEvent(event: 'select.search'): boolean;

        /**
         * Check whether the user selects all search matches.
         * Usually dispatched when performing [`selectMatches`](https://codemirror.net/docs/ref/#search.selectMatches) and [`selectSelectionMatches`](https://codemirror.net/docs/ref/#search.selectSelectionMatches) commands.
         * Included in `'select'` event.
         * 
         * @remark Obsidian native editor search does not dispatch this event.
         * @unofficial
         */
        isUserEvent(event: 'select.search.matches'): boolean;

        /**
         * Check whether the user undoes a selection change.
         * Usually dispatched when performing [`undoSelection`](https://codemirror.net/docs/ref/#commands.undoSelection) command.
         * Included in `'select'` event.
         * 
         * @unofficial
         */
        isUserEvent(event: 'select.undo'): boolean;

        /**
         * Check whether a content change is not made explicitly by the user. It happens in some circumstances, for instance:
         * - Change made externally, e.g. by other text editor programs.
         * - Change made by another editor view that holds the same note.
         * - Change made by the vault, file manager, and file system API.
         * 
         * @unofficial
         */
        isUserEvent(event: 'set'): boolean;

        /**
         * Check whether the user undoes a content change.
         * 
         * @official
         */
        isUserEvent(event: 'undo'): boolean;
    }
}