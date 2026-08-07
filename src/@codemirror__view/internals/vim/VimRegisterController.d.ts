import type { VimRegister } from './VimRegister.d.ts';

/**
 * Owns every Vim register and routes yanks, deletes and pastes to the right one.
 *
 * @public
 * @unofficial
 */
export interface VimRegisterController {
  /**
   * Every register, keyed by its one-character name.
   */
  registers: Record<string, VimRegister>;

  /**
   * The register used when no register was named explicitly.
   */
  unnamedRegister: VimRegister;

  /**
   * Get the register with the given name, creating it if it does not exist yet. An invalid name yields
   * the unnamed register.
   *
   * @param name - The one-character register name.
   * @returns The named register, or the unnamed register if the name is not valid.
   */
  getRegister(name?: string): VimRegister;

  /**
   * Check whether the given name identifies a register.
   *
   * @param name - The candidate register name.
   * @returns Whether the name identifies a register.
   */
  isValidRegister(name: unknown): name is string;

  /**
   * Store text into a register on behalf of an operator, also updating the unnamed and numbered
   * registers the way Vim does.
   *
   * @param registerName - The register to write to, or `null` or `undefined` for the unnamed register.
   * @param operator - The operator the text came from, which decides how the numbered registers shift.
   * @param text - The text to store.
   * @param linewise - Whether the text is linewise.
   * @param blockwise - Whether the text is blockwise.
   */
  pushText(
    registerName: null | string | undefined,
    operator: string,
    text: string,
    linewise?: boolean,
    blockwise?: boolean
  ): void;

  /**
   * Shift the numbered registers up by one, so register `1` becomes `2` and so on.
   */
  shiftNumericRegisters_(): void;
}
