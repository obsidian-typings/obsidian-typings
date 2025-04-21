/**
 * @public
 * @unofficial
 */
export interface ConstructorBase<Args extends unknown[], Instance> {
    /**
     * @todo Documentation incomplete.
     */
    new(...args: Args): Instance;

    /** @todo Documentation incomplete. */
    prototype: Instance;
}
