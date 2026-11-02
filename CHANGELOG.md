# CHANGELOG

## 1.1.0

**Models:** Obsidian `1.15.0` (`public` channel). Internal members can differ in other app versions, so guard the ones you use when your `minAppVersion` is older.

**Branch:** [`release/obsidian-public/1.15.0`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.15.0)

**Commits:** [`obsidian-catalyst-1.15.0-v1.5.0...obsidian-public-1.15.0-v1.1.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.15.0-v1.5.0...obsidian-public-1.15.0-v1.1.0) -- the first release from this branch, so the range opens at `obsidian-catalyst-1.15.0-v1.5.0`, the nearest earlier release it was cut from

### Breaking changes

- fix(bases)!: remove obsolete function types; use FormulaFunction ([`aecb5c4`](https://github.com/obsidian-typings/obsidian-typings/commit/aecb5c43c3e8215837b7a53414bc87bda10f76c1))

### Other changes

- chore: generate README.md from template ([`d624928`](https://github.com/obsidian-typings/obsidian-typings/commit/d62492836801394126a2556d8383f1f8db227544))

### Declared API changes

Names only, compared with `obsidian-catalyst-1.15.0-v1.5.0`.

**Removed (69):**

- `AbsFunction`
- `BasesFunction`
- `BasesFunction.app`
- `BasesFunction.apply`
- `BasesFunction.args`
- `BasesFunction.isOperator`
- `BasesFunction.name`
- `BasesFunction.returnType`
- `BasesFunction.serialize`
- `BasesFunctionArg`
- `BasesFunctionArg.includeCustomTypes`
- `BasesFunctionArg.name`
- `BasesFunctionArg.optional`
- `BasesFunctionArg.type`
- `BasesFunctionArg.variadic`
- `CeilFunction`
- `ConcatFunction`
- `ContainsAllFunction`
- `ContainsAnyFunction`
- `ContainsFunction`
- `ContainsNoneFunction`
- `DateAfterFunction`
- `DateBeforeFunction`
- `DateDiffFunction`
- `DateEqualsFunction`
- `DateModifyFunction`
- `DateNotEqualsFunction`
- `DateOnOrAfterFunction`
- `DateOnOrBeforeFunction`
- `DayFunction`
- `EmptyFunction`
- `EqualFunction`
- `FlatFunction`
- `FloorFunction`
- `GreaterFunction`
- `GreaterOrEqualFunction`
- `HasCompare`
- `HasCompare.compare`
- `HasExtract`
- `HasExtract.extract`
- `HasGetDisplayName`
- `HasGetDisplayName.getDisplayName`
- `HasGetRHSWidgetType`
- `HasGetRHSWidgetType.getRHSWidgetType`
- `HourFunction`
- `IfFunction`
- `InFolderFunction`
- `IndexFunction`
- `JoinFunction`
- `LenFunction`
- `LessFunction`
- `LessOrEqualFunction`
- `LinksToFunction`
- `MinFunction`
- `MinuteFunction`
- `MonthFunction`
- `NotContainsFunction`
- `NotEmptyFunction`
- `NotEqualFunction`
- `NotFunction`
- `NowFunction`
- `RoundFunction`
- `SecondFunction`
- `SliceFunction`
- `TaggedWithFunction`
- `TitleFunction`
- `TrimFunction`
- `UniqueFunction`
- `YearFunction`
