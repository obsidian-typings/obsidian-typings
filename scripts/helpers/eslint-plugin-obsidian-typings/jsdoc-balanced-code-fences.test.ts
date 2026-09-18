import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  afterAll,
  describe,
  it
} from 'vitest';

import { toRuleTesterModule } from '../eslint-rules/rule-tester-helper.ts';
import { jsdocBalancedCodeFences } from './jsdoc-balanced-code-fences.ts';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const MESSAGE_ID = 'unclosedFence';

const ruleTester = new RuleTester();

function lines(...parts: string[]): string {
  return parts.join('\n');
}

ruleTester.run('jsdoc-balanced-code-fences', toRuleTesterModule(jsdocBalancedCodeFences), {
  invalid: [
    {
      code: lines(
        '/**',
        ' * Adds a class.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * element.addClass(\'foo\');',
        ' * @official',
        ' */',
        'export function addClass(cls: string): void;'
      ),
      errors: [{ messageId: MESSAGE_ID }],
      name: 'fence left open before a tag block is closed before the first tag',
      output: lines(
        '/**',
        ' * Adds a class.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * element.addClass(\'foo\');',
        ' * ```',
        ' * @official',
        ' */',
        'export function addClass(cls: string): void;'
      )
    },
    {
      code: lines(
        'declare module \'obsidian\' {',
        '  interface Keymap {',
        '    /**',
        '     * Pops a scope.',
        '     *',
        '     * @example',
        '     * ```ts',
        '     * keymap.popScope(new Scope());',
        '     * @official',
        '     * @since 0.13.9',
        '     */',
        '    popScope(scope: unknown): void;',
        '  }',
        '}'
      ),
      errors: [{ messageId: MESSAGE_ID }],
      name: 'the closing fence is indented to match the tag line it is inserted before',
      output: lines(
        'declare module \'obsidian\' {',
        '  interface Keymap {',
        '    /**',
        '     * Pops a scope.',
        '     *',
        '     * @example',
        '     * ```ts',
        '     * keymap.popScope(new Scope());',
        '     * ```',
        '     * @official',
        '     * @since 0.13.9',
        '     */',
        '    popScope(scope: unknown): void;',
        '  }',
        '}'
      )
    },
    {
      code: lines(
        '/**',
        ' * Two examples, the second one left open.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * first();',
        ' * ```',
        ' * @example',
        ' * ```ts',
        ' * second();',
        ' * @official',
        ' */',
        'export function twice(): void;'
      ),
      errors: [{ messageId: MESSAGE_ID }],
      name: 'a second fence left open after a balanced first one',
      output: lines(
        '/**',
        ' * Two examples, the second one left open.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * first();',
        ' * ```',
        ' * @example',
        ' * ```ts',
        ' * second();',
        ' * ```',
        ' * @official',
        ' */',
        'export function twice(): void;'
      )
    },
    {
      code: lines(
        '/**',
        ' * No tag follows, so there is nowhere unambiguous to close the fence.',
        ' *',
        ' * ```ts',
        ' * orphan();',
        ' */',
        'export function orphan(): void;'
      ),
      errors: [{ messageId: MESSAGE_ID }],
      name: 'reported without a fix when no tag line follows the unclosed fence',
      output: null
    },
    {
      code: lines(
        '/**',
        ' * Each comment is judged on its own.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * first();',
        ' * @official',
        ' */',
        'export function first(): void;',
        '',
        '/**',
        ' * The second one too.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * second();',
        ' * @official',
        ' */',
        'export function second(): void;'
      ),
      errors: [
        { messageId: MESSAGE_ID },
        { messageId: MESSAGE_ID }
      ],
      name: 'two unclosed fences in one file are two findings, which a per-file parity count would miss',
      output: lines(
        '/**',
        ' * Each comment is judged on its own.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * first();',
        ' * ```',
        ' * @official',
        ' */',
        'export function first(): void;',
        '',
        '/**',
        ' * The second one too.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * second();',
        ' * ```',
        ' * @official',
        ' */',
        'export function second(): void;'
      )
    }
  ],
  valid: [
    {
      code: lines(
        '/**',
        ' * Adds a class.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * element.addClass(\'foo\');',
        ' * ```',
        ' * @official',
        ' */',
        'export function addClass(cls: string): void;'
      ),
      name: 'balanced fence'
    },
    {
      code: lines(
        '/**',
        ' * Mentions a `fence` inline without opening one.',
        ' *',
        ' * @official',
        ' */',
        'export function noFence(): void;'
      ),
      name: 'no fence at all'
    },
    {
      code: lines(
        'export interface TurndownServiceOptions {',
        '  /** Fence delimiter string. */',
        '  fence?: \'```\' | \'~~~\';',
        '}'
      ),
      name: 'a triple backtick in a string literal is not a comment fence'
    },
    {
      code: lines(
        '// ```ts',
        '// not a doc comment',
        'export function lineComment(): void;'
      ),
      name: 'a line comment is not a doc comment'
    },
    {
      code: lines(
        '/**',
        ' * Two balanced examples.',
        ' *',
        ' * @example',
        ' * ```ts',
        ' * first();',
        ' * ```',
        ' * @example',
        ' * ```ts',
        ' * second();',
        ' * ```',
        ' * @official',
        ' */',
        'export function twice(): void;'
      ),
      name: 'two balanced fences in one comment'
    }
  ]
});
