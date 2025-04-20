import type { FileExtension } from '../../implementations/Constants/FileExtension.ts';
import type { ViewType } from '../../implementations/Constants/ViewType.ts';

/**
 * @public
 * @unofficial
 */
export interface ViewRegistryTypeByExtensionRecord extends Record<string, string> {
    /**
     * @todo Documentation incomplete.
     */
    [FileExtension._3gp]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.avif]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.bmp]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.canvas]: typeof ViewType.Canvas;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.flac]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.gif]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.jpeg]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.jpg]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.m4a]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.md]: typeof ViewType.Markdown;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.mkv]: typeof ViewType.Video;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.mov]: typeof ViewType.Video;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.mp3]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.mp4]: typeof ViewType.Video;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.oga]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.ogg]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.ogv]: typeof ViewType.Video;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.opus]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.pdf]: typeof ViewType.Pdf;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.png]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.svg]: typeof ViewType.Image;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.wav]: typeof ViewType.Audio;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.webm]: typeof ViewType.Video;

    /**
     * @todo Documentation incomplete.
     */
    [FileExtension.webp]: typeof ViewType.Image;
}
