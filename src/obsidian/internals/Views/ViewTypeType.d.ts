import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';

/** @public */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
