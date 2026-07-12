import type { ElectronProductSubscriptionPeriod } from './ElectronProductSubscriptionPeriod.d.ts';

/**
 * A discount offer for a product in the Mac App Store.
 *
 * @public
 * @unofficial
 */
export interface ElectronProductDiscount {
  /** A string used to uniquely identify a discount offer for a product. */
  identifier: string;

  /** An integer that indicates the number of periods the product discount is available. */
  numberOfPeriods: number;

  /** The payment mode for this product discount. Can be `freeTrial`, `payAsYouGo` or `payUpFront`. */
  paymentMode: 'freeTrial' | 'payAsYouGo' | 'payUpFront';

  /** The discount price of the product in the local currency. */
  price: number;

  /** The locale used to format the discount price of the product. */
  priceLocale: string;

  /** An object that defines the period for the product discount. */
  subscriptionPeriod?: ElectronProductSubscriptionPeriod;

  /** The type of discount offer. */
  type: number;
}
