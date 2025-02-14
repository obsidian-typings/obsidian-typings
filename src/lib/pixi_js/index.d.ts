export { };

declare module 'pixi.js' {
    interface FederatedEvent<N extends UIEvent> extends UIEvent { }
    interface FederatedPointerEvent {
        altitudeAngle: number;
        azimuthAngle: number;
    }
}
