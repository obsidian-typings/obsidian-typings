import type { App } from 'obsidian';
import type { EditorSuggests } from '../../EditorSuggests.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The EditorSuggests constructor.
 *
 * @public
 * @unofficial
 */
export interface EditorSuggestsConstructor extends ConstructorBase<[app: App], EditorSuggests> {}
