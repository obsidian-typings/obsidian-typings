import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it
} from 'vitest';

import {
  MESSAGE_ID,
  paramsOptionsNameMatch
} from './params-options-name-match.ts';
import { toRuleTesterModule } from './rule-tester-helper.ts';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('params-options-name-match', toRuleTesterModule(paramsOptionsNameMatch), {
  invalid: [
    {
      code: 'export function fooBar(params: WrongParams): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'exported function param type does not match function name'
    },
    {
      code: 'export const fooBar = (params: WrongParams): void => {};',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'exported arrow function param type does not match variable name'
    },
    {
      code: 'export class Foo { method(params: WrongParams): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'public method param type does not match class + method name'
    },
    {
      code: 'export class Foo { method(params: MethodParams): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'public method param type missing class name prefix'
    },
    {
      code: 'export class Foo { constructor(params: WrongConstructorParams) {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'constructor param type does not match class name'
    },
    {
      code: 'export function fooBar(params: BazQuxParams): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'exported function param type has wrong prefix'
    },
    {
      code: 'export class Foo { protected method(params: WrongParams): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'protected method param type does not match'
    },
    {
      code: 'export class Foo { private helper(params: WrongParams): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'private method param type does not match'
    },
    {
      code: 'export class Foo { private constructor(params: WrongConstructorParams) {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'private constructor param type does not match'
    },
    {
      code: 'export function fooBar(options: FooBarOptions): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'sole-argument bag must be named Params, not Options (function)'
    },
    {
      code: 'export class Foo { method(options: FooMethodOptions): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'sole-argument bag must be named Params, not Options (method)'
    },
    {
      code: 'export class Foo { constructor(options: FooConstructorOptions) {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'sole-argument bag must be named Params, not Options (constructor)'
    },
    {
      code: 'export class Foo { private helper(options: FooHelperOptions): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'sole-argument bag must be named Params, not Options (private method)'
    },
    {
      code: 'export function fooBar(baz: string, params: FooBarParams): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'supplementary bag must be named Options, not Params (function)'
    },
    {
      code: 'export class Foo { method(baz: string, params: FooMethodParams): void {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'supplementary bag must be named Options, not Params (method)'
    },
    {
      code: 'export function fooBar(params?: FooBarParams): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'optional sole bag must be named Options, not Params'
    },
    {
      code: 'export function fooBar(params: FooBarParams = {}): void {}',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'defaulted sole bag must be named Options, not Params'
    }
  ],
  valid: [
    {
      code: 'export function fooBar(params: FooBarParams): void {}',
      name: 'sole-argument bag named Params matches function name'
    },
    {
      code: 'export const fooBar = (params: FooBarParams): void => {};',
      name: 'sole-argument bag named Params matches arrow variable name'
    },
    {
      code: 'export class Foo { method(params: FooMethodParams): void {} }',
      name: 'sole-argument bag named Params matches ClassName + PascalCase(methodName)'
    },
    {
      code: 'export class Foo { constructor(params: FooConstructorParams) {} }',
      name: 'sole-argument bag named Params matches ClassName + Constructor'
    },
    {
      code: 'export class Foo { private helper(params: FooHelperParams): void {} }',
      name: 'private sole-argument bag named Params is checked and matches'
    },
    {
      code: 'export function fooBar(options?: FooBarOptions): void {}',
      name: 'optional sole bag named Options matches function name'
    },
    {
      code: 'export function fooBar(options: FooBarOptions = {}): void {}',
      name: 'defaulted sole bag named Options matches function name'
    },
    {
      code: 'export function fooBar(baz: string, options?: FooBarOptions): void {}',
      name: 'optional supplementary bag named Options matches function name'
    },
    {
      code: 'export function fooBar(baz: string, options: FooBarOptions = {}): void {}',
      name: 'defaulted supplementary bag named Options matches function name'
    },
    {
      code: 'export class Foo { method(baz: string, options: FooMethodOptions): void {} }',
      name: 'supplementary bag named Options matches ClassName + PascalCase(methodName)'
    },
    {
      code: 'export class Foo { constructor(baz: string, options: FooConstructorOptions) {} }',
      name: 'supplementary constructor bag named Options matches ClassName + Constructor'
    },
    {
      code: 'class Foo { constructor(params: WrongParams) {} }',
      name: 'non-exported class constructor is not checked'
    },
    {
      code: 'class Foo { method(params: WrongParams): void {} }',
      name: 'non-exported class method is not checked'
    },
    {
      code: 'export function fooBar(x: number): void {}',
      name: 'non-Params/Options type annotation is not checked'
    },
    {
      code: 'export function fooBar(x: number, y: string): void {}',
      name: 'primitive types are not checked'
    },
    {
      code: 'export const fn = (x: number) => x;',
      name: 'anonymous arrow with primitive type'
    },
    {
      code: '([1, 2, 3]).forEach((item) => {});',
      name: 'callback without name context is not checked'
    },
    {
      code: 'function fooBar(x): void {}',
      name: 'param without type annotation is not checked'
    },
    {
      code: 'export function fooBar(params: SomeCustomType): void {}',
      name: 'param type not ending in Params/Options is not checked'
    },
    {
      code: 'export function fooBar({ a, b }: FooBarParams): void {}',
      name: 'destructured sole-argument bag with matching name is valid'
    },
    {
      code: 'const obj = { method(params: MethodParams): void {} };',
      name: 'object method (no class context) is not checked'
    },
    {
      code: 'export default class { constructor(params: SomeConstructorParams) {} }',
      name: 'anonymous class constructor is not checked'
    },
    {
      code: 'function internal(params: SharedParams): void {}',
      name: 'non-exported function is not checked (passthrough pattern)'
    },
    {
      code: 'const internal = (params: SharedParams): void => {};',
      name: 'non-exported arrow function is not checked (passthrough pattern)'
    }
  ]
});
