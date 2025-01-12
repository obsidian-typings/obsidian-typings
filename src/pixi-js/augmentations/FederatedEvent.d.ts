import type { PixiTouch } from 'pixi.js';

export {};

declare module 'pixi.js' {
    interface FederatedEvent<N extends UIEvent | PixiTouch = UIEvent | PixiTouch> extends UIEvent {}
}
