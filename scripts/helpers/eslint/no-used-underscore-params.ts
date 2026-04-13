/**
 * ESLint rule: no-used-underscore-params
 *
 * Reports an error when a parameter with a `_` prefix is actually
 * referenced in the function body. The `_` prefix convention signals
 * "this parameter is intentionally unused" — if it IS used, the
 * prefix is misleading and should be removed.
 */
import type { Rule } from 'eslint';

interface NodeWithBody {
  body?: Rule.Node;
}

export const noUsedUnderscoreParams: Rule.RuleModule = {
  create(context) {
    return {
      ':function'(node: Rule.Node): void {
        const scope = context.sourceCode.getScope(node);

        for (const variable of scope.variables) {
          if (!variable.name.startsWith('_')) {
            continue;
          }

          // Must be a parameter (not a local variable)
          const defNode = variable.defs[0];
          if (defNode?.type !== 'Parameter') {
            continue;
          }

          // Check if the parameter has references in the function body (not just
          // In the return type annotation, e.g., type predicates like `asserts _obj is T`).
          const funcBody = (node as NodeWithBody).body;
          const bodyRange = funcBody?.range;
          const hasBodyReferences = variable.references.some((ref) => {
            if (!ref.isRead()) {
              return false;
            }
            // If we can determine the body range, only count refs inside it
            if (bodyRange && ref.identifier.range) {
              return ref.identifier.range[0] >= bodyRange[0]
                && ref.identifier.range[1] <= bodyRange[1];
            }
            // Fallback: count all reads
            return true;
          });
          if (hasBodyReferences) {
            context.report({
              data: { name: variable.name },
              message: 'Parameter "{{ name }}" has a `_` prefix but is used. Remove the `_` prefix since the parameter is not unused.',
              node: defNode.name
            });
          }
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Disallow `_`-prefixed parameters that are actually used in the function body'
    },
    schema: [],
    type: 'problem'
  }
};
