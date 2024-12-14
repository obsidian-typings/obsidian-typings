import type {
    App
} from 'obsidian';
import type {
    BrowserHistoryViewConstructor
} from '../../../internals/Constructors/Views/BrowserHistoryViewConstructor.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BrowserHistoryView constructor.
 *
 * @returns The BrowserHistoryView constructor.
 * @public
 */
export function getBrowserHistoryViewConstructor(app: App): BrowserHistoryViewConstructor {
    return getViewConstructorByViewType(app, ViewType.BrowserHistory) as BrowserHistoryViewConstructor;
}
