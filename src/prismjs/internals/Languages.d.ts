import type { LanguageMap } from './LanguageMap.d.ts';
import type { LanguageMapProtocol } from './LanguageMapProtocol.d.ts';

/**
 * The Prism languages registry, combining the language map with protocol methods.
 *
 * @public
 * @unofficial
 */
export type Languages = LanguageMap & LanguageMapProtocol;
