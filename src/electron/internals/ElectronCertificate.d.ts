import type { ElectronCertificatePrincipal } from './ElectronCertificatePrincipal.d.ts';

/**
 * An Electron certificate.
 *
 * @public
 * @unofficial
 */
export interface ElectronCertificate {
  /** PEM encoded data. */
  data: string;

  /** Fingerprint of the certificate. */
  fingerprint: string;

  /** Issuer principal. */
  issuer: ElectronCertificatePrincipal;

  /** Issuer certificate (if not self-signed). */
  issuerCert: ElectronCertificate;

  /** Issuer's Common Name. */
  issuerName: string;

  /** Hex value represented string. */
  serialNumber: string;

  /** Subject principal. */
  subject: ElectronCertificatePrincipal;

  /** Subject's Common Name. */
  subjectName: string;

  /** End date of the certificate being valid in seconds. */
  validExpiry: number;

  /** Start date of the certificate being valid in seconds. */
  validStart: number;
}
