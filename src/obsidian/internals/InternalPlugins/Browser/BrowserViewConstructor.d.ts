import type { BrowserView } from '../../InternalPlugins/Browser/BrowserView.d.ts';
import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { BrowserPluginInstance } from './BrowserPluginInstance.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface BrowserViewConstructor
    extends TypedViewConstructor<BrowserView, [browserPluginInstance: BrowserPluginInstance]>
{}
