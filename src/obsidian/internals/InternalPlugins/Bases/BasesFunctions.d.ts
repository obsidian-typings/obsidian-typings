import type { AbsFunction } from './Functions/AbsFunction.d.ts';
import type { CeilFunction } from './Functions/CeilFunction.d.ts';
import type { ConcatFunction } from './Functions/ConcatFunction.d.ts';
import type { ContainsAllFunction } from './Functions/ContainsAllFunction.d.ts';
import type { ContainsAnyFunction } from './Functions/ContainsAnyFunction.d.ts';
import type { ContainsFunction } from './Functions/ContainsFunction.d.ts';
import type { ContainsNoneFunction } from './Functions/ContainsNoneFunction.d.ts';
import type { DateAfterFunction } from './Functions/DateAfterFunction.d.ts';
import type { DateBeforeFunction } from './Functions/DateBeforeFunction.d.ts';
import type { DateDiffFunction } from './Functions/DateDiffFunction.d.ts';
import type { DateEqualsFunction } from './Functions/DateEqualsFunction.d.ts';
import type { DateModifyFunction } from './Functions/DateModifyFunction.d.ts';
import type { DateNotEqualsFunction } from './Functions/DateNotEqualsFunction.d.ts';
import type { DateOnOrAfterFunction } from './Functions/DateOnOrAfterFunction.d.ts';
import type { DateOnOrBeforeFunction } from './Functions/DateOnOrBeforeFunction.d.ts';
import type { DayFunction } from './Functions/DayFunction.d.ts';
import type { EmptyFunction } from './Functions/EmptyFunction.d.ts';
import type { EqualFunction } from './Functions/EqualFunction.d.ts';
import type { FlatFunction } from './Functions/FlatFunction.d.ts';
import type { FloorFunction } from './Functions/FloorFunction.d.ts';
import type { GreaterFunction } from './Functions/GreaterFunction.d.ts';
import type { GreaterOrEqualFunction } from './Functions/GreaterOrEqualFunction.d.ts';
import type { HourFunction } from './Functions/HourFunction.d.ts';
import type { IfFunction } from './Functions/IfFunction.d.ts';
import type { IndexFunction } from './Functions/IndexFunction.d.ts';
import type { InFolderFunction } from './Functions/InFolderFunction.d.ts';
import type { JoinFunction } from './Functions/JoinFunction.d.ts';
import type { LenFunction } from './Functions/LenFunction.d.ts';
import type { LessFunction } from './Functions/LessFunction.d.ts';
import type { LessOrEqualFunction } from './Functions/LessOrEqualFunction.d.ts';
import type { LinksToFunction } from './Functions/LinksToFunction.d.ts';
import type { MinFunction } from './Functions/MinFunction.d.ts';
import type { MinuteFunction } from './Functions/MinuteFunction.d.ts';
import type { MonthFunction } from './Functions/MonthFunction.d.ts';
import type { NotContainsFunction } from './Functions/NotContainsFunction.d.ts';
import type { NotEmptyFunction } from './Functions/NotEmptyFunction.d.ts';
import type { NotEqualFunction } from './Functions/NotEqualFunction.d.ts';
import type { NotFunction } from './Functions/NotFunction.d.ts';
import type { NowFunction } from './Functions/NowFunction.d.ts';
import type { RoundFunction } from './Functions/RoundFunction.d.ts';
import type { SecondFunction } from './Functions/SecondFunction.d.ts';
import type { SliceFunction } from './Functions/SliceFunction.d.ts';
import type { TaggedWithFunction } from './Functions/TaggedWithFunction.d.ts';
import type { TitleFunction } from './Functions/TitleFunction.d.ts';
import type { TrimFunction } from './Functions/TrimFunction.d.ts';
import type { UniqueFunction } from './Functions/UniqueFunction.d.ts';
import type { YearFunction } from './Functions/YearFunction.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface BasesFunctions {
    /**
     * @todo Documentation incomplete.
     */
    '!=': NotEqualFunction;

    /**
     * @todo Documentation incomplete.
     */
    '<': LessFunction;

    /**
     * @todo Documentation incomplete.
     */
    '<=': LessOrEqualFunction;

    /**
     * @todo Documentation incomplete.
     */
    '==': EqualFunction;

    /**
     * @todo Documentation incomplete.
     */
    '>': GreaterFunction;

    /**
     * @todo Documentation incomplete.
     */
    '>=': GreaterOrEqualFunction;

    /**
     * @todo Documentation incomplete.
     */
    abs: AbsFunction;

    /**
     * @todo Documentation incomplete.
     */
    ceil: CeilFunction;

    /**
     * @todo Documentation incomplete.
     */
    concat: ConcatFunction;

    /**
     * @todo Documentation incomplete.
     */
    contains: ContainsFunction;

    /**
     * @todo Documentation incomplete.
     */
    containsAll: ContainsAllFunction;

    /**
     * @todo Documentation incomplete.
     */
    containsAny: ContainsAnyFunction;

    /**
     * @todo Documentation incomplete.
     */
    containsNone: ContainsNoneFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateAfter: DateAfterFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateBefore: DateBeforeFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateDiff: DateDiffFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateEquals: DateEqualsFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateModify: DateModifyFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateNotEquals: DateNotEqualsFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateOnOrAfter: DateOnOrAfterFunction;

    /**
     * @todo Documentation incomplete.
     */
    dateOnOrBefore: DateOnOrBeforeFunction;

    /**
     * @todo Documentation incomplete.
     */
    day: DayFunction;

    /**
     * @todo Documentation incomplete.
     */
    empty: EmptyFunction;

    /**
     * @todo Documentation incomplete.
     */
    flat: FlatFunction;

    /**
     * @todo Documentation incomplete.
     */
    floor: FloorFunction;

    /**
     * @todo Documentation incomplete.
     */
    hour: HourFunction;

    /**
     * @todo Documentation incomplete.
     */
    if: IfFunction;

    /**
     * @todo Documentation incomplete.
     */
    index: IndexFunction;

    /**
     * @todo Documentation incomplete.
     */
    inFolder: InFolderFunction;

    /**
     * @todo Documentation incomplete.
     */
    join: JoinFunction;

    /**
     * @todo Documentation incomplete.
     */
    len: LenFunction;

    /**
     * @todo Documentation incomplete.
     */
    linksTo: LinksToFunction;

    /**
     * @todo Documentation incomplete.
     */
    min: MinFunction;

    /**
     * @todo Documentation incomplete.
     */
    minute: MinuteFunction;

    /**
     * @todo Documentation incomplete.
     */
    month: MonthFunction;

    /**
     * @todo Documentation incomplete.
     */
    not: NotFunction;

    /**
     * @todo Documentation incomplete.
     */
    notContains: NotContainsFunction;

    /**
     * @todo Documentation incomplete.
     */
    notEmpty: NotEmptyFunction;

    /**
     * @todo Documentation incomplete.
     */
    now: NowFunction;

    /**
     * @todo Documentation incomplete.
     */
    round: RoundFunction;

    /**
     * @todo Documentation incomplete.
     */
    second: SecondFunction;

    /**
     * @todo Documentation incomplete.
     */
    slice: SliceFunction;

    /**
     * @todo Documentation incomplete.
     */
    taggedWith: TaggedWithFunction;

    /**
     * @todo Documentation incomplete.
     */
    title: TitleFunction;

    /**
     * @todo Documentation incomplete.
     */
    trim: TrimFunction;

    /**
     * @todo Documentation incomplete.
     */
    unique: UniqueFunction;

    /**
     * @todo Documentation incomplete.
     */
    year: YearFunction;
}
