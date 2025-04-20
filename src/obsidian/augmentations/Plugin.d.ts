export {};

declare module 'obsidian' {
    interface Plugin extends Component {
        /** @unofficial */
        onConfigFileChange: Debouncer<[], Promise<void>>;

        /** @unofficial */
        _onConfigFileChange(): Promise<void>;
    }
}
