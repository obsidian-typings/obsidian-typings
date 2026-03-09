import type { App } from 'obsidian';
import type { BasesLink } from '../internal-plugins/bases/BasesLink.d.ts';
import type { ExtractConstructor } from './ExtractConstructor.d.ts';

/**
 * Bases link constructor.
 *
 * Extends {@link ExtractConstructor} with a static `parseFromString` method.
 *
 * @public
 * @unofficial
 */
export interface BasesLinkConstructor extends ExtractConstructor<BasesLink> {
    /**
     * Parse {@link BasesLink} from string.
     *
     * @param app - The Obsidian application instance.
     * @param str - The string to parse.
     * @param sourcePath - The source path.
     * @returns The parsed {@link BasesLink}.
     */
    parseFromString(app: App, str: string, sourcePath: string): BasesLink;
}
