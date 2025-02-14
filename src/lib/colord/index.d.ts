import type {
    HslaColor as HslaColor_,
    HslColor as HslColor_,
    HsvaColor as HsvaColor_,
    HsvColor as HsvColor_,
    RgbaColor as RgbaColor_,
    RgbColor as RgbColor_
} from 'colord';

declare module 'colord/types' {
    interface HslaColor extends HslaColor_ { }
    interface HslColor extends HslColor_ { }
    interface HsvaColor extends HsvaColor_ { }
    interface HsvColor extends HsvColor_ { }
    interface RgbaColor extends RgbaColor_ { }
    interface RgbColor extends RgbColor_ { }
}
