/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface Account {
    /**
     * The company associated with the activated commercial license.
     */
    company: string;
    /**
     * The email address associated with the account.
     */
    email: string;
    expiry: number;
    key: string | undefined;
    keyValidation: string;
    /**
     * The license available to the account.
     */
    license: '' | 'insider';
    /**
     * Profile name.
     */
    name: string;
    seats: number;
    token: string;
}
