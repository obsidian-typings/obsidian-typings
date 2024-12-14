import type {
    App,
    MarkdownView
} from 'obsidian';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';

/**
 * Get the MarkdownView constructor.
 *
 * @returns The MarkdownView constructor.
 * @public
 */
export function getMarkdownViewConstructor(app: App): TypedViewConstructor<MarkdownView> {
    return getViewConstructorByViewType(app, ViewType.Markdown) as TypedViewConstructor<MarkdownView>;
}
