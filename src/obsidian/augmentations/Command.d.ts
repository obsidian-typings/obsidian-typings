export {};

declare module 'obsidian' {
    /**
     * A command that can be executed from the command palette or toolbar buttons.
     */
    interface Command {
        /**
         * Whether the editor command can be executed when the note is in preview mode.
         *
         * @remarks `Editor command` is the command with defined {@link editorCallback}/{@link editorCheckCallback}.
         * @unofficial
         */
        allowPreview?: boolean;

        /**
         * Whether the editor command can be executed when the properties panel is shown.
         *
         * @remarks `Editor command` is the command with defined {@link editorCallback}/{@link editorCheckCallback}.
         * @unofficial
         */
        allowProperties?: boolean;

        /**
         * Simple callback, triggered globally.
         *
         * @example
         * ```ts
         * this.addCommand({
         *   id: 'print-greeting-to-console',
         *   name: 'Print greeting to console',
         *   callback: () => {
         *     console.log('Hey, you!');
         *   },
         * });
         * ```
         * @official
         */
        callback?: () => any;

        /**
         * Complex callback, overrides the simple callback.
         * Used to 'check' whether your command can be performed in the current circumstances.
         * For example, if your command requires the active focused pane to be a MarkdownView, then
         * you should only return `true` if the condition is satisfied. Returning `false` or `undefined` causes
         * the command to be hidden from the command palette.
         *
         * @param checking - Whether the command palette is just 'checking' if your command should show right now.
         * If checking is `true`, then this function should not perform any action.
         * If checking is `false`, then this function should perform the action.
         * @returns Whether this command can be executed at the moment.
         * @example
         * ```ts
         * this.addCommand({
         *   id: 'example-command',
         *   name: 'Example command',
         *   checkCallback: (checking: boolean) => {
         *     const value = getRequiredValue();
         *
         *     if (value) {
         *       if (!checking) {
         *         doCommand(value);
         *       }
         *       return true;
         *     }
         *
         *     return false;
         *   }
         * });
         * ```
         * @official
         */
        checkCallback?: (checking: boolean) => boolean | void;

        /**
         * A command callback that is only triggered when the user is in an editor.
         * Overrides `callback` and `checkCallback`
         *
         * @example
         * ```ts
         * this.addCommand({
         *   id: 'example-command',
         *   name: 'Example command',
         *   editorCallback: (editor: Editor, view: MarkdownView) => {
         *     const sel = editor.getSelection();
         *
         *     console.log(`You have selected: ${sel}`);
         *   }
         * });
         * ```
         * @official
         * @since 0.12.2
         */
        editorCallback?: (editor: Editor, ctx: MarkdownView | MarkdownFileInfo) => any;

        /**
         * A command callback that is only triggered when the user is in an editor.
         * Overrides `editorCallback`, `callback` and `checkCallback`
         *
         * @example
         * ```ts
         * this.addCommand({
         *   id: 'example-command',
         *   name: 'Example command',
         *   editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
         *     const value = getRequiredValue();
         *
         *     if (value) {
         *       if (!checking) {
         *         doCommand(value);
         *       }
         *
         *       return true;
         *     }
         *
         *     return false;
         *   }
         * });
         * ```
         * @official
         * @since 0.12.2
         */
        editorCheckCallback?: (
            checking: boolean,
            editor: Editor,
            ctx: MarkdownView | MarkdownFileInfo
        ) => boolean | void;

        /**
         * Sets the default hotkey. It is recommended for plugins to avoid setting default hotkeys if possible,.
         * to avoid conflicting hotkeys with one that's set by the user, even though customized hotkeys have higher priority.
         *
         * @example
         * ```ts
         * this.addCommand({
         *   id: 'example-command',
         *   name: 'Example command',
         *   // WARNING: as per comment above, it's not recommended to set default hotkeys
         *   // this example is just for syntax demonstration purposes, not the recommended way to do it
         *   hotkeys: [{
         *     modifiers: ['Mod', 'Shift'],
         *     key: 'l',
         *   }],
         * });
         * ```
         * @official
         */
        hotkeys?: Hotkey[];

        /**
         * Icon ID to be used in the toolbar.
         *
         * See {@link https://docs.obsidian.md/Plugins/User+interface/Icons} for available icons and how to add your own.
         *
         * @example
         * ```ts
         * const command: Command = {
         *   id: 'example-command',
         *   name: 'Example command',
         *   icon: 'dice',
         * };
         * ```
         * @official
         */
        icon?: IconName;

        /**
         * Globally unique ID to identify this command.
         *
         * @official
         */
        id: string;

        /**
         * Whether the command is only available on mobile.
         *
         * @official
         */
        mobileOnly?: boolean;

        /**
         * Human friendly name for searching.
         *
         * @official
         */
        name: string;

        /**
         * Whether holding the hotkey should repeatedly trigger this command.
         *
         * @defaultValue false.
         * @official
         */
        repeatable?: boolean;

        /**
         * Whether the non-editor command button can be shown on the mobile toolbar.
         *
         * @remarks `Non-editor command` is the command without {@link editorCallback}/{@link editorCheckCallback}.
         * @unofficial
         */
        showOnMobileToolbar?: boolean;
    }
}
