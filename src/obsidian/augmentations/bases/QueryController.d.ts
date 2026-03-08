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
         * To get the constructor instance, use {@link getQueryControllerConstructor} from `obsidian-typings/implementations`.
         *
         * @param app - The app.
         * @param plugin - The plugin.
         * @param viewHeaderEl - The viewHeaderEl.
         * @param currentFile - The currentFile.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor__(app: App, plugin: unknown, viewHeaderEl: HTMLElement, currentFile?: TFile | null): this;
}
}
