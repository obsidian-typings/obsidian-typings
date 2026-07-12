/**
 * Principal (subject or issuer) of an Electron certificate.
 *
 * @public
 * @unofficial
 */
export interface ElectronCertificatePrincipal {
  /** Common Name. */
  commonName: string;

  /** Country or region. */
  country: string;

  /** Locality. */
  locality: string;

  /** Organization names. */
  organizations: string[];

  /** Organization Unit names. */
  organizationUnits: string[];

  /** State or province. */
  state: string;
}
