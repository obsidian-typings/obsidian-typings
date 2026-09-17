import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it,
  vi
} from 'vitest';

import {
  MESSAGE_ID,
  noAsyncCallbackToUnsafeReturn
} from './no-async-callback-to-unsafe-return.ts';
import { toRuleTesterModule } from './rule-tester-helper.ts';

const TYPE_CHECK_TIMEOUT_IN_MILLISECONDS = 60_000;

vi.setConfig({ testTimeout: TYPE_CHECK_TIMEOUT_IN_MILLISECONDS });

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts'],
        defaultProject: 'tsconfig.eslint-test.json'
      }
    }
  }
});

ruleTester.run('no-async-callback-to-unsafe-return', toRuleTesterModule(noAsyncCallbackToUnsafeReturn), {
  invalid: [
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => any): void;
        onClick(async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async arrow passed to callback with => any return'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => any): void;
        onClick(async function() {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async function expression passed to callback with => any return'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => unknown): void;
        onClick(async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async arrow passed to callback with => unknown return'
    },
    {
      code: `
        declare function register(name: string, fn: () => any): void;
        register('test', async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async callback as second argument with => any return'
    },
    {
      code: `
        declare class Button { onClick(fn: (evt: MouseEvent) => any): void; }
        declare const btn: Button;
        btn.onClick(async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async arrow passed to method with => any return'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => any | string): void;
        onClick(async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async arrow passed to callback with => any | string return (no promise handling)'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => unknown | number): void;
        onClick(async () => {});
      `,
      errors: [{ messageId: MESSAGE_ID }],
      name: 'async arrow passed to callback with => unknown | number return (no promise handling)'
    }
  ],
  valid: [
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => any): void;
        onClick(() => {});
      `,
      name: 'non-async callback to => any return (fine)'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => void): void;
        onClick(async () => {});
      `,
      name: 'async callback to => void return (handled by no-misused-promises)'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => Promise<void>): void;
        onClick(async () => {});
      `,
      name: 'async callback to => Promise<void> return (correct usage)'
    },
    {
      code: `
        declare function onClick(fn: (evt: MouseEvent) => string): void;
        onClick(() => 'ok');
      `,
      name: 'non-async callback to => string return'
    },
    {
      code: `
        declare function register(name: string, fn: () => Promise<void>): void;
        register('test', async () => {});
      `,
      name: 'async callback as second argument with => Promise<void> return'
    },
    {
      code: `
        declare function takesOne(fn: () => void): void;
        takesOne(() => {}, async () => {});
      `,
      name: 'extra async arg beyond declared params (no param to check)'
    },
    {
      code: `
        type Awaitable<T> = T | PromiseLike<T>;
        declare function beforeAll(fn: () => Awaitable<unknown>): void;
        beforeAll(async () => {});
      `,
      name: 'async callback to => Awaitable<unknown> (type alias explicitly handles promises)'
    },
    {
      code: `
        declare function onDone(fn: () => unknown | Promise<void>): void;
        onDone(async () => {});
      `,
      name: 'async callback to => unknown | Promise<void> (union explicitly includes Promise)'
    },
    {
      code: `
        declare function onDone(fn: () => any | Promise<void>): void;
        onDone(async () => {});
      `,
      name: 'async callback to => any | Promise<void> (union explicitly includes Promise)'
    },
    {
      code: `
        type Awaitable<T> = T | PromiseLike<T>;
        declare function beforeAll(fn: () => Awaitable<any>): void;
        beforeAll(async () => {});
      `,
      name: 'async callback to => Awaitable<any> (type alias explicitly handles promises)'
    },
    {
      code: `
        declare function run(fn: Function): void;
        run(async () => {});
      `,
      name: 'async callback to Function type (no call signatures to check)'
    }
  ]
});
