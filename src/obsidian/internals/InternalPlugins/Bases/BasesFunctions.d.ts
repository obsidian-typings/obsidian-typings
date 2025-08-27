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
 * Bases functions.
 *
 * @public
 * @unofficial
 */
export interface BasesFunctions {
    /**
     * The not equal function.
     */
    '!=': NotEqualFunction;

    /**
     * The less than function.
     */
    '<': LessFunction;

    /**
     * The less than or equal to function.
     */
    '<=': LessOrEqualFunction;

    /**
     * The equal function.
     */
    '==': EqualFunction;

    /**
     * The greater than function.
     */
    '>': GreaterFunction;

    /**
     * The greater than or equal to function.
     */
    '>=': GreaterOrEqualFunction;

    /**
     * The absolute function.
     */
    abs: AbsFunction;

    /**
     * The ceiling function.
     */
    ceil: CeilFunction;

    /**
     * The concat function.
     */
    concat: ConcatFunction;

    /**
     * The contains function.
     */
    contains: ContainsFunction;

    /**
     * The contains all function.
     */
    containsAll: ContainsAllFunction;

    /**
     * The contains any function.
     */
    containsAny: ContainsAnyFunction;

    /**
     * The contains none function.
     */
    containsNone: ContainsNoneFunction;

    /**
     * The date after function.
     */
    dateAfter: DateAfterFunction;

    /**
     * The date before function.
     */
    dateBefore: DateBeforeFunction;

    /**
     * The date diff function.
     */
    dateDiff: DateDiffFunction;

    /**
     * The date equals function.
     */
    dateEquals: DateEqualsFunction;

    /**
     * The date modify function.
     */
    dateModify: DateModifyFunction;

    /**
     * The date not equals function.
     */
    dateNotEquals: DateNotEqualsFunction;

    /**
     * The date on or after function.
     */
    dateOnOrAfter: DateOnOrAfterFunction;

    /**
     * The date on or before function.
     */
    dateOnOrBefore: DateOnOrBeforeFunction;

    /**
     * The day function.
     */
    day: DayFunction;

    /**
     * The empty function.
     */
    empty: EmptyFunction;

    /**
     * The flat function.
     */
    flat: FlatFunction;

    /**
     * The floor function.
     */
    floor: FloorFunction;

    /**
     * The hour function.
     */
    hour: HourFunction;

    /**
     * The if function.
     */
    if: IfFunction;

    /**
     * The index function.
     */
    index: IndexFunction;

    /**
     * The in folder function.
     */
    inFolder: InFolderFunction;

    /**
     * The join function.
     */
    join: JoinFunction;

    /**
     * The length function.
     */
    len: LenFunction;

    /**
     * The links to function.
     */
    linksTo: LinksToFunction;

    /**
     * The minimum function.
     */
    min: MinFunction;

    /**
     * The minute function.
     */
    minute: MinuteFunction;

    /**
     * The month function.
     */
    month: MonthFunction;

    /**
     * The not function.
     */
    not: NotFunction;

    /**
     * The not contains function.
     */
    notContains: NotContainsFunction;

    /**
     * The not empty function.
     */
    notEmpty: NotEmptyFunction;

    /**
     * The now function.
     */
    now: NowFunction;

    /**
     * The round function.
     */
    round: RoundFunction;

    /**
     * The second function.
     */
    second: SecondFunction;

    /**
     * The slice function.
     */
    slice: SliceFunction;

    /**
     * The tagged with function.
     */
    taggedWith: TaggedWithFunction;

    /**
     * The title function.
     */
    title: TitleFunction;

    /**
     * The trim function.
     */
    trim: TrimFunction;

    /**
     * The unique function.
     */
    unique: UniqueFunction;

    /**
     * The year function.
     */
    year: YearFunction;
}
