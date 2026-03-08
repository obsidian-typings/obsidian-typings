import type { Component } from 'obsidian';

/**
 * The component that renders the embedded file.
 *
 * @public
 * @unofficial
 */
export interface EmbedComponent extends Component {
    /**
     * Load the file into the component.
     */
    loadFile(): void;
}
