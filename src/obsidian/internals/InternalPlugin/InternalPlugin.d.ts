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
import type { MobileFileInfo } from '../MobileFileInfo.js';
import type { InternalPlugins } from './InternalPlugins.js';
import type { RibbonItem } from './RibbonItem.js';

/** @todo Documentation incomplete */
/** @public */
export interface InternalPlugin<InternalPluginInstance> extends Component {
    addedButtonEls: HTMLDivElement[];
    app: App;
    commands: Command[];
    enabled: boolean;
    hasStatusBarItem: boolean;
    instance: InternalPluginInstance;
    lastSave: number;
    manager: InternalPlugins;
    mobileFileInfo: MobileFileInfo[];
    onConfigFileChange: Debouncer<[], Promise<void>>;
    ribbonItems: RibbonItem[];
    statusBarEl: HTMLDivElement | null;
    views: Record<string, ViewCreator>;

    addSettingTab(settingTab: PluginSettingTab): void;
    deleteData(): Promise<void>;
    disable(isDisabledByUser?: boolean): void;
    enable(isEnabledByUser?: boolean): Promise<void>;
    getModifiedTime(): Promise<number | undefined>;
    handleConfigFileChange(): Promise<void>;
    init(): void;
    loadData(): Promise<object | null>;
    registerGlobalCommand(command: Command): void;
    registerMobileFileInfo(renderCallback: (el: HTMLElement) => void): void;
    registerRibbonItem(title: string, icon: IconName, callback: () => Promise<void>): void;
    registerStatusBarItem(): void;
    registerViewType(type: string, creator: ViewCreator): void;
    saveData(data: object): Promise<void>;
}
