import type { Pointer } from './Pointer.d.ts';

/** @public */
export interface Bezier {
    cp1: Pointer;
    cp2: Pointer;
    from: Pointer;
    path: string;
    to: Pointer;
}
