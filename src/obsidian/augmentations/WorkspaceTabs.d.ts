import type { getWorkspaceTabsConstructor } from '../implementations/constructors/augmentations/getWorkspaceTabsConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Workspace tabs.
   */
  interface WorkspaceTabs extends WorkspaceParent {
    /**
     * The index of the currently selected tab.
     *
     * @unofficial
     */
    currentTab: number;

    /**
     * Whether the tab widths are currently locked (e.g. during a drag).
     *
     * @unofficial
     */
    hasLockedTabWidths: boolean;

    /**
     * Whether the tabs are displayed in stacked mode.
     *
     * @unofficial
     */
    isStacked: boolean;

    /**
     * The parent of the tabs.
     *
     * @official
     */
    parent: WorkspaceSplit;

    /**
     * The container element for the tab headers.
     *
     * @unofficial
     */
    tabHeaderContainerEl: HTMLElement;

    /**
     * The individual tab header elements.
     *
     * @unofficial
     */
    tabHeaderEls: HTMLElement[];

    /**
     * The container element for the tab contents.
     *
     * @unofficial
     */
    tabsContainerEl: HTMLElement;

    /**
     * The inner container element for the tab headers.
     *
     * @unofficial
     */
    tabsInnerEl: HTMLElement;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getWorkspaceTabsConstructor} from `obsidian-typings/implementations`.
     *
     * @param workspace - The workspace.
     * @param id - The id.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__?(workspace: Workspace, id?: string): this;

    /**
     * Computes where a dragged tab would be inserted for a given horizontal position.
     *
     * @param x - The horizontal position, in pixels.
     * @returns The insertion location.
     * @unofficial
     */
    getTabInsertLocation(x: number): TabInsertLocation;

    /**
     * Locks the current tab widths so they do not reflow during a drag.
     *
     * @unofficial
     */
    lockTabWidths(): void;

    /**
     * Handles scrolling of the tab container in stacked mode.
     *
     * @unofficial
     */
    onContainerScroll(): void;

    /**
     * Scrolls the tab at the given index into view.
     *
     * @param index - The tab index.
     * @unofficial
     */
    scrollIntoView(index: number): void;

    /**
     * Selects the given tab.
     *
     * @param tab - The tab to select.
     * @unofficial
     */
    selectTab(tab: WorkspaceItem): void;

    /**
     * Selects the tab at the given index.
     *
     * @param index - The tab index.
     * @unofficial
     */
    selectTabIndex(index: number): void;

    /**
     * Enables or disables stacked tab display.
     *
     * @param stacked - Whether to stack the tabs.
     * @unofficial
     */
    setStacked(stacked: boolean): void;

    /**
     * Unlocks previously locked tab widths.
     *
     * @unofficial
     */
    unlockTabWidths(): void;

    /**
     * Updates the sliding-tab layout in stacked mode.
     *
     * @unofficial
     */
    updateSlidingTabs(): void;

    /**
     * Updates the displayed tab, showing the current one and hiding the rest.
     *
     * @unofficial
     */
    updateTabDisplay(): void;
  }
}
