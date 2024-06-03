import { RendererSection } from "./RendererSection.d.ts";

/** @todo Documentation incomplete */
interface ReadViewRenderer {
    addBottomPadding: boolean;
    asyncSections: unknown[];
    lastRender: number;
    lastScroll: number;
    lastText: string;
    previewEl: HTMLElement;
    pusherEl: HTMLElement;
    recycledSections: unknown[];
    rendered: unknown[];
    sections: RendererSection[];
    text: string;

    clear(): void;
    parseAsync(): void;
    parseSync(): void;
    queueRender(): void;
    set(text: string): void;
}
