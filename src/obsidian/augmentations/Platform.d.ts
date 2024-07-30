export {};

declare module "obsidian" {
    interface Platform {
        canExportPdf: boolean;
        canPopoutWindow: boolean;
        canSplit: boolean;
        canStackTabs: boolean;
        mobileDeviceHeight: number;
        mobileKeyboardHeight: number;
        mobileSoftKeyboardVisible: boolean;
    }
}
