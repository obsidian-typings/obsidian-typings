export {};

declare global {
    interface DomElementInfo {
        /** @unofficial */
        [eventName: `on${string}`]: EventListenerOrEventListenerObject;
    }
}
