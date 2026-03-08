export {};

declare module 'obsidian' {
    /**
     * BasesOptions and the associated sub-types are configuration-driven settings controls
     * which can be provided by a {@link BasesViewRegistration} to expose configuration options
     * to users in the view config menu of the Bases toolbar.
     *
     * @public
     * @since 1.10.0
     *
     * @deprecated - Added only for typing purposes. Use {@link BasesAllOptions} instead.
     */
    type BasesAllOptions__ = BasesOptions | BasesOptionGroup<BasesOptions>;
}
