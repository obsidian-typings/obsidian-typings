export {};

declare module "obsidian" {
    interface TFile extends TAbstractFile {
        /**
         * Whether the file is being saved
         */
        saving: boolean;
    }
}
