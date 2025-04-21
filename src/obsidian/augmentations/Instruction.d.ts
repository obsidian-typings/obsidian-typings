export {};

declare module 'obsidian' {
    /**
     * An instruction for the modal.
     *
     * @example
     * ```ts
     * const instruction: Instruction = { command: '↑↓', purpose: 'Navigate' };
     * ```
     */
    interface Instruction {
        /**
         * The command or the key combination.
         *
         * @example
         * ```ts
         * console.log(instruction.command); // ↑↓
         * ```
         * @official
         */
        command: string;

        /**
         * The purpose of the command.
         *
         * @example
         * ```ts
         * console.log(instruction.purpose); // Navigate
         * ```
         * @official
         */
        purpose: string;
    }
}
