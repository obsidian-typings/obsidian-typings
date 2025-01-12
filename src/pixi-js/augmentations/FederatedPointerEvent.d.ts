export {};

declare module 'pixi.js' {
    interface FederatedPointerEvent {
        altitudeAngle: number;
        azimuthAngle: number;
    }
}
