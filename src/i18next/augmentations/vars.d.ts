export {};

declare module 'i18next' {
    /**
     * The language code that i18next is currently transitioning to, or undefined if no change is in progress.
     *
     * @unofficial
     */
    var isLanguageChangingTo: string | undefined;

    /**
     * The logger instance used by i18next for debug and warning output.
     * @unofficial
     */
    var logger: unknown;

    /**
     * Registered observers for i18next events and state changes.
     *
     * @unofficial
     */
    var observers: object;

    /**
     * The translator instance responsible for resolving translation keys.
     *
     * @unofficial
     */
    var translator: unknown;
}
