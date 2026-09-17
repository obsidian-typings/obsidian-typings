import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it
} from 'vitest';

import {
  MESSAGE_ID,
  noUnusedParamsMembers
} from './no-unused-params-members.ts';
import { toRuleTesterModule } from './rule-tester-helper.ts';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('no-unused-params-members', toRuleTesterModule(noUnusedParamsMembers), {
  invalid: [
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): string { return params.a; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'single unused member via property access'
    },
    {
      code: 'interface FooParams { a: string; b: string; c: string; } function foo(params: FooParams): string { return params.a; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'multiple unused members'
    },
    {
      code: 'interface FooBarParams { a: string; b: string; } class Foo { public bar(params: FooBarParams): string { return params.a; } }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'unused member in a class method'
    },
    {
      code: 'interface FooConstructorParams { a: string; b: string; } class Foo { public constructor(params: FooConstructorParams) { params.a; } }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'unused member in a constructor'
    },
    {
      code: 'interface FooConstructorParams { a: string; } class Foo { public constructor(private readonly params: FooConstructorParams) {} }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'unused member with a parameter property (stored whole, accessed nowhere)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo({ a }: FooParams): string { return a; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'unused member with a destructured signature'
    },
    {
      code: 'interface FooParams { a: string; doIt(): void; } function foo(params: FooParams): string { return params.a; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'unused method-signature member'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): string { return params["a"]; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'used via computed string literal, other member unused'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): string { const { a } = params; return a; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'used via destructuring declaration, other member unused'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function one(params: FooParams): string { return params.a; } function two(params: FooParams): string { return params.a; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'aggregates across consumers: b unused by both'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams, key: string): unknown { return params[key]; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'dynamic computed access marks nothing (false positives by design)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): unknown { return params[0]; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'numeric computed access marks nothing'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams, k: string): unknown { const { [k]: v } = params; return v; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'computed destructuring key marks nothing'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): string { const { "a": localA } = params; return localA; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'string-literal destructuring key marks nothing'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): unknown { return params[String(1)]; }',
      errors: [{ messageId: MESSAGE_ID }, { messageId: MESSAGE_ID }],
      name: 'computed access with a non-identifier non-literal key marks nothing'
    }
  ],
  valid: [
    {
      code: 'interface FooParams { a: string; } function foo(params: FooParams): string { return params.a; }',
      name: 'all members used'
    },
    {
      code: 'interface FooParams { a: string; } function foo(params: FooParams): string { return params["a"]; }',
      name: 'member used via computed string literal'
    },
    {
      code: 'interface FooParams { a: string; } function foo(params: FooParams): string { const { a } = params; return a; }',
      name: 'member used via destructuring declaration'
    },
    {
      code: 'interface FooParams { a: string; } function foo({ a }: FooParams): string { return a; }',
      name: 'member used via destructured signature'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function one(params: FooParams): string { return params.a; } function two(params: FooParams): string { return params.b; }',
      name: 'aggregates across consumers: every member used by some consumer'
    },
    {
      code: 'function foo(params: FooParams): void {}',
      name: 'imported (not same-file) interface is skipped'
    },
    {
      code: 'interface FooParams { a: string; }',
      name: 'interface declared but never consumed as a parameter is not reported'
    },
    {
      code: 'function foo(x: number): void {}',
      name: 'non-Params/Options type annotation is ignored'
    },
    {
      code: 'function foo(x): void {}',
      name: 'param without type annotation is ignored'
    },
    {
      code: 'function foo(params: SomeCustomType): void {}',
      name: 'type not ending in Params/Options is ignored'
    },
    {
      code: 'function foo(params: ns.FooParams): void {}',
      name: 'qualified type name is ignored'
    },
    {
      code: 'interface FooParams { a: string; } function foo([first]: FooParams): unknown { return first; }',
      name: 'non-identifier non-object-pattern binding is ignored'
    },
    {
      code: 'interface FooParams { ["a"]: string; } function foo(params: FooParams): unknown { return params; }',
      name: 'computed interface member is not enumerated'
    },
    {
      code: 'interface FooParams { [key: string]: string; } function foo(params: FooParams): unknown { return params; }',
      name: 'index signature is not enumerated'
    },
    {
      code: 'interface Foo { a: string; } function foo(params: Foo): unknown { return params; }',
      name: 'interface not ending in Params/Options is not tracked'
    },
    {
      code: 'interface FooParams { "a": string; b: string; } function foo(params: FooParams): string { return params.b; }',
      name: 'string-literal interface member is not enumerated'
    },
    {
      code: 'interface FooParams { a: string; } function foo(params: FooParams): unknown { let other; const y = 1; const q = globalThis; return params.a; }',
      name: 'unrelated declarations (no init, non-identifier init, non-param identifier init) are ignored'
    },
    {
      code: 'interface FooParams { a: string; } function foo(params: FooParams): unknown { const obj = { x: 1 }; return params.a + obj.x + [1].length; }',
      name: 'member access on other identifiers and non-identifier objects is ignored'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): unknown { const other = {}; return { ...params, ...other, ...String(1) }; }',
      name: 'spreading the object reads every member (used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } const DEFAULTS = { a: "", b: "" }; function foo(params: FooParams): string { const full = { ...DEFAULTS, ...params }; return full.a + full.b; }',
      name: 'defaults-merge spread reads every member (used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): FooParams { const { ...rest } = params; return rest; }',
      name: 'rest destructuring reads every member (used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } declare function helper(p: FooParams): void; function foo(params: FooParams): void { helper(params); }',
      name: 'forwarding the whole object to another function (escapes, used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): FooParams { return params; }',
      name: 'returning the whole object (escapes, used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams): unknown { const z = params; return z; }',
      name: 'storing the object in a local (escapes, used all)'
    },
    {
      code: 'interface FooParams { a: string; b: string; } function foo(params: FooParams, obj: Record<string, unknown>): unknown { return obj[params]; }',
      name: 'object used as a computed key elsewhere (escapes, used all)'
    }
  ]
});
