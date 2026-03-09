import type { getImageValueConstructor } from '../../implementations/constructors/augmentations/getImageValueConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * {@link Value} wrapping a path to an image resource in the vault.
     *
     * @since 1.10.0
     */
    interface ImageValue extends StringValue {
        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getImageValueConstructor} from `obsidian-typings/implementations`.
         *
         * @param value - The value.
         * @returns The new instance.
         * @unofficial
         * @deprecated - Added only for typing purposes.
         */
        constructor5__(value: string): this;
    }
}
