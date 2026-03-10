export {};

declare module 'obsidian' {
  /**
   * The user event.
   *
   * @deprecated - Added only for typing purposes. Use {@link UserEvent} instead.
   */
  type UserEvent__ = KeyboardEvent | MouseEvent | PointerEvent | TouchEvent;
}
