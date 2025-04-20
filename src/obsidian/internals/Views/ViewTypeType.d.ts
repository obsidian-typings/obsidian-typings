import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * @public
 * @unofficial
 */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
