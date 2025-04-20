export {};

declare module 'obsidian' {
    interface Plugin extends Component {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        onConfigFileChange: Debouncer<[], Promise<void>>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        _onConfigFileChange(): Promise<void>;
    }
}
