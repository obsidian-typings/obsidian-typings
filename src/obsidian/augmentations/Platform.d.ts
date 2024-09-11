export {};

declare module 'obsidian' {
    interface Platform {
        canDisplayRibbon: boolean;
        canExportPdf: boolean;
        canPopoutWindow: boolean;
        canSplit: boolean;
        canStackTabs: boolean;
        mobileDeviceHeight: number;
        mobileKeyboardHeight: number;
        mobileSoftKeyboardVisible: boolean;
    }
}
