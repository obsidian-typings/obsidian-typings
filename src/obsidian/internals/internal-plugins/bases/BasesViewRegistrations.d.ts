import type { BasesViewRegistration } from 'obsidian';

import type { BasesTableViewRegistration } from './BasesTableView/BasesTableViewRegistration.d.ts';

/**
 * The Bases view registrations, keyed by view type: the four built-in ones, plus any a plugin added with
 * {@link obsidian#Plugin.registerBasesView}.
 *
 * @public
 * @unofficial
 */
export interface BasesViewRegistrations extends Record<string, BasesViewRegistration> {
  /** The `cards` view registration. */
  cards: BasesViewRegistration;

  /** The `kanban` view registration. */
  kanban: BasesViewRegistration;

  /** The `list` view registration. */
  list: BasesViewRegistration;

  /** The `table` view registration. */
  table: BasesTableViewRegistration;
}
