import type { ElectronCertificate } from './ElectronCertificate.d.ts';

/**
 * Options for Electron certificate trust dialog.
 *
 * @public
 * @unofficial
 */
export interface ElectronCertificateTrustDialogOptions {
  /** The certificate to trust/import. */
  certificate: ElectronCertificate;

  /** The message to display to the user. */
  message: string;
}
