import type {
    Component,
    TFile
} from 'obsidian';
import type { EmbedContext } from './EmbedContext.d.ts';

/** @todo Documentation incomplete */
/** @public */
export type EmbeddableConstructor = (context: EmbedContext, file: TFile, subpath?: string) => Component;
