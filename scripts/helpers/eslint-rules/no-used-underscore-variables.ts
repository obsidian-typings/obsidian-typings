import type { Rule } from 'eslint';

import { assertNonNullable } from '../type-guards.ts';

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

          const defNode = variable.defs[0];
          assertNonNullable(defNode, 'User-declared _-prefixed variables always have at least one definition');

          // For parameters, only count references inside the function body
          // (not in type annotations like `asserts _obj is T`).
          // For local variables, any read reference counts.
          const funcBody = (node as { body?: Rule.Node }).body;
          const bodyRange = funcBody?.range;
          const isParam = defNode.type === 'Parameter';
          const hasBodyReferences = variable.references.some((ref) => {
            if (!ref.isRead()) {
              return false;
            }
            if (isParam && bodyRange && ref.identifier.range) {
              return ref.identifier.range[0] >= bodyRange[0]
                && ref.identifier.range[1] <= bodyRange[1];
            }
            // Local variables or fallback: count all reads
            return true;
          });
          if (hasBodyReferences) {
            context.report({
              data: { name: variable.name },
              messageId: MESSAGE_ID,
              node: defNode.name
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
      [MESSAGE_ID]: '"{{ name }}" has a `_` prefix but is used. Remove the `_` prefix since it is not unused (G10e).'
    },
    schema: [],
    type: 'problem'
  }
};
