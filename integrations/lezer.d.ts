import type { ParseContext } from '@codemirror/language';
import type { SearchQuery } from '@codemirror/search';
import type {
  NodeProp,
  Tree
} from '@lezer/common';

export {};

declare global {
  /**
   * Upstream Lezer and CodeMirror language/search types selected only by the explicit integration import.
   *
   * @unofficial
   */
  interface ObsidianLezerTypes {
    /** Upstream parse context. */
    ParseContext: ParseContext;
    /** Upstream search query. */
    SearchQuery: SearchQuery;
    /** Upstream string node prop. */
    StringNodeProp: NodeProp<string>;
    /** Upstream syntax tree. */
    Tree: Tree;
  }
}
