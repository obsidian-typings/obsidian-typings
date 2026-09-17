import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it
} from 'vitest';

import {
  MESSAGE_ID,
  noUsedUnderscoreVariables
} from './no-used-underscore-variables.ts';
import { toRuleTesterModule } from './rule-tester-helper.ts';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('no-used-underscore-variables', toRuleTesterModule(noUsedUnderscoreVariables), {
  invalid: [
    {
      code: 'function foo(_x: number) { return _x + 1; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore param used in function body'
    },
    {
      code: 'const fn = (_a: string, _b: number) => _a + _b;',
      errors: [
        { messageId: MESSAGE_ID },
        { messageId: MESSAGE_ID }
      ],
      name: 'multiple underscore params used in arrow body'
    },
    {
      code: 'class C { method(_val: number) { return _val; } }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore param used in class method'
    },
    {
      code: 'function foo(_x: number) { _x = 5; return _x; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore param reassigned and read'
    },
    {
      code: 'function foo() { const _local = 1; return _local; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore local variable used in function body'
    },
    {
      code: 'function foo() { let _count = 0; _count++; return _count; }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore local variable mutated and read'
    },
    {
      code: 'function foo() { function _inner() { return 1; } return _inner(); }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore function declaration used in function body'
    },
    {
      code: 'function foo() { class _C {} return new _C(); }',
      errors: [{ messageId: MESSAGE_ID }],
      name: 'underscore class declaration used in function body'
    }
  ],
  valid: [
    {
      code: 'function foo(_x: number) { return 1; }',
      name: 'underscore param genuinely unused'
    },
    {
      code: 'function foo(x: number) { return x + 1; }',
      name: 'non-underscore param used normally'
    },
    {
      code: 'const fn = (_a: string, b: number) => b;',
      name: 'underscore param unused alongside used param'
    },
    {
      code: 'function guard(_obj: unknown): asserts _obj is string { throw new Error(); }',
      name: 'underscore param referenced only in type predicate annotation'
    },
    {
      code: 'function foo() { const _unused = 1; return 2; }',
      name: 'underscore local variable genuinely unused'
    },
    {
      code: 'function foo() { function _inner() {} }',
      name: 'underscore function declaration genuinely unused'
    },
    {
      code: 'function foo() { class _C {} }',
      name: 'underscore class declaration genuinely unused'
    }
  ]
});
