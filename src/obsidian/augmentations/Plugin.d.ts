export {};

declare module 'obsidian' {
    interface Plugin extends Component {
        onConfigFileChange: Debouncer<[], Promise<void>>;

        _onConfigFileChange(): Promise<void>;
    }
}
