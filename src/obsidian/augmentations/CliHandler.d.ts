export {};

declare module 'obsidian' {
    /**
     * A function that handles CLI commands.
     *
     * @deprecated - Added only for typing purposes. Use {@link CliHandler} instead.
     */
    type CliHandler__ = (params: CliData) => string | Promise<string>;
}
