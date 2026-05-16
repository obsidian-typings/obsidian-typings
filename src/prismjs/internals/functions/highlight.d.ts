import type { Grammar } from '../Grammar.d.ts';

/**
 * Highlights a string of code using the given grammar.
 *
 * @param text - The code string to highlight.
 * @param grammar - The grammar to use for tokenization.
 * @param language - The language identifier.
 * @returns The highlighted HTML string.
 * @public
 * @unofficial
 */
export declare function highlight(text: string, grammar: Grammar, language: string): string;
