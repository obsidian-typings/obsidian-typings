import type { ElectronCertificate } from './ElectronCertificate.d.ts';

/**
 * A certificate verification request passed to a certificate verify proc.
 *
 * @public
 * @unofficial
 */
export interface ElectronRequest {
  /** The certificate presented by the server. */
  certificate: ElectronCertificate;

  /** The error code. */
  errorCode: number;

  /** The host name being verified. */
  hostname: string;

  /** Whether Chromium recognises the root CA as a standard root. */
  isIssuedByKnownRoot: boolean;

  /** The certificate as validated by Chromium. */
  validatedCertificate: ElectronCertificate;

  /** `OK` if the certificate is trusted, otherwise an error like `CERT_REVOKED`. */
  verificationResult: string;
}
