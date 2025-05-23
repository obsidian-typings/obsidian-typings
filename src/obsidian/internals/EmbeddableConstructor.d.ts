import type {
    Component,
    TFile
} from 'obsidian';
import type { EmbedContext } from './EmbedContext.d.ts';

/**
 * @todo Documentation incomplete.
 *
 * @public
 * @unofficial
 */
export type EmbeddableConstructor = (context: EmbedContext, file: TFile, subpath?: string) => Component;
