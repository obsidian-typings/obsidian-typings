import { toRuleTesterModule } from '@mnaoumov/typescript-dev-toolkit/linters/eslint-rules/rule-tester-helper';
import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it
} from 'vitest';

import { oneDeclarationPerFile } from './one-declaration-per-file.ts';
import { toEslintRule } from './utils.ts';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

function lines(...parts: string[]): string {
  return parts.join('\n');
}

ruleTester.run('one-declaration-per-file', toRuleTesterModule(toEslintRule(oneDeclarationPerFile)), {
  invalid: [
    {
      code: lines(
        'export function foo(): void {}',
        'export function bar(): void {}'
      ),
      errors: [
        { line: 1, messageId: 'tooManyExports' },
        { line: 1, messageId: 'tooManyDeclarations' },
        { line: 2, messageId: 'tooManyExports' },
        { line: 2, messageId: 'tooManyDeclarations' }
      ],
      name: 'two exported functions'
    },
    {
      code: lines(
        'export function foo(value: string): void;',
        'export function foo(value: number): void;',
        'export function foo(value: number | string): void {}',
        'export function bar(): void {}'
      ),
      errors: [
        { line: 1, messageId: 'tooManyExports' },
        { line: 2, messageId: 'tooManyExports' },
        { line: 3, messageId: 'tooManyExports' },
        { line: 3, messageId: 'tooManyDeclarations' },
        { line: 4, messageId: 'tooManyExports' },
        { line: 4, messageId: 'tooManyDeclarations' }
      ],
      name: 'an overloaded function beside a second function'
    }
  ],
  valid: [
    {
      code: 'export function foo(): void {}',
      name: 'one exported function'
    },
    {
      code: lines(
        'export function foo(value: string): void;',
        'export function foo(value: number): void;',
        'export function foo(value: number | string): void {}'
      ),
      name: 'the overload signatures of one function are one export'
    },
    {
      code: lines(
        'export declare function foo(value: string): void;',
        'export declare function foo(value: number): void;'
      ),
      name: 'declared overloads of one function are one export'
    }
  ]
});
