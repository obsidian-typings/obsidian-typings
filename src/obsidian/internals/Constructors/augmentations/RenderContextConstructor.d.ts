import type {
    App,
    RenderContext
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The RenderContext constructor.
 *
 * @public
 * @unofficial
 */
export interface RenderContextConstructor extends ConstructorBase<[app: App], RenderContext> {}
