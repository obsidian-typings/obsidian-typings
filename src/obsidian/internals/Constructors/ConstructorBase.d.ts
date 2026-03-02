/**
 * Base type representing a constructor function that creates instances of the given type.
 *
 * @typeParam Args - The constructor argument types.
 * @typeParam Instance - The type of the constructed instance.
 * @public
 * @unofficial
 */
export interface ConstructorBase<Args extends unknown[], Instance> {
    /** Construct a new instance with the given arguments. */
    new(...args: Args): Instance;

    /** Prototype of the constructed instances. */
    prototype: Instance;
}
