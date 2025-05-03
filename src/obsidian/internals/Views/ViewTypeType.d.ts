import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
