import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { AllPropertiesView } from '../../../../internals/internal-plugins/properties/AllPropertiesView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the AllPropertiesView constructor.
 *
 * @param app - The app.
 * @returns The AllPropertiesView constructor.
 *
 * @public
 * @unofficial
 */
export function getAllPropertiesViewConstructor(app: App): ExtractConstructor<AllPropertiesView> {
    return getViewConstructorByViewType(app, ViewType.AllProperties);
}
