export {};

declare global {
    /**
     * Options for an {@link ajax} request.
     */
    interface AjaxOptions {
        /**
         * The data of the AJAX request.
         * @official
         */
        data?: object | string | ArrayBuffer;

        /**
         * The error callback of the AJAX request.
         * @official
         */
        error?: (error: any, req: XMLHttpRequest) => any;

        /**
         * The headers of the AJAX request.
         * @official
         */
        headers?: Record<string, string>;

        /**
         * The method of the AJAX request.
         * @official
         */
        method?: 'GET' | 'POST';

        /**
         * The XMLHttpRequest object.
         * @official
         */
        req?: XMLHttpRequest;

        /**
         * The success callback of the AJAX request.
         * @official
         */
        success?: (response: any, req: XMLHttpRequest) => any;

        /**
         * The URL of the AJAX request.
         * @official
         */
        url: string;

        /**
         * Whether to send credentials with the AJAX request.
         * @official
         */
        withCredentials?: boolean;
    }
}
