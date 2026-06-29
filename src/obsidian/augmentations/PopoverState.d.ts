export {};

declare module 'obsidian' {
  /**
   * The state of a popover.
   */
  export enum PopoverState {
    Hidden = 3,
    Hiding = 2,
    Showing = 0,
    Shown = 1
  }
}
