import type { App } from 'obsidian';

import { Component } from 'obsidian';

import type { BasesQueryConstructor } from '../../../../../internals/constructors/BasesQueryConstructor.d.ts';

import { getBasesControllerFromRender } from '../../../../functions/getBasesControllerFromRender.ts';

/**
 * Get the {@link BasesQuery} constructor (the `.base` parser, exposing the static `fromString`).
 *
 * `BasesQuery` has no public `obsidian` export and no leaf-free factory, so the class is harvested at
 * runtime: a throwaway base is rendered off-screen (via {@link getBasesControllerFromRender}) and the
 * constructor is read off the resulting query. The throwaway render is torn down before returning.
 *
 * @param app - The app instance.
 * @returns The {@link BasesQuery} constructor.
 *
 * @public
 * @unofficial
 */
export async function getBasesQueryConstructor(app: App): Promise<BasesQueryConstructor> {
  const component = new Component();
  try {
    const controller = await getBasesControllerFromRender(app, 'views: []\n', 'getBasesQueryConstructor.base', component);
    const query = controller.query;
    if (!query) {
      throw new Error('The rendered base did not produce a query.');
    }
    return query.constructor as unknown as BasesQueryConstructor;
  } finally {
    component.unload();
  }
}
