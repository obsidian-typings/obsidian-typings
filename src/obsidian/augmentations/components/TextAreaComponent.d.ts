import type { getTextAreaComponentConstructor } from '../../implementations/constructors/augmentations/getTextAreaComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A text area component.
     * @since 0.9.7
     */
    interface TextAreaComponent extends AbstractTextComponent<HTMLTextAreaElement> {
        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getTextAreaComponentConstructor} from `obsidian-typings/implementations`.
         *
         * @param containerEl - The container element.
         * @returns The text area component instance.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor__(containerEl: HTMLElement): this;
    }
}
