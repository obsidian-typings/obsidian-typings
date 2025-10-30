export {};

declare module 'obsidian' {
    /**
     * ViewOption and the associated sub-types are configuration-driven settings controls
     * which can be provided by a {@link BasesViewRegistration} to expose configuration options
     * to users in the view config menu of the Bases toolbar.
     *
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link ViewOption} instead.
     */
    type ViewOption__ =
        | DropdownOption
        | FileOption
        | FolderOption
        | FormulaOption
        | GroupOption
        | MultitextOption
        | PropertyOption
        | SliderOption
        | TextOption
        | ToggleOption;
}
