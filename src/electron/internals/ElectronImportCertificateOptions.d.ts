/**
 * Options for importing a certificate into the platform certificate store.
 *
 * @public
 * @unofficial
 */
export interface ElectronImportCertificateOptions {
  /** Path for the pkcs12 file. */
  certificate: string;

  /** Passphrase for the certificate. */
  password: string;
}
