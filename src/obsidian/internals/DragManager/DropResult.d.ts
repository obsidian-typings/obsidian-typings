/**
 * @public
 * @unofficial
 */
export interface DropResult {
    /** @todo Documentation incomplete. */
    action: string | null;

    /** @todo Documentation incomplete. */
    dropEffect: 'none' | 'copy' | 'link' | 'move';

    /** @todo Documentation incomplete. */
    hoverClass: string;

    /** @todo Documentation incomplete. */
    hoverEl: HTMLElement | null;
}
