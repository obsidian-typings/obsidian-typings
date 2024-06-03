export default interface DomElementInfo {
    [eventName: `on${string}`]: EventListenerOrEventListenerObject;
}
