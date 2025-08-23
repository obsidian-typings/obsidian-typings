/**
 * Query for fuzzy search.
 *
 * @public
 * @unofficial
 */
export interface QueryForFuzzySearch {
    /** */
    /**
     * The fuzzy tokens of the query.
     */
    fuzzy: string[];

    /**
     * The query string.
     */
    query: string;

    /**
     * The tokens of the query.
     */
    tokens: string[];
}
