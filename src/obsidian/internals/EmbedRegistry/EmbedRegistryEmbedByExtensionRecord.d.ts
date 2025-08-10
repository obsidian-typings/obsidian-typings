import type { TFile } from 'obsidian';
import type { FileExtension } from '../../implementations/Constants/FileExtension.ts';
import type { EmbedAudioComponent } from './EmbedAudioComponent.d.ts';
import type { EmbedCanvasComponent } from './EmbedCanvasComponent.d.ts';
import type { EmbedContext } from './EmbedContext.d.ts';
import type { EmbedCreator } from './EmbedCreator.d.ts';
import type { EmbedImageComponent } from './EmbedImageComponent.d.ts';
import type { EmbedMarkdownComponent } from './EmbedMarkdownComponent.d.ts';
import type { EmbedPdfComponent } from './EmbedPdfComponent.d.ts';
import type { EmbedVideoComponent } from './EmbedVideoComponent.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface EmbedRegistryEmbedByExtensionRecord extends Record<string, EmbedCreator> {
    /** @todo Documentation incomplete. */
    [FileExtension._3gp]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.avif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.bmp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.canvas]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedCanvasComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.flac]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.gif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.jpeg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.jpg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.m4a]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.md]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedMarkdownComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.mkv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.mov]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.mp3]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.mp4]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.oga]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.ogg]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.ogv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.opus]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.pdf]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedPdfComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.png]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.svg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.wav]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.webm]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /** @todo Documentation incomplete. */
    [FileExtension.webp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
}
