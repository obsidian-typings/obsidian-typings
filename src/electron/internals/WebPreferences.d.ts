import type { ElectronDefaultFontFamily } from './ElectronDefaultFontFamily.d.ts';
import type { Session } from './Session.d.ts';

/**
 * Web preferences for configuring Electron web content behavior.
 *
 * @public
 * @unofficial
 */
export interface WebPreferences {
  /**
   * An alternative title string provided only to accessibility tools such as screen readers. This string is not
   * directly visible to users.
   */
  accessibleTitle?: string;

  /**
   * A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for
   * passing small bits of data down to renderer process preload scripts.
   */
  additionalArguments?: string[];

  /**
   * Allow an https page to run JavaScript, CSS or plugins from http URLs.
   *
   * @default `false`
   */
  allowRunningInsecureContent?: boolean;

  /**
   * Autoplay policy to apply to content in the window.
   *
   * @default `no-user-gesture-required`
   */
  autoplayPolicy?: 'document-user-activation-required' | 'no-user-gesture-required' | 'user-gesture-required';

  /**
   * Whether to throttle animations and timers when the page becomes background. This also affects the Page
   * Visibility API.
   *
   * @default `true`
   */
  backgroundThrottling?: boolean;

  /**
   * Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context.
   *
   * @default `true`
   */
  contextIsolation?: boolean;

  /**
   * The default text encoding.
   *
   * @default `ISO-8859-1`
   */
  defaultEncoding?: string;

  /** Sets the default font for the font-family. */
  defaultFontFamily?: ElectronDefaultFontFamily;

  /**
   * The default font size in pixels.
   *
   * @default `16`
   */
  defaultFontSize?: number;

  /**
   * The default monospace font size in pixels.
   *
   * @default `13`
   */
  defaultMonospaceFontSize?: number;

  /**
   * Whether to enable DevTools. If it is set to `false`, `BrowserWindow.webContents.openDevTools()` cannot be used
   * to open DevTools.
   *
   * @default `true`
   */
  devTools?: boolean;

  /**
   * A list of feature strings separated by `,` to disable. The full list of supported feature strings can be found
   * in the RuntimeEnabledFeatures.json5 file.
   */
  disableBlinkFeatures?: string;

  /**
   * Whether to disable dialogs completely. Overrides `safeDialogs`.
   *
   * @default `false`
   */
  disableDialogs?: boolean;

  /**
   * Whether to prevent the window from resizing when entering HTML Fullscreen.
   *
   * @default `false`
   */
  disableHtmlFullscreenWindowResize?: boolean;

  /**
   * A list of feature strings separated by `,` to enable. The full list of supported feature strings can be found
   * in the RuntimeEnabledFeatures.json5 file.
   */
  enableBlinkFeatures?: string;

  /**
   * Whether to enable preferred size mode. Enabling this causes the `preferred-size-changed` event to be emitted on
   * the `WebContents` when the preferred size changes.
   *
   * @default `false`
   */
  enablePreferredSizeMode?: boolean;

  /**
   * Whether to enable the WebSQL api.
   *
   * @default `true`
   */
  enableWebSQL?: boolean;

  /**
   * Enables Chromium's experimental features.
   *
   * @default `false`
   */
  experimentalFeatures?: boolean;

  /**
   * Specifies how to run image animations (e.g. GIFs).
   *
   * @default `animate`
   */
  imageAnimationPolicy?: 'animate' | 'animateOnce' | 'noAnimation';

  /**
   * Enables image support.
   *
   * @default `true`
   */
  images?: boolean;

  /**
   * Enables JavaScript support.
   *
   * @default `true`
   */
  javascript?: boolean;

  /**
   * The minimum font size in pixels.
   *
   * @default `0`
   */
  minimumFontSize?: number;

  /**
   * Whether dragging and dropping a file or link onto the page causes a navigation.
   *
   * @default `false`
   */
  navigateOnDragDrop?: boolean;

  /**
   * Whether node integration is enabled.
   *
   * @default `false`
   */
  nodeIntegration?: boolean;

  /**
   * Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All preloads
   * will load for every iframe; `process.isMainFrame` can be used to determine if in the main frame or not.
   */
  nodeIntegrationInSubFrames?: boolean;

  /**
   * Whether node integration is enabled in web workers.
   *
   * @default `false`
   */
  nodeIntegrationInWorker?: boolean;

  /**
   * Whether to enable offscreen rendering for the browser window.
   *
   * @default `false`
   */
  offscreen?: boolean;

  /**
   * Sets the session used by the page according to the session's partition string. If `partition` starts with
   * `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`.
   * If there is no `persist:` prefix, the page will use an in-memory session.
   */
  partition?: string;

  /**
   * Whether plugins should be enabled.
   *
   * @default `false`
   */
  plugins?: boolean;

  /**
   * Specifies a script that will be loaded before other scripts run in the page. The value should be the absolute
   * file path to the script.
   */
  preload?: string;

  /**
   * Whether to enable browser style consecutive dialog protection.
   *
   * @default `false`
   */
  safeDialogs?: boolean;

  /**
   * The message to display when consecutive dialog protection is triggered. If not defined the default message
   * would be used.
   */
  safeDialogsMessage?: string;

  /**
   * If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium
   * OS-level sandbox and disabling the Node.js engine.
   */
  sandbox?: boolean;

  /**
   * Enables scroll bounce (rubber banding) effect on macOS.
   *
   * @default `false`
   */
  scrollBounce?: boolean;

  /**
   * Sets the session used by the page. When both `session` and `partition` are provided, `session` will be
   * preferred.
   */
  session?: Session;

  /**
   * Whether to enable the builtin spellchecker.
   *
   * @default `true`
   */
  spellcheck?: boolean;

  /**
   * Make TextArea elements resizable.
   *
   * @default `true`
   */
  textAreasAreResizable?: boolean;

  /** Enforces the v8 code caching policy used by blink. */
  v8CacheOptions?: 'bypassHeatCheck' | 'bypassHeatCheckAndEagerCompile' | 'code' | 'none';

  /**
   * Enables WebGL support.
   *
   * @default `true`
   */
  webgl?: boolean;

  /**
   * When `false`, it will disable the same-origin policy, and set `allowRunningInsecureContent` to `true` if this
   * option has not been set by the user.
   *
   * @default `true`
   */
  webSecurity?: boolean;

  /**
   * Whether to enable the `<webview>` tag.
   *
   * @default `false`
   */
  webviewTag?: boolean;

  /**
   * The default zoom factor of the page, `3.0` represents `300%`.
   *
   * @default `1.0`
   */
  zoomFactor?: number;
}
