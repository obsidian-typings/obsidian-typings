export {};

declare module 'obsidian' {
    /**
     * Implement this factory function in a {@link BasesViewRegistration} to create a
     * new instance of a custom Bases view.
     * @param containerEl - The container below the Bases toolbar where the view will be displayed.
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link BasesViewFactory} instead.
     */

    type BasesViewFactory__ = (controller: QueryController, containerEl: HTMLElement) => BasesView;
}
