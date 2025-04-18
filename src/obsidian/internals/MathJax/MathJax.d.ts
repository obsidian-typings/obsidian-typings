import type { ExtendedMetrics } from './ExtendedMetrics.d.ts';

/** @public */
export interface MathJax {
    config: unknown;
    loader: unknown;
    options: unknown;
    version: string;

    chtmlStylesheet(): HTMLStyleElement;
    getMetricsFor(node: HTMLElement, display?: boolean): ExtendedMetrics;
    tex2chtml(math: string, options?: Record<string, unknown>): HTMLElement;
    tex2chtmlPromise(math: string, options?: Record<string, unknown>): Promise<HTMLElement>;
    tex2mml(math: string, options?: Record<string, unknown>): string;
    tex2mmlPromise(math: string, options?: Record<string, unknown>): Promise<string>;
    texReset(): void;
    typeset(elements?: unknown[] | null): void;
    typesetClear(elements?: unknown[] | null): void;
    typesetPromise(elements?: unknown[] | null): Promise<void>;
}
