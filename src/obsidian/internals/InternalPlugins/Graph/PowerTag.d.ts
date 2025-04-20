import type {
    Text,
    TextStyle
} from 'pixi.js';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Power tag.
 *
 * @public
 * @unofficial
 */
export interface PowerTag {
    /**
     * @todo Documentation incomplete.
     */
    rendered: boolean;

    /**
     * @todo Documentation incomplete.
     */
    renderer: GraphRenderer;

    /**
     * @todo Documentation incomplete.
     */
    text: Text;

    /**
     * @todo Documentation incomplete.
     */
    clearGraphics(): void;

    /**
     * @todo Documentation incomplete.
     */
    getTextStyle(): TextStyle;

    /**
     * @todo Documentation incomplete.
     */
    initGraphics(): void;

    /**
     * @todo Documentation incomplete.
     */
    render(): void;
}
