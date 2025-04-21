export {};

declare module 'obsidian' {
    /**
     * The response from the {@link requestUrl} function.
     */
    interface RequestUrlResponse {
        /**
         * The body of the response as an ArrayBuffer.
         *
         * @official
         */
        arrayBuffer: ArrayBuffer;

        /**
         * The headers of the response.
         *
         * @example
         * ```ts
         * { 'Content-Type': 'application/json' }
         * ```
         * @official
         */
        headers: Record<string, string>;

        /**
         * The body of the response as a JSON object.
         *
         * @official
         */
        json: any;

        /**
         * The status code of the response.
         *
         * @example 200
         * @official
         */
        status: number;

        /**
         * The body of the response as a string.
         *
         * @official
         */
        text: string;
    }
}
