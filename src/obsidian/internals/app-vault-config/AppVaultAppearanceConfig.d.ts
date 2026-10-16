import type { AppVaultConfig } from './AppVaultConfig.d.ts';

/**
 * The contents of the `appearance.json` config file.
 *
 * `Vault.saveConfig` writes these keys of {@link AppVaultConfig} to `appearance.json` and every other key to
 * `app.json`, and only a key whose value was changed from its default is present in either file.
 *
 * @public
 * @unofficial
 */
export type AppVaultAppearanceConfig = Partial<
  Pick<
    AppVaultConfig,
    | 'accentColor'
    | 'autoFullScreen'
    | 'baseFontSize'
    | 'baseFontSizeAction'
    | 'cssTheme'
    | 'enabledCssSnippets'
    | 'floatingNavigation'
    | 'interfaceFontFamily'
    | 'monospaceFontFamily'
    | 'nativeMenus'
    | 'showRibbon'
    | 'showViewHeader'
    | 'slidingSidebar'
    | 'textFontFamily'
    | 'theme'
    | 'translucency'
  >
>;
