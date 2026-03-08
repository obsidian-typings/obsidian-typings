import type {
    TFile
} from 'obsidian';
import type { EmbedComponent } from './EmbedComponent.d.ts';
import type { EmbedContext } from './EmbedContext.d.ts';

/**
 * Creates an embed component for a given file.
 *
 * @param context - Context used to embed the file.
 * @param file - File to embed.
 * @param subpath - Optional subpath within the file.
 * @returns An embed component.
 *
 * @public
 * @unofficial
 */
export type EmbedCreator = (context: EmbedContext, file: TFile, subpath?: string) => EmbedComponent;
