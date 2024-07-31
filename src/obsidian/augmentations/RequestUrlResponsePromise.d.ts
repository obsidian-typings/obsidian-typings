export {};

declare module "obsidian" {
    interface RequestUrlResponsePromise extends Promise<RequestUrlResponse> {}
}
