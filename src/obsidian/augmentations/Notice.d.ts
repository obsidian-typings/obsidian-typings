import type { getNoticeConstructor } from '../implementations/constructors/augmentations/getNoticeConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Notification component. Use to present timely, high-value information.
   *
   * @since 0.9.7
   */
  interface Notice {
    /**
     * The container element for action buttons, created lazily by {@link Notice.addButton}. `null` until then.
     *
     * @unofficial
     */
    buttonContainerEl: HTMLElement | null;

    /**
     * The container HTML element for the notice.
     *
     * @official
     * @since 1.8.7
     */
    containerEl: HTMLElement;

    /**
     * The HTML element that represents the message of the notice.
     *
     * @official
     * @since 1.8.7
     */
    messageEl: HTMLElement;

    /**
     * The HTML element that represents the notice.
     *
     * @deprecated Use {@link messageEl} instead
     * @official
     * @since 0.9.7
     */
    noticeEl: HTMLElement;

    /**
     * The auto-hide timer handle, or `-1` when no auto-hide is scheduled.
     *
     * @unofficial
     */
    timerId: number;

    /**
     * The window the notice is shown in.
     *
     * @unofficial
     */
    win: Window;

    /**
     * Adds an action button to the notice.
     *
     * @param buttonText - The button label.
     * @param callback - Called when the button is clicked; the notice is hidden first.
     * @returns The notice instance, for chaining.
     * @unofficial
     */
    addButton(buttonText: string, callback: (evt: MouseEvent) => void): this;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getNoticeConstructor} from `obsidian-typings/implementations`.
     *
     * @param message - The message to be displayed, can either be a simple string or a {@link DocumentFragment}.
     * @param duration - Time in milliseconds to show the notice for. If this is `0`, the
     * {@link obsidian#Notice} will stay visible until the user manually dismisses it.
     * @returns The notice instance.
     * @example
     * ```ts
     * new Notice('foo');
     *
     * const fragment = createFragment();
     * fragment.createEl('strong', { text: 'bar' });
     * new Notice(fragment);
     *
     * new Notice('baz', 1000); // will be visible for 1 second
     * new Notice('qux', 0); // will stay visible until the user manually dismisses it
     * ```
     * @official
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(message: DocumentFragment | string, duration?: number): this;

    /**
     * Hide the notice.
     *
     * @official
     * @since 0.9.7
     */
    hide(): void;

    /**
     * Schedules the notice to auto-hide after the given duration, clearing any existing timer.
     *
     * @param timeoutMilliseconds - The delay before hiding, in milliseconds. `0` disables auto-hide.
     * @returns The notice instance, for chaining.
     * @unofficial
     */
    setAutoHide(timeoutMilliseconds: number): this;

    /**
     * Change the message of this notice.
     *
     * @param message - The message to be displayed, can either be a simple string or a {@link DocumentFragment}.
     * @returns The notice instance.
     * @example
     * ```ts
     * notice.setMessage('foo');
     *
     * const fragment = createFragment();
     * fragment.createEl('strong', { text: 'bar' });
     * notice.setMessage(fragment);
     * ```
     * @official
     * @since 0.9.7
     */
    setMessage(message: DocumentFragment | string): this;
  }
}
