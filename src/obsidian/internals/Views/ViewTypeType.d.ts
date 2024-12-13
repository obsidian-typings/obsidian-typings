import type { ViewType } from '../../implementations/Constants/ViewType.js';

/** @public */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
