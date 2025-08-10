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
 * A record of embeddable file extensions and their creators.
 *
 * @public
 * @unofficial
 */
export interface EmbedRegistryEmbedByExtensionRecord extends Record<string, EmbedCreator> {
    /**
     * Creates an embed component for a 3GP file.
     */
    [FileExtension._3gp]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for an AVIF file.
     */
    [FileExtension.avif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for a BMP file.
     */
    [FileExtension.bmp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for a canvas file.
     */
    [FileExtension.canvas]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedCanvasComponent;

    /**
     * Creates an embed component for a FLAC file.
     */
    [FileExtension.flac]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for a GIF file.
     */
    [FileExtension.gif]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for a JPEG file.
     */
    [FileExtension.jpeg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for a JPG file.
     */
    [FileExtension.jpg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for an M4A file.
     */
    [FileExtension.m4a]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for a markdown file.
     */
    [FileExtension.md]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedMarkdownComponent;

    /**
     * Creates an embed component for a MKV file.
     */
    [FileExtension.mkv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /**
     * Creates an embed component for a MOV file.
     */
    [FileExtension.mov]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /**
     * Creates an embed component for an MP3 file.
     */
    [FileExtension.mp3]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for an MP4 file.
     */
    [FileExtension.mp4]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /**
     * Creates an embed component for an OGA file.
     */
    [FileExtension.oga]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for an OGG file.
     */
    [FileExtension.ogg]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for an OGV file.
     */
    [FileExtension.ogv]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /**
     * Creates an embed component for an OPUS file.
     */
    [FileExtension.opus]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for a PDF file.
     */
    [FileExtension.pdf]: (context: EmbedContext, file: TFile, subpath?: string) => EmbedPdfComponent;

    /**
     * Creates an embed component for a PNG file.
     */
    [FileExtension.png]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for an SVG file.
     */
    [FileExtension.svg]: (context: EmbedContext, file: TFile) => EmbedImageComponent;

    /**
     * Creates an embed component for a WAV file.
     */
    [FileExtension.wav]: (context: EmbedContext, file: TFile) => EmbedAudioComponent;

    /**
     * Creates an embed component for a WEBM file.
     */
    [FileExtension.webm]: (context: EmbedContext, file: TFile) => EmbedVideoComponent;

    /**
     * Creates an embed component for a WEBP file.
     */
    [FileExtension.webp]: (context: EmbedContext, file: TFile) => EmbedImageComponent;
}
