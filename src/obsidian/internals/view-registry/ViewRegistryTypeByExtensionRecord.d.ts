import type { FileExtension } from '../../implementations/constants/FileExtension.d.ts';
import type { ViewType } from '../../implementations/constants/ViewType.d.ts';

/**
 * Record mapping file extensions to their default view types.
 *
 * @public
 * @unofficial
 */
export interface ViewRegistryTypeByExtensionRecord extends Record<string, string> {
  /** Maps .3gp files to the audio view. */
  [FileExtension._3gp]: typeof ViewType.Audio;

  /** Maps .avif files to the image view. */
  [FileExtension.avif]: typeof ViewType.Image;

  /** Maps .bmp files to the image view. */
  [FileExtension.bmp]: typeof ViewType.Image;

  /** Maps .canvas files to the canvas view. */
  [FileExtension.canvas]: typeof ViewType.Canvas;

  /** Maps .flac files to the audio view. */
  [FileExtension.flac]: typeof ViewType.Audio;

  /** Maps .gif files to the image view. */
  [FileExtension.gif]: typeof ViewType.Image;

  /** Maps .jpeg files to the image view. */
  [FileExtension.jpeg]: typeof ViewType.Image;

  /** Maps .jpg files to the image view. */
  [FileExtension.jpg]: typeof ViewType.Image;

  /** Maps .m4a files to the audio view. */
  [FileExtension.m4a]: typeof ViewType.Audio;

  /** Maps .md files to the markdown view. */
  [FileExtension.md]: typeof ViewType.Markdown;

  /** Maps .mkv files to the video view. */
  [FileExtension.mkv]: typeof ViewType.Video;

  /** Maps .mov files to the video view. */
  [FileExtension.mov]: typeof ViewType.Video;

  /** Maps .mp3 files to the audio view. */
  [FileExtension.mp3]: typeof ViewType.Audio;

  /** Maps .mp4 files to the video view. */
  [FileExtension.mp4]: typeof ViewType.Video;

  /** Maps .oga files to the audio view. */
  [FileExtension.oga]: typeof ViewType.Audio;

  /** Maps .ogg files to the audio view. */
  [FileExtension.ogg]: typeof ViewType.Audio;

  /** Maps .ogv files to the video view. */
  [FileExtension.ogv]: typeof ViewType.Video;

  /** Maps .opus files to the audio view. */
  [FileExtension.opus]: typeof ViewType.Audio;

  /** Maps .pdf files to the PDF view. */
  [FileExtension.pdf]: typeof ViewType.Pdf;

  /** Maps .png files to the image view. */
  [FileExtension.png]: typeof ViewType.Image;

  /** Maps .svg files to the image view. */
  [FileExtension.svg]: typeof ViewType.Image;

  /** Maps .wav files to the audio view. */
  [FileExtension.wav]: typeof ViewType.Audio;

  /** Maps .webm files to the video view. */
  [FileExtension.webm]: typeof ViewType.Video;

  /** Maps .webp files to the image view. */
  [FileExtension.webp]: typeof ViewType.Image;
}
