/**
 * Selects installed Electron declarations only when the explicit integration is loaded.
 *
 * @public
 * @unofficial
 */
export type ElectronInterop<Name extends string, Standalone> = Name extends keyof ObsidianElectronTypes ? ObsidianElectronTypes[Name] : Standalone;
