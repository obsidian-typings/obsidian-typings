/** @public @unofficial */
export interface ConstructorBase<Args extends unknown[], Instance> {
    new(...args: Args): Instance;
    prototype: Instance;
}
