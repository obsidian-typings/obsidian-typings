import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronProduct } from './ElectronProduct.d.ts';
import type { ElectronTransaction } from './ElectronTransaction.d.ts';

/**
 * In-app purchases on the Mac App Store.
 *
 * @public
 * @unofficial
 */
export interface ElectronInAppPurchase {
  /**
   * Adds a listener for the `transactions-updated` event.
   *
   * Emitted when one or more transactions have been updated.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronInAppPurchase` instance.
   */
  addListener(event: 'transactions-updated', listener: (event: ElectronEvent, transactions: ElectronTransaction[]) => void): this;

  /**
   * Returns whether a user can make a payment.
   *
   * @returns Whether a user can make a payment.
   */
  canMakePayments(): boolean;

  /** Completes all pending transactions. */
  finishAllTransactions(): void;

  /**
   * Completes the pending transactions corresponding to the date.
   *
   * @param date - The date of the transactions to finish.
   */
  finishTransactionByDate(date: string): void;

  /**
   * Retrieves the product descriptions.
   *
   * @param productIDs - The identifiers of the products to retrieve.
   * @returns A promise that resolves with an array of `ElectronProduct` objects.
   */
  getProducts(productIDs: string[]): Promise<ElectronProduct[]>;

  /**
   * Returns the path to the receipt.
   *
   * @returns The path to the receipt.
   */
  getReceiptURL(): string;

  /**
   * Registers a listener for the `transactions-updated` event.
   *
   * Emitted when one or more transactions have been updated.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronInAppPurchase` instance.
   */
  on(event: 'transactions-updated', listener: (event: ElectronEvent, transactions: ElectronTransaction[]) => void): this;

  /**
   * Registers a one-time listener for the `transactions-updated` event.
   *
   * Emitted when one or more transactions have been updated.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronInAppPurchase` instance.
   */
  once(event: 'transactions-updated', listener: (event: ElectronEvent, transactions: ElectronTransaction[]) => void): this;

  /**
   * Adds the specified product to the payment queue. You should listen for the `transactions-updated` event as soon as
   * possible and certainly before you call `purchaseProduct`.
   *
   * @param productID - The identifier of the product to purchase.
   * @param quantity - The number of items the user wants to purchase.
   * @returns A promise that resolves with `true` if the product is valid and added to the payment queue.
   */
  purchaseProduct(productID: string, quantity?: number): Promise<boolean>;

  /**
   * Removes a previously added listener for the `transactions-updated` event.
   *
   * Emitted when one or more transactions have been updated.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronInAppPurchase` instance.
   */
  removeListener(event: 'transactions-updated', listener: (event: ElectronEvent, transactions: ElectronTransaction[]) => void): this;

  /**
   * Restores finished transactions. This method can be called either to install purchases on additional devices, or to
   * restore purchases for an application that the user deleted and reinstalled.
   *
   * The payment queue delivers a new transaction for each previously completed transaction that can be restored. Each
   * transaction includes a copy of the original transaction.
   */
  restoreCompletedTransactions(): void;
}
