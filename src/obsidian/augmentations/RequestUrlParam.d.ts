export {};

declare module 'obsidian' {
    /**
     * The parameters for the {@link requestUrl} function.
     */
    interface RequestUrlParam {
        /**
         * The body of the request.
         *
         * @example
         * ```ts
         * 'foo'
         * new Uint8Array([1, 2, 3]).buffer
         * ```
         * @official
         */
        body?: string | ArrayBuffer;

        /**
         * The content type of the request.
         *
         * @example application/json
         * @official
         */
        contentType?: string;

        /**
         * The headers of the request.
         *
         * @example
         * ```ts
         * { 'Content-Type': 'application/json' }
         * ```
         * @official
         */
        headers?: Record<string, string>;

        /**
         * The method to use for the request.
         *
         * @example GET
         * @example POST
         * @official
         */
        method?: string;

        /**
         * Whether to throw an error when the status code is 400+.
         * Defaults to `true`.
         *
         * @official
         */
        throw?: boolean;

        /**
         * The URL to request.
         *
         * @example https://google.com
         * @official
         */
        url: string;
    }
}
