import type { FileExtension } from '../../implementations/Constants/FileExtension.ts';
import type { ViewType } from '../../implementations/Constants/ViewType.ts';

/**
 * @public
 * @unofficial
 */
export interface ViewRegistryTypeByExtensionRecord extends Record<string, string> {
    [FileExtension._3gp]: typeof ViewType.Audio;
    [FileExtension.avif]: typeof ViewType.Image;
    [FileExtension.bmp]: typeof ViewType.Image;
    [FileExtension.canvas]: typeof ViewType.Canvas;
    [FileExtension.flac]: typeof ViewType.Audio;
    [FileExtension.gif]: typeof ViewType.Image;
    [FileExtension.jpeg]: typeof ViewType.Image;
    [FileExtension.jpg]: typeof ViewType.Image;
    [FileExtension.m4a]: typeof ViewType.Audio;
    [FileExtension.md]: typeof ViewType.Markdown;
    [FileExtension.mkv]: typeof ViewType.Video;
    [FileExtension.mov]: typeof ViewType.Video;
    [FileExtension.mp3]: typeof ViewType.Audio;
    [FileExtension.mp4]: typeof ViewType.Video;
    [FileExtension.oga]: typeof ViewType.Audio;
    [FileExtension.ogg]: typeof ViewType.Audio;
    [FileExtension.ogv]: typeof ViewType.Video;
    [FileExtension.opus]: typeof ViewType.Audio;
    [FileExtension.pdf]: typeof ViewType.Pdf;
    [FileExtension.png]: typeof ViewType.Image;
    [FileExtension.svg]: typeof ViewType.Image;
    [FileExtension.wav]: typeof ViewType.Audio;
    [FileExtension.webm]: typeof ViewType.Video;
    [FileExtension.webp]: typeof ViewType.Image;
}
