/**
 * @public
 * @unofficial
 */
export interface DropResult {
    action: string | null;
    dropEffect: 'none' | 'copy' | 'link' | 'move';
    hoverClass: string;
    hoverEl: HTMLElement | null;
}
