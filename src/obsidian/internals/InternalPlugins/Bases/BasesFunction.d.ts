import type { App } from 'obsidian';
import type { BasesFunctionArg } from './BasesFunctionArg.d.ts';

/**
 * Bases function.
 *
 * @public
 * @unofficial
 */
export interface BasesFunction {
    /**
     * An Obsidian app instance.
     */
    app: App;

    /**
     * The arguments.
     */
    args: BasesFunctionArg[];

    /**
     * Whether the function is an operator.
     */
    isOperator: boolean;

    /**
     * The name of the function.
     */
    name: string;

    /**
     * The return type of the function.
     */
    returnType: string;

    /**
     * Applies the function.
     */
    apply(...args: unknown[]): unknown;

    /**
     * Serializes the function.
     */
    serialize(...args: unknown[]): string;
}
