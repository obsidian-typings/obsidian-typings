/**
 * The period details for products that are subscriptions.
 *
 * @public
 * @unofficial
 */
export interface ElectronProductSubscriptionPeriod {
  /** The number of units per subscription period. */
  numberOfUnits: number;

  /** The increment of time that a subscription period is specified in. Can be `day`, `month`, `week` or `year`. */
  unit: 'day' | 'month' | 'week' | 'year';
}
