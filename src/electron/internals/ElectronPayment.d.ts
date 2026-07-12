import type { ElectronPaymentDiscount } from './ElectronPaymentDiscount.d.ts';

/**
 * A payment in the Mac App Store payment queue.
 *
 * @public
 * @unofficial
 */
export interface ElectronPayment {
  /** An opaque identifier for the user's account on your system. */
  applicationUsername: string;

  /** The details of the discount offer to apply to the payment. */
  paymentDiscount?: ElectronPaymentDiscount;

  /** The identifier of the purchased product. */
  productIdentifier: string;

  /** The quantity purchased. */
  quantity: number;
}
