export {};

declare module 'obsidian' {
    interface SliderComponent extends ValueComponent<number> {
        /**
         * The function that's called after changing the value of the component.
         * @remark Using `SliderComponent.onChange(callback)` assigns the callback to this method.
         */
        changeCallback?(value: number): void;
    }
}
