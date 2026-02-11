export {};

declare module 'obsidian' {
    /**
     * Bases options.
     *
     * @since 1.10.0
     *
     * @deprecated - Added only for typing purposes. Use {@link BasesOptions} instead.
     */
    type BasesOptions__ =
        | BasesDropdownOption
        | BasesFileOption
        | BasesFolderOption
        | BasesFormulaOption
        | BasesMultitextOption
        | BasesPropertyOption
        | BasesSliderOption
        | BasesTextOption
        | BasesToggleOption;
}
