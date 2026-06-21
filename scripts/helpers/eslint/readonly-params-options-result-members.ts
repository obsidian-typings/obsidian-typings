/**
 * @file
 *
 * ESLint rule: readonly-params-options-result-members
 *
 * Reports an error when an interface or type alias whose name ends with
 * `Params`, `Options`, or `Result` has a property signature that is not
 * `readonly`. Parameter/options/result bags should be immutable — callers
 * should never mutate the object they received.
 */
import type { Rule } from 'eslint';

export const MESSAGE_ID = 'readonlyParamsOptionsResultMembers';

interface PropertySignatureNode {
  readonly key: Rule.Node;
}

export const readonlyParamsOptionsResultMembers: Rule.RuleModule = {
  create(context) {
    return {
      'TSInterfaceDeclaration[id.name=/(?:Params|Options|Result)$/] TSPropertySignature[readonly=false]'(node: Rule.Node): void {
        reportNonReadonly(context, node);
      },
      'TSTypeAliasDeclaration[id.name=/(?:Params|Options|Result)$/] TSPropertySignature[readonly=false]'(node: Rule.Node): void {
        reportNonReadonly(context, node);
      }
    };

    function reportNonReadonly(ctx: Rule.RuleContext, node: Rule.Node): void {
      const propertyNode = node as Partial<PropertySignatureNode>;
      ctx.report({
        fix(fixer) {
          const { key } = propertyNode;
          if (!key) {
            throw new Error('Property signature is missing its key.');
          }
          return fixer.insertTextBefore(key, 'readonly ');
        },
        messageId: MESSAGE_ID,
        node
      });
    }
  },
  meta: {
    docs: {
      description: 'Require all properties in `*Params`, `*Options`, and `*Result` interfaces to be `readonly`'
    },
    fixable: 'code',
    messages: {
      [MESSAGE_ID]: 'Property must be `readonly`. Params/Options/Result interfaces should be immutable.'
    },
    schema: [],
    type: 'suggestion'
  }
};
