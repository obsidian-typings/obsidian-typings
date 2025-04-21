export {};

declare module 'obsidian' {
    /**
     * The name of a command you can execute with {@link Editor.exec}
     *
     * @deprecated - Added only for typing purposes. Use {@link EditorCommandName} instead.
     */
    type EditorCommandName__ =
        | 'goUp'
        | 'goDown'
        | 'goLeft'
        | 'goRight'
        | 'goStart'
        | 'goEnd'
        | 'goWordLeft'
        | 'goWordRight'
        | 'indentMore'
        | 'indentLess'
        | 'newlineAndIndent'
        | 'swapLineUp'
        | 'swapLineDown'
        | 'deleteLine'
        | 'toggleFold'
        | 'foldAll'
        | 'unfoldAll';
}
