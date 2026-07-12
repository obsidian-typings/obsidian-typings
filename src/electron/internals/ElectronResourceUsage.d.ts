import type { ElectronMemoryUsageDetails } from './ElectronMemoryUsageDetails.d.ts';

/**
 * Usage information of Blink's internal memory caches.
 *
 * @public
 * @unofficial
 */
export interface ElectronResourceUsage {
  /** Usage details for the CSS style sheets cache. */
  cssStyleSheets: ElectronMemoryUsageDetails;

  /** Usage details for the fonts cache. */
  fonts: ElectronMemoryUsageDetails;

  /** Usage details for the images cache. */
  images: ElectronMemoryUsageDetails;

  /** Usage details for other cached resources. */
  other: ElectronMemoryUsageDetails;

  /** Usage details for the scripts cache. */
  scripts: ElectronMemoryUsageDetails;

  /** Usage details for the XSL style sheets cache. */
  xslStyleSheets: ElectronMemoryUsageDetails;
}
