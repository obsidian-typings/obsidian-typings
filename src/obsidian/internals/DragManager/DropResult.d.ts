/** @public */
export interface DropResult {
    action: string | null;
    dropEffect: 'none' | 'copy' | 'link' | 'move';
    hoverEl: HTMLElement | null;
    hoverClass: string;
}
