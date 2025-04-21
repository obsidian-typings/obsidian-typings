export {};

declare module 'obsidian' {
    /**
     * The promise of the {@link requestUrl} function.
     */
    interface RequestUrlResponsePromise extends Promise<RequestUrlResponse> {
        /**
         * The promise that resolves to the body of the response as an {@link ArrayBuffer}.
         *
         * @official
         */
        arrayBuffer: Promise<ArrayBuffer>;

        /**
         * The promise that resolves to the body of the response as a JSON object.
         *
         * @official
         */
        json: Promise<any>;

        /**
         * The promise that resolves to the body of the response as a string.
         *
         * @official
         */
        text: Promise<string>;
    }
}
