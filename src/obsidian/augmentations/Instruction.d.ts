export {};

declare module 'obsidian' {
    /**
     * An instruction for the modal.
     *
     * @example
     * ```ts
     * const instruction: Instruction = { command: '↑↓', purpose: 'Navigate' };
     * ```
     * @since 0.9.20
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
         * @since 0.9.20
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
         * @since 0.9.20
         */
        purpose: string;
    }
}
