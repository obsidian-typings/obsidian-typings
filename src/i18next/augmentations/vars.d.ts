export {};

declare module 'i18next' {
    var isLanguageChangingTo: string | undefined;

    var logger: unknown;

    var observers: object;

    var translator: unknown;
}
