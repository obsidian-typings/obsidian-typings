import type { ElectronProductDiscount } from './ElectronProductDiscount.d.ts';
import type { ElectronProductSubscriptionPeriod } from './ElectronProductSubscriptionPeriod.d.ts';

/**
 * A product available for purchase from the Mac App Store.
 *
 * @public
 * @unofficial
 */
export interface ElectronProduct {
  /** The total size of the content, in bytes. */
  contentLengths: number[];

  /** A string that identifies the version of the content. */
  contentVersion: string;

  /** 3 character code presenting a product's currency based on the ISO 4217 standard. */
  currencyCode: string;

  /** An array of discount offers. */
  discounts: ElectronProductDiscount[];

  /** The total size of the content, in bytes. */
  downloadContentLengths: number[];

  /** A string that identifies the version of the content. */
  downloadContentVersion: string;

  /** The locale formatted price of the product. */
  formattedPrice: string;

  /** The object containing introductory price information for the product, available for the product. */
  introductoryPrice?: ElectronProductDiscount;

  /**
   * A boolean value that indicates whether the App Store has downloadable content for this product. `true` if at least
   * one file has been associated with the product.
   */
  isDownloadable: boolean;

  /** A description of the product. */
  localizedDescription: string;

  /** The name of the product. */
  localizedTitle: string;

  /** The cost of the product in the local currency. */
  price: number;

  /** The string that identifies the product to the Apple App Store. */
  productIdentifier: string;

  /** The identifier of the subscription group to which the subscription belongs. */
  subscriptionGroupIdentifier: string;

  /** The period details for products that are subscriptions. */
  subscriptionPeriod?: ElectronProductSubscriptionPeriod;
}
