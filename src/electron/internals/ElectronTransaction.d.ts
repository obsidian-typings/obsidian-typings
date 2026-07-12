import type { ElectronPayment } from './ElectronPayment.d.ts';

/**
 * A transaction in the Mac App Store payment queue.
 *
 * @public
 * @unofficial
 */
export interface ElectronTransaction {
  /** The error code if an error occurred while processing the transaction. */
  errorCode: number;

  /** The error message if an error occurred while processing the transaction. */
  errorMessage: string;

  /** The identifier of the restored transaction by the App Store. */
  originalTransactionIdentifier: string;

  /** The payment associated with the transaction. */
  payment: ElectronPayment;

  /** The date the transaction was added to the App Store's payment queue. */
  transactionDate: string;

  /** A string that uniquely identifies a successful payment transaction. */
  transactionIdentifier: string;

  /** The transaction state. Can be `deferred`, `failed`, `purchased`, `purchasing` or `restored`. */
  transactionState: 'deferred' | 'failed' | 'purchased' | 'purchasing' | 'restored';
}
