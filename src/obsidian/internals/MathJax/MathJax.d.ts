import type { ExtendedMetrics } from './ExtendedMetrics.d.ts';

/**
 * MathJax library interface for rendering LaTeX math expressions.
 * @public
 * @unofficial
 */
export interface MathJax {
    /** MathJax configuration object. */
    config: unknown;

    /** MathJax component loader. */
    loader: unknown;

    /** MathJax runtime options. */
    options: unknown;

    /** MathJax library version string. */
    version: string;

    /** Get the CHTML stylesheet element for MathJax-rendered content. */
    chtmlStylesheet(): HTMLStyleElement;

    /** Get font metrics for a given DOM node, used for scaling math output. */
    getMetricsFor(node: HTMLElement, display?: boolean): ExtendedMetrics;

    /** Convert a TeX string to a CHTML (HTML) element synchronously. */
    tex2chtml(math: string, options?: Record<string, unknown>): HTMLElement;

    /** Convert a TeX string to a CHTML (HTML) element asynchronously. */
    tex2chtmlPromise(math: string, options?: Record<string, unknown>): Promise<HTMLElement>;

    /** Convert a TeX string to MathML markup synchronously. */
    tex2mml(math: string, options?: Record<string, unknown>): string;

    /** Convert a TeX string to MathML markup asynchronously. */
    tex2mmlPromise(math: string, options?: Record<string, unknown>): Promise<string>;

    /** Reset the TeX input jax, clearing equation numbering and labels. */
    texReset(): void;

    /** Typeset math expressions in the given elements synchronously. */
    typeset(elements?: unknown[] | null): void;

    /** Clear typeset math from the given elements. */
    typesetClear(elements?: unknown[] | null): void;

    /** Typeset math expressions in the given elements asynchronously. */
    typesetPromise(elements?: unknown[] | null): Promise<void>;
}
