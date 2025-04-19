/** @public @unofficial */
export interface DailyNotesOptions {
    /** Open the daily note automatically whenever the vault is opened. */
    autorun?: boolean;
    /** New daily notes will be placed here. */
    folder?: string;
    /**
     * Naming syntax for daily note in Moment.js syntax.
     * https://momentjs.com/docs/#/displaying/format/.
     */
    format?: string;
    /** Path to the file to use as a template. */
    template?: string;
}
