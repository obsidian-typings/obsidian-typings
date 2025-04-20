import type { TFile } from 'obsidian';
import type { FileExtension } from '../../implementations/Constants/FileExtension.ts';
import type { EmbedContext } from '../EmbedContext.d.ts';
import type { EmbeddableConstructor } from '../EmbeddableConstructor.d.ts';
import type { EmbedAudioComponent } from './EmbedAudioComponent.d.ts';
import type { EmbedCanvasComponent } from './EmbedCanvasComponent.d.ts';
import type { EmbedImageComponent } from './EmbedImageComponent.d.ts';
import type { EmbedMarkdownComponent } from './EmbedMarkdownComponent.d.ts';
import type { EmbedPdfComponent } from './EmbedPdfComponent.d.ts';
import type { EmbedVideoComponent } from './EmbedVideoComponent.d.ts';

/**
 * @public
 * @unofficial
 */
export interface EmbedRegistryEmbedByExtensionRecord extends Record<string, EmbeddableConstructor> {
    [FileExtension._3gp]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.avif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.bmp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.canvas]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedCanvasComponent;
    [FileExtension.flac]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.gif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.jpeg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.jpg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.m4a]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.md]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedMarkdownComponent;
    [FileExtension.mkv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;
    [FileExtension.mov]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;
    [FileExtension.mp3]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.mp4]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;
    [FileExtension.oga]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.ogg]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.ogv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;
    [FileExtension.opus]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.pdf]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedPdfComponent;
    [FileExtension.png]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.svg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
    [FileExtension.wav]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;
    [FileExtension.webm]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;
    [FileExtension.webp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
}
