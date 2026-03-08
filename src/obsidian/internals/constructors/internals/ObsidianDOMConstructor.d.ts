import type { ObsidianDOM } from '../../ObsidianDOM.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ObsidianDOM constructor.
 *
 * @public
 * @unofficial
 */
export interface ObsidianDOMConstructor extends ConstructorBase<[containerEl: HTMLElement], ObsidianDOM> {}
