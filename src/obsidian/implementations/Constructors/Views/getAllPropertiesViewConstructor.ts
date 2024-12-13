import type { App } from 'obsidian';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';
import type { AllPropertiesView } from '../../../internals/InternalPlugins/Properties/AllPropertiesView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the AllPropertiesView constructor.
 *
 * @returns The AllPropertiesView constructor.
 */
export function getAllPropertiesViewConstructor(app: App): TypedViewConstructor<AllPropertiesView> {
    return getViewConstructorByViewType(app, ViewType.AllProperties) as TypedViewConstructor<AllPropertiesView>;
}
