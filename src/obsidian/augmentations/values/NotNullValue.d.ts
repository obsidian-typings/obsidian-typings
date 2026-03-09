import type {
    getNotNullValueConstructor
} from '../../implementations/constructors/augmentations/getNotNullValueConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Base type for all non-null {@link Values}.
     *
     * @since 1.10.0
     */
    interface NotNullValue extends Value {
        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getNotNullValueConstructor} from `obsidian-typings/implementations`.
         *
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor2__(): this;
    }
}
