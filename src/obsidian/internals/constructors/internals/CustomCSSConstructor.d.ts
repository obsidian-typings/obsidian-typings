import type { App } from 'obsidian';
import type { CustomCSS } from '../../custom-css/CustomCSS.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The CustomCSS constructor.
 *
 * @public
 * @unofficial
 */
export interface CustomCSSConstructor extends ConstructorBase<[app: App], CustomCSS> {}
