import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * Union type of all built-in view type string identifiers.
 *
 * @public
 * @unofficial
 */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
