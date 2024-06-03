export { };

declare global {
    interface DomElementInfo {
        [eventName: `on${string}`]: EventListenerOrEventListenerObject;
    }
}
