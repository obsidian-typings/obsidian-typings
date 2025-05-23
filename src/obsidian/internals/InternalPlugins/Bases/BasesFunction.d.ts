import type { App } from 'obsidian';
import type { BasesFunctionArg } from './BasesFunctionArg.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface BasesFunction {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    args: BasesFunctionArg[];

    /**
     * @todo Documentation incomplete.
     */
    isOperator: boolean;

    /**
     * @todo Documentation incomplete.
     */
    name: string;

    /**
     * @todo Documentation incomplete.
     */
    returnType: string;

    /**
     * @todo Documentation incomplete.
     */
    apply(...args: unknown[]): unknown;

    /** @todo Documentation incomplete */
    serialize(...args: unknown[]): string;
}
