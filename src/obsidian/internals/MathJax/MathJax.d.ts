import type { ExtendedMetrics } from './ExtendedMetrics.d.ts';

/**
 * @public
 * @unofficial
 */
export interface MathJax {
    /** @todo Documentation incomplete. */
    config: unknown;

    /** @todo Documentation incomplete. */
    loader: unknown;

    /** @todo Documentation incomplete. */
    options: unknown;

    /** @todo Documentation incomplete. */
    version: string;

    /** @todo Documentation incomplete. */
    chtmlStylesheet(): HTMLStyleElement;

    /** @todo Documentation incomplete. */
    getMetricsFor(node: HTMLElement, display?: boolean): ExtendedMetrics;

    /** @todo Documentation incomplete. */
    tex2chtml(math: string, options?: Record<string, unknown>): HTMLElement;

    /** @todo Documentation incomplete. */
    tex2chtmlPromise(math: string, options?: Record<string, unknown>): Promise<HTMLElement>;

    /** @todo Documentation incomplete. */
    tex2mml(math: string, options?: Record<string, unknown>): string;

    /** @todo Documentation incomplete. */
    tex2mmlPromise(math: string, options?: Record<string, unknown>): Promise<string>;

    /** @todo Documentation incomplete. */
    texReset(): void;

    /** @todo Documentation incomplete. */
    typeset(elements?: unknown[] | null): void;

    /** @todo Documentation incomplete. */
    typesetClear(elements?: unknown[] | null): void;

    /** @todo Documentation incomplete. */
    typesetPromise(elements?: unknown[] | null): Promise<void>;
}
