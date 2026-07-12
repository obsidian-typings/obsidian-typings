/**
 * Describes the system-wide animation settings.
 *
 * @public
 * @unofficial
 */
export interface ElectronAnimationSettings {
  /** Determines whether the user desires reduced motion based on platform APIs. */
  prefersReducedMotion: boolean;

  /** Determines on a per-platform basis whether scroll animations (e.g. produced by home/end key) should be enabled. */
  scrollAnimationsEnabledBySystem: boolean;

  /** Returns `true` if rich animations should be rendered. Looks at session type (e.g. remote desktop) and accessibility settings to give guidance for heavy animations. */
  shouldRenderRichAnimation: boolean;
}
