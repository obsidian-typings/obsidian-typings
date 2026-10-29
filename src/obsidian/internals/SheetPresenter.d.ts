/**
 * Shows a popup element either in place or, on a phone, as a dismissible bottom sheet over a background.
 *
 * Used by {@link obsidian#Menu.presenter} and by other popups that switch to a sheet on phones.
 *
 * @public
 * @unofficial
 */
export interface SheetPresenter {
  /** Background element placed behind the sheet; clicking it dismisses the popup. */
  bgEl: HTMLElement;

  /** The popup element being presented. */
  containerEl: HTMLElement;

  /** Whether the popup is, or would be, shown as a sheet: the current mode while shown, otherwise whether the device is a phone. */
  readonly isSheet: boolean;

  /** Whether the popup is currently shown. */
  isShown: boolean;

  /** Whether the current showing is a sheet, decided on each {@link SheetPresenter.show}. */
  isShownAsSheet: boolean;

  /**
   * Hide the popup, animating the sheet away first when it is shown as one.
   *
   * @param callback - Called once the popup has been detached.
   */
  hide(callback?: () => void): void;

  /**
   * Show the popup in the given parent.
   *
   * @param parentEl - The element to attach the popup (and the sheet background) to.
   * @param onShowInPlace - Called after attaching when the popup is not shown as a sheet, to position it.
   */
  show(parentEl: HTMLElement, onShowInPlace: () => void): void;
}
