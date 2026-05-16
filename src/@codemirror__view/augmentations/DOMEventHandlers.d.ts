import type { DOMEventMap } from '@codemirror/view';

export {};

declare module '@codemirror/view' {
  /**
   * Event handlers are specified with objects like this. For event types known by TypeScript,
   * this will infer the event argument type to hold the appropriate event object type.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link DOMEventHandlers} instead.
   */
  type DOMEventHandlers__<This> = {
    [event in keyof DOMEventMap]?: (this: This, event: DOMEventMap[event], view: EditorView) => boolean | void;
  };
}
