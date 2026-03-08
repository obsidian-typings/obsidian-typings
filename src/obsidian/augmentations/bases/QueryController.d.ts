export {};

declare module 'obsidian' {
    /**
     * Responsible for executing the Bases query and evaluating filters and formulas.
     * Notifies views of updated results.
     *
     * @since 1.10.0
     */
    interface QueryController extends Component {
    
        /**
         * Constructor.
         *
         * @param app - The app.
         * @param plugin - The plugin.
         * @param viewHeaderEl - The viewHeaderEl.
         * @param currentFile - The currentFile.
         * @returns The new instance.
         * To get the constructor, use `getQueryControllerConstructor()` from `obsidian-typings/implementations`.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(app: App, plugin: unknown, viewHeaderEl: HTMLElement, currentFile?: TFile | null): this;
}
}
