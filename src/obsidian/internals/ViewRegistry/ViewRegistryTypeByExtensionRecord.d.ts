import type { Extension } from "../../implementations/Constants/Extension.ts";
import type { ViewType } from "../../implementations/Constants/ViewType.ts";

/** @public */
export interface ViewRegistryTypeByExtensionRecord extends Record<string, string> {
    [Extension._3gp]: typeof ViewType.Audio;
    [Extension.avif]: typeof ViewType.Image;
    [Extension.bmp]: typeof ViewType.Image;
    [Extension.canvas]: typeof ViewType.Canvas;
    [Extension.flac]: typeof ViewType.Audio;
    [Extension.gif]: typeof ViewType.Image;
    [Extension.jpeg]: typeof ViewType.Image;
    [Extension.jpg]: typeof ViewType.Image;
    [Extension.m4a]: typeof ViewType.Audio;
    [Extension.md]: typeof ViewType.Markdown;
    [Extension.mkv]: typeof ViewType.Video;
    [Extension.mov]: typeof ViewType.Video;
    [Extension.mp3]: typeof ViewType.Audio;
    [Extension.mp4]: typeof ViewType.Video;
    [Extension.oga]: typeof ViewType.Audio;
    [Extension.ogg]: typeof ViewType.Audio;
    [Extension.ogv]: typeof ViewType.Video;
    [Extension.opus]: typeof ViewType.Audio;
    [Extension.pdf]: typeof ViewType.Pdf;
    [Extension.png]: typeof ViewType.Image;
    [Extension.svg]: typeof ViewType.Image;
    [Extension.wav]: typeof ViewType.Audio;
    [Extension.webm]: typeof ViewType.Video;
    [Extension.webp]: typeof ViewType.Image;
}
