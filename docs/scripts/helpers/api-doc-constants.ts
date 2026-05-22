import { join } from 'node:path';

export const CHANNEL = process.env['CURRENT_CHANNEL'] === 'catalyst' ? 'catalyst' : 'public';
export const BASE_PATH = process.env['BASE_PATH'] ?? '/obsidian-typings';
export const TYPINGS_PACKAGE = `@obsidian-typings/obsidian-${CHANNEL}-latest`;

export const OUTPUT_DIR = join(process.cwd(), 'src/content/docs/api');

export const CACHE_FILE = join(process.cwd(), 'src/content/docs/api/.cache-hash');

/** Event-like method names that should be split by string literal first param */
export const EVENT_METHODS = new Set(['off', 'on', 'trigger', 'tryTrigger']);

/** Single-letter and common generic type parameter names — not linkable */
export const GENERIC_TYPE_PARAMS = new Set([
  'Arg',
  'Args', // Short identifiers / enum-like values that aren't types
  'ASC',
  'Callback',
  'ComponentType',
  'DESC',
  'DOMContentLoaded',
  'GET',
  'HookCallback',
  'HookName',
  'ID',
  'Input',
  'Instance',
  'Item',
  'K',
  'Key',
  'Marked',
  'O',
  'Output',
  'Owner',
  'P',
  'POST',
  'R',
  'S',
  'Suspects',
  'T',
  'TFunction',
  'TModal',
  'TView',
  'TViewType',
  'U',
  'UserProperties',
  'V',
  'VIEW'
]);

export const TS_HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

export const TS_PRIMITIVE_TYPES: Record<string, string> = {
  any: `${TS_HANDBOOK}/2/everyday-types.html#any`,
  boolean: `${TS_HANDBOOK}/basic-types.html#boolean`,
  never: `${TS_HANDBOOK}/basic-types.html#never`,
  null: `${TS_HANDBOOK}/basic-types.html#null-and-undefined`,
  number: `${TS_HANDBOOK}/basic-types.html#number`,
  object: `${TS_HANDBOOK}/basic-types.html#object`,
  string: `${TS_HANDBOOK}/basic-types.html#string`,
  symbol: `${TS_HANDBOOK}/symbols.html`,
  undefined: `${TS_HANDBOOK}/basic-types.html#null-and-undefined`,
  unknown: `${TS_HANDBOOK}/2/functions.html#unknown`,
  void: `${TS_HANDBOOK}/basic-types.html#void`
};

// Cspell:disable -- URL fragments are not words
export const TS_UTILITY_TYPES = new Map<string, string>([
  ['Awaited', 'awaitedtype'],
  ['Capitalize', 'capitalizestringtype'],
  ['ConstructorParameters', 'constructorparameterstype'],
  ['Exclude', 'excludeuniontype-excludedmembers'],
  ['Extract', 'extracttype-union'],
  ['InstanceType', 'instancetypetype'],
  ['Iterable', 'iterable-interface'],
  ['Lowercase', 'lowercasestringtype'],
  ['NoInfer', 'noinfertype'],
  ['NonNullable', 'nonnullabletype'],
  ['Omit', 'omittype-keys'],
  ['OmitThisParameter', 'omitthisparametertype'],
  ['Parameters', 'parameterstype'],
  ['Partial', 'partialtype'],
  ['Pick', 'picktype-keys'],
  ['Readonly', 'readonlytype'],
  ['Record', 'recordkeys-type'],
  ['Required', 'requiredtype'],
  ['ReturnType', 'returntypetype'],
  ['ThisParameterType', 'thisparametertypetype'],
  ['ThisType', 'thistypetype'],
  ['Uncapitalize', 'uncapitalizestringtype'],
  ['Uppercase', 'uppercasestringtype']
]);

export const TS_GLOBAL_TYPES: Record<string, string> = {
  // DOM event/element maps (TypeScript lib.dom.d.ts)
  AddEventListenerOptions: 'https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#options',
  AnimationFrameProvider: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L3756',
  Array: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array',
  // TypeScript lib built-ins
  ArrayBufferLike: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer',
  ArrayLike: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
  // Fetch API
  BodyInit: 'https://developer.mozilla.org/docs/Web/API/Request/Request#body',
  // Node.js types
  Buffer: 'https://nodejs.org/api/buffer.html#class-buffer',
  // Canvas/WebGL
  CanvasRenderingContext2DSettings: 'https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext#contextattributes',
  // CodeMirror
  ChangeSpec: 'https://codemirror.net/docs/ref/#state.ChangeSpec',
  CharCategory: 'https://codemirror.net/docs/ref/#state.CharCategory',
  DecorationSet: 'https://codemirror.net/docs/ref/#view.DecorationSet',
  Direction: 'https://codemirror.net/docs/ref/#view.Direction',
  DocumentEventMap: 'https://developer.mozilla.org/docs/Web/API/Document#events',
  DocumentOrShadowRoot: 'https://developer.mozilla.org/docs/Web/API/Document',
  DOMEventHandlers: 'https://codemirror.net/docs/ref/#view.DOMEventHandlers',
  Error: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error',
  EventListenerOptions: 'https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener#options',

  EventListenerOrEventListenerObject: 'https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback',
  Extension: 'https://codemirror.net/docs/ref/#state.Extension',
  FacetReader: 'https://codemirror.net/docs/ref/#state.FacetReader',
  FSWatcher: 'https://nodejs.org/api/fs.html#class-fsfswatcher',
  Function: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function',
  GlobalEventHandlers: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L16746',
  HeadersInit: 'https://developer.mozilla.org/docs/Web/API/Headers/Headers#init',
  HTMLElementEventMap: 'https://developer.mozilla.org/docs/Web/API/HTMLElement#events',

  HTMLElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/Document/createElement',
  Iterable: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols',
  Iterator: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator',

  Map: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map',
  // Moment.js
  Moment: 'https://momentjs.com/docs/#/parsing/',
  MomentInput: 'https://momentjs.com/docs/#/parsing/',
  NonElementParentNode: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L26373',
  Object: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object',
  ParentNode: 'https://developer.mozilla.org/docs/Web/API/ParentNode',
  Promise: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  PromiseLike: 'https://github.com/Microsoft/TypeScript/blob/38c3279/src/lib/es5.d.ts#L1519',
  PromiseWithResolvers: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers',
  PropertyDescriptor: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty',
  PropertyDescriptorMap: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties',

  PropertyKey: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
  Proxy: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy',
  RangeCursor: 'https://codemirror.net/docs/ref/#state.RangeCursor',
  RegExp: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
  RequestInfo: 'https://developer.mozilla.org/docs/Web/API/Request/Request#input',

  RequestInit: 'https://developer.mozilla.org/docs/Web/API/Request/Request#options',
  ResponseInit: 'https://developer.mozilla.org/docs/Web/API/Response/Response#init',
  Set: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set',

  Stats: 'https://nodejs.org/api/fs.html#class-fsstats',
  SVGElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/Document/createElementNS',

  Symbol: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
  TypedPropertyDescriptor: 'https://www.typescriptlang.org/docs/handbook/decorators.html',
  WeakMap: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap',
  WeakRef: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakRef',
  WeakSet: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakSet',
  WebGLContextAttributes: 'https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/getContextAttributes',
  WebGLPowerPreference: 'https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/getContextAttributes',
  WindowEventHandlers: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41634',
  WindowEventMap: 'https://developer.mozilla.org/docs/Web/API/Window#events',
  WindowLocalStorage: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41685',
  WindowOrWorkerGlobalScope:
    'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41690',
  WindowSessionStorage: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41736'
};
// Cspell:enable
