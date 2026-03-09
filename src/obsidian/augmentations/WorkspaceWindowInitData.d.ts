import type { Dimensions } from '../internals/Dimensions.d.ts';

export {};

declare module 'obsidian' {
  interface WorkspaceWindowInitData {
    /**
     * The suggested size.
     *
     * @official
     */
    size?: Dimensions;

    /**
     * The x position.
     *
     * @official
     */
    x?: number;

    /**
     * The y position.
     *
     * @official
     */
    y?: number;
  }
}
