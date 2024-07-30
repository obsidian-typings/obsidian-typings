export {};

declare module "obsidian" {
    interface TFile {
        /**
         * Whether the file is being saved
         */
        saving: boolean;
    }
}
