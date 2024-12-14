import type {
    App,
    MarkdownView
} from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the MarkdownView constructor.
 *
 * @returns The MarkdownView constructor.
 * @public
 */
export function getMarkdownViewConstructor(app: App): TypedViewConstructor<MarkdownView> {
    return getViewConstructorByViewType(app, ViewType.Markdown) as TypedViewConstructor<MarkdownView>;
}
