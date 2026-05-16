import type { TFunction } from './TFunction.d.ts';

/**
 * Callback type for i18next operations.
 *
 * @public
 * @unofficial
 */
export type Callback = (error: unknown, t: TFunction) => void;
