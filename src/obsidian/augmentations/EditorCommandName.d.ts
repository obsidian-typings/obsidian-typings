export {};

declare module 'obsidian' {
  /**
   * The name of a command you can execute with {@link Editor.exec}
   *
   * @deprecated - Added only for typing purposes. Use {@link EditorCommandName} instead.
   */
  type EditorCommandName__ =
    | 'deleteLine'
    | 'foldAll'
    | 'goDown'
    | 'goEnd'
    | 'goLeft'
    | 'goRight'
    | 'goStart'
    | 'goUp'
    | 'goWordLeft'
    | 'goWordRight'
    | 'indentLess'
    | 'indentMore'
    | 'newlineAndIndent'
    | 'swapLineDown'
    | 'swapLineUp'
    | 'toggleFold'
    | 'unfoldAll';
}
