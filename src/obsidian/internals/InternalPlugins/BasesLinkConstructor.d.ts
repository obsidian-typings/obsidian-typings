import type { App } from 'obsidian';
import type { ConstructorBase } from '../Constructors/ConstructorBase.d.ts';
import type { BasesLink } from './Bases/BasesLink.d.ts';

/**
 * Bases link constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesLinkConstructor
    extends ConstructorBase<[app: App, linkText: string, sourcePath: string, displayText: string], BasesLink>
{
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
