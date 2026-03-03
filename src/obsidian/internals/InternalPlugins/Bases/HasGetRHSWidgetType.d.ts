/**
 * Has get RHS widget type.
 *
 * @public
 * @unofficial
 */
export interface HasGetRHSWidgetType {
    /**
     * Gets the RHS widget type.
     *
     * @param type - The type to get the RHS widget type for.
     * @returns The RHS widget type.
     */
    getRHSWidgetType(type: string): string;
}
