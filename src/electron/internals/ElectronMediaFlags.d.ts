/**
 * Flags describing the state of a media element under the context menu.
 *
 * @public
 * @unofficial
 */
export interface ElectronMediaFlags {
  /** Whether the media element can be looped. */
  canLoop: boolean;

  /** Whether the media element can be printed. */
  canPrint: boolean;

  /** Whether the media element can be rotated. */
  canRotate: boolean;

  /** Whether the media element can be downloaded. */
  canSave: boolean;

  /** Whether the media element can show picture-in-picture. */
  canShowPictureInPicture: boolean;

  /** Whether the media element's controls are toggleable. */
  canToggleControls: boolean;

  /** Whether the media element has audio. */
  hasAudio: boolean;

  /** Whether the media element has crashed. */
  inError: boolean;

  /** Whether the media element's controls are visible. */
  isControlsVisible: boolean;

  /** Whether the media element is looping. */
  isLooping: boolean;

  /** Whether the media element is muted. */
  isMuted: boolean;

  /** Whether the media element is paused. */
  isPaused: boolean;

  /** Whether the media element is currently showing picture-in-picture. */
  isShowingPictureInPicture: boolean;
}
