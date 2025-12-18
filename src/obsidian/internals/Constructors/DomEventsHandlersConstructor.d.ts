import type { DomEventsHandlers } from '../DomEventsHandlers.d.ts';
import type { DomEventsHandlersInfo } from '../DomEventsHandlersInfo.d.ts';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The DomEventsHandlers constructor.
 *
 * @public
 * @unofficial
 */
export interface DomEventsHandlersConstructor
    extends ConstructorBase<[info: DomEventsHandlersInfo], DomEventsHandlers>
{}
