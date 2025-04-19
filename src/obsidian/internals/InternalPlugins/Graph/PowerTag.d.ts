import type {
    Text,
    TextStyle
} from 'pixi.js';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Power tag.
 *
 * @public @unofficial
 */
export interface PowerTag {
    rendered: boolean;
    renderer: GraphRenderer;
    text: Text;

    clearGraphics(): void;
    getTextStyle(): TextStyle;
    initGraphics(): void;
    render(): void;
}
