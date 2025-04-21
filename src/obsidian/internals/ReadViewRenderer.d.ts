import type { RendererSection } from './RendererSection.d.ts';

/** @todo Documentation incomplete */
/**
 * @public
 * @unofficial
 */
export interface ReadViewRenderer {
    /** @todo Documentation incomplete. */
    addBottomPadding: boolean;

    /** @todo Documentation incomplete. */
    asyncSections: unknown[];

    /** @todo Documentation incomplete. */
    lastRender: number;

    /** @todo Documentation incomplete. */
    lastScroll: number;

    /** @todo Documentation incomplete. */
    lastText: string;

    /** @todo Documentation incomplete. */
    previewEl: HTMLElement;

    /** @todo Documentation incomplete. */
    pusherEl: HTMLElement;

    /** @todo Documentation incomplete. */
    recycledSections: unknown[];

    /** @todo Documentation incomplete. */
    rendered: unknown[];

    /** @todo Documentation incomplete. */
    sections: RendererSection[];

    /** @todo Documentation incomplete. */
    text: string;

    /** @todo Documentation incomplete. */
    clear(): void;

    /** @todo Documentation incomplete. */
    parseAsync(): void;

    /** @todo Documentation incomplete. */
    parseSync(): void;

    /** @todo Documentation incomplete. */
    queueRender(): void;

    /** @todo Documentation incomplete. */
    set(text: string): void;
}
