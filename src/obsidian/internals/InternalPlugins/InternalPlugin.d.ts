import type {
    App,
    Command,
    Component,
    Debouncer,
    IconName,
    Plugin,
    PluginSettingTab,
    ViewCreator
} from 'obsidian';
import type { MobileFileInfo } from '../MobileFileInfo.d.ts';
import type { InternalPlugins } from './InternalPlugins.d.ts';
import type { RibbonItem } from './RibbonItem.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface InternalPlugin<InternalPluginInstance> extends Component {
    /** @todo Documentation incomplete. */
    addedButtonEls: HTMLDivElement[];

    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    commands: Command[];

    /** @todo Documentation incomplete. */
    enabled: boolean;

    /** @todo Documentation incomplete. */
    hasStatusBarItem: boolean;

    /** @todo Documentation incomplete. */
    instance: InternalPluginInstance;

    /** @todo Documentation incomplete. */
    lastSave: number;

    /** @todo Documentation incomplete. */
    manager: InternalPlugins;

    /** @todo Documentation incomplete. */
    mobileFileInfo: MobileFileInfo[];

    /** @todo Documentation incomplete. */
    onConfigFileChange: Debouncer<[], Promise<void>>;

    /** @todo Documentation incomplete. */
    ribbonItems: RibbonItem[];

    /** @todo Documentation incomplete. */
    statusBarEl: HTMLDivElement | null;

    /** @todo Documentation incomplete. */
    views: Record<string, ViewCreator>;

    /** @todo Documentation incomplete. */
    addSettingTab(settingTab: PluginSettingTab): void;

    /** @todo Documentation incomplete. */
    deleteData(): Promise<void>;

    /** @todo Documentation incomplete. */
    disable(isDisabledByUser?: boolean): void;

    /** @todo Documentation incomplete. */
    enable(isEnabledByUser?: boolean): Promise<void>;

    /** @todo Documentation incomplete. */
    getModifiedTime(): Promise<number | undefined>;

    /** @todo Documentation incomplete. */
    handleConfigFileChange(): Promise<void>;

    /** @todo Documentation incomplete. */
    init(): void;

    /** @todo Documentation incomplete. */
    loadData(): Promise<object | null>;

    /** @todo Documentation incomplete. */
    registerGlobalCommand(command: Command): void;

    /** @todo Documentation incomplete. */
    registerMobileFileInfo(renderCallback: (el: HTMLElement) => void): void;

    /** @todo Documentation incomplete. */
    registerRibbonItem(title: string, icon: IconName, callback: () => Promise<void>): void;

    /** @todo Documentation incomplete. */
    registerStatusBarItem(): void;

    /** @todo Documentation incomplete. */
    registerViewType(type: string, creator: ViewCreator): void;

    /** @todo Documentation incomplete. */
    saveData(data: object): Promise<void>;
}
