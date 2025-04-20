export {};

declare module 'i18next' {
    /**
     * @unofficial
     */
    var isLanguageChangingTo: string | undefined;

    /**
     * @unofficial
     */
    var logger: unknown;

    /**
     * @unofficial
     */
    var observers: object;

    /**
     * @unofficial
     */
    var translator: unknown;
}
