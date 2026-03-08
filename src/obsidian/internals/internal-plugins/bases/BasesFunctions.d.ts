import type { AbsFunction } from './functions/AbsFunction.d.ts';
import type { CeilFunction } from './functions/CeilFunction.d.ts';
import type { ConcatFunction } from './functions/ConcatFunction.d.ts';
import type { ContainsAllFunction } from './functions/ContainsAllFunction.d.ts';
import type { ContainsAnyFunction } from './functions/ContainsAnyFunction.d.ts';
import type { ContainsFunction } from './functions/ContainsFunction.d.ts';
import type { ContainsNoneFunction } from './functions/ContainsNoneFunction.d.ts';
import type { DateAfterFunction } from './functions/DateAfterFunction.d.ts';
import type { DateBeforeFunction } from './functions/DateBeforeFunction.d.ts';
import type { DateDiffFunction } from './functions/DateDiffFunction.d.ts';
import type { DateEqualsFunction } from './functions/DateEqualsFunction.d.ts';
import type { DateModifyFunction } from './functions/DateModifyFunction.d.ts';
import type { DateNotEqualsFunction } from './functions/DateNotEqualsFunction.d.ts';
import type { DateOnOrAfterFunction } from './functions/DateOnOrAfterFunction.d.ts';
import type { DateOnOrBeforeFunction } from './functions/DateOnOrBeforeFunction.d.ts';
import type { DayFunction } from './functions/DayFunction.d.ts';
import type { EmptyFunction } from './functions/EmptyFunction.d.ts';
import type { EqualFunction } from './functions/EqualFunction.d.ts';
import type { FlatFunction } from './functions/FlatFunction.d.ts';
import type { FloorFunction } from './functions/FloorFunction.d.ts';
import type { GreaterFunction } from './functions/GreaterFunction.d.ts';
import type { GreaterOrEqualFunction } from './functions/GreaterOrEqualFunction.d.ts';
import type { HourFunction } from './functions/HourFunction.d.ts';
import type { IfFunction } from './functions/IfFunction.d.ts';
import type { IndexFunction } from './functions/IndexFunction.d.ts';
import type { InFolderFunction } from './functions/InFolderFunction.d.ts';
import type { JoinFunction } from './functions/JoinFunction.d.ts';
import type { LenFunction } from './functions/LenFunction.d.ts';
import type { LessFunction } from './functions/LessFunction.d.ts';
import type { LessOrEqualFunction } from './functions/LessOrEqualFunction.d.ts';
import type { LinksToFunction } from './functions/LinksToFunction.d.ts';
import type { MinFunction } from './functions/MinFunction.d.ts';
import type { MinuteFunction } from './functions/MinuteFunction.d.ts';
import type { MonthFunction } from './functions/MonthFunction.d.ts';
import type { NotContainsFunction } from './functions/NotContainsFunction.d.ts';
import type { NotEmptyFunction } from './functions/NotEmptyFunction.d.ts';
import type { NotEqualFunction } from './functions/NotEqualFunction.d.ts';
import type { NotFunction } from './functions/NotFunction.d.ts';
import type { NowFunction } from './functions/NowFunction.d.ts';
import type { RoundFunction } from './functions/RoundFunction.d.ts';
import type { SecondFunction } from './functions/SecondFunction.d.ts';
import type { SliceFunction } from './functions/SliceFunction.d.ts';
import type { TaggedWithFunction } from './functions/TaggedWithFunction.d.ts';
import type { TitleFunction } from './functions/TitleFunction.d.ts';
import type { TrimFunction } from './functions/TrimFunction.d.ts';
import type { UniqueFunction } from './functions/UniqueFunction.d.ts';
import type { YearFunction } from './functions/YearFunction.d.ts';

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
