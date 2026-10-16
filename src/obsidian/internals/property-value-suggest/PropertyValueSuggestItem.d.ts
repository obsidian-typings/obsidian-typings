import type { PropertyValueSuggestLinkItem } from './PropertyValueSuggestLinkItem.d.ts';
import type { PropertyValueSuggestTextItem } from './PropertyValueSuggestTextItem.d.ts';

/**
 * An item of the property-value suggest, discriminated by `type`.
 *
 * @public
 * @unofficial
 */
export type PropertyValueSuggestItem = PropertyValueSuggestLinkItem | PropertyValueSuggestTextItem;
