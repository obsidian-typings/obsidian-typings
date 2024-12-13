import type { ViewType } from '../../implementations/ViewType.js';

/** @public */
export type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
