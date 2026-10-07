import type {
  BasesViewRegistration,
  QueryController
} from 'obsidian';

import type { BasesTableView } from './BasesTableView.d.ts';

/**
 * The {@link obsidian#BasesViewRegistration} the `Bases` plugin registers for the `table` view type.
 *
 * @public
 * @unofficial
 */
export interface BasesTableViewRegistration extends BasesViewRegistration {
  /**
   * Creates the table view.
   *
   * @param controller - The query controller of the base the view renders.
   * @param containerEl - The element to render the view into.
   * @returns The table view.
   */
  factory(controller: QueryController, containerEl: HTMLElement): BasesTableView;
}
