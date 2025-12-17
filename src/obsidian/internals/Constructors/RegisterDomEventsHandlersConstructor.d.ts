import type { RegisterDomEventsHandlers } from '../RegisterDomEventsHandlers.ts';
import type { RegisterDomEventsHandlersInfo } from '../RegisterDomEventsHandlersInfo.ts';
import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * The RegisterDomEventsHandlers constructor.
 *
 * @public
 * @unofficial
 */
export interface RegisterDomEventsHandlersConstructor
    extends ConstructorBase<[info: RegisterDomEventsHandlersInfo], RegisterDomEventsHandlers>
{}
