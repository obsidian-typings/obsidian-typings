/**
 * @todo Documentation incomplete
 *
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

    /** @todo Documentation incomplete. */
    expiry: number;

    /** @todo Documentation incomplete. */
    key: string | undefined;

    /** @todo Documentation incomplete. */
    keyValidation: string;

    /**
     * The license available to the account.
     */
    license: '' | 'insider';

    /**
     * Profile name.
     */
    name: string;

    /** @todo Documentation incomplete. */
    seats: number;

    /** @todo Documentation incomplete. */
    token: string;
}
