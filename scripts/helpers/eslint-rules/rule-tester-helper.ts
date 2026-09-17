/**
 * @file
 *
 * Helper for bridging ESLint v10 rule types with `@typescript-eslint/rule-tester`.
 */
import type { RuleTester } from '@typescript-eslint/rule-tester';
import type { Rule } from 'eslint';

/**
 * Casts an ESLint v10 `Rule.RuleModule` to the type expected by
 * `@typescript-eslint/rule-tester`. The types are incompatible at the type
 * level because typescript-eslint hasn't updated for ESLint v10 yet, but
 * they are compatible at runtime.
 *
 * @param rule - The ESLint rule module.
 * @returns The same rule, typed for the rule tester.
 */
export function toRuleTesterModule(rule: Rule.RuleModule): Parameters<RuleTester['run']>[1] {
  // Bridge ESLint v10 Rule.RuleModule to @typescript-eslint/rule-tester's RuleModule.
  // Structurally compatible but nominally incompatible until typescript-eslint updates.
  const bridged: unknown = rule;

  return bridged as Parameters<RuleTester['run']>[1];
}
