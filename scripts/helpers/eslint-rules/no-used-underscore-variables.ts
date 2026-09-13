/**
 * @file
 *
 * ESLint rule: no-used-underscore-variables
 *
 * Reports an error when a parameter or local variable with a `_` prefix is
 * actually referenced in the function body. The `_` prefix convention signals
 * "this identifier is intentionally unused" — if it IS used, the prefix is
 * misleading and should be removed.
 */
import type { Rule } from 'eslint';

import { assertNonNullable } from '../type-guards.ts';

interface NodeWithBody {
  body?: Rule.Node;
}

/**
Message ID reported when a variable carries a `_` prefix (signalling unused) but is actually used.
 */
export const MESSAGE_ID = 'noUsedUnderscoreVariables';

export const noUsedUnderscoreVariables: Rule.RuleModule = {
  create(context) {
    return {
      ':function'(node: Rule.Node): void {
        const scope = context.sourceCode.getScope(node);

        for (const variable of scope.variables) {
          if (!variable.name.startsWith('_')) {
            continue;
          }

          const definitionNode = variable.defs[0];
          assertNonNullable(definitionNode, 'User-declared _-prefixed variables always have at least one definition');

          // For parameters, only count references inside the function body
          // (not in type annotations like `asserts _obj is T`).
          // For local variables, any read reference counts.
          const functionBody = (node as NodeWithBody).body;
          const bodyRange = functionBody?.range;
          const isParameter = definitionNode.type === 'Parameter';
          const hasBodyReferences = variable.references.some((reference) => {
            if (!reference.isRead()) {
              return false;
            }
            if (isParameter && bodyRange && reference.identifier.range) {
              return reference.identifier.range[0] >= bodyRange[0]
                && reference.identifier.range[1] <= bodyRange[1];
            }
            // Local variables or fallback: count all reads
            return true;
          });
          if (hasBodyReferences) {
            context.report({
              data: { name: variable.name },
              messageId: MESSAGE_ID,
              node: definitionNode.name
            });
          }
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Disallow `_`-prefixed parameters and local variables that are actually used'
    },
    messages: {
      [MESSAGE_ID]: '"{{ name }}" has a `_` prefix but is used. Remove the `_` prefix since it is not unused.'
    },
    schema: [],
    type: 'problem'
  }
};
