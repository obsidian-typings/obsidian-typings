import type { WorkspaceWindowInitDataSize } from '../internals/Workspace/WorkspaceWindowInitDataSize.d.ts';

export {};

declare module 'obsidian' {
    interface WorkspaceWindowInitData {
        /**
         * The suggested size.
         *
         * @official
         */
        size?: WorkspaceWindowInitDataSize;

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
