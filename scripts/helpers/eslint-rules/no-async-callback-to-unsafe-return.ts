/**
 * @file
 *
 * ESLint rule: no-async-callback-to-unsafe-return
 *
 * Reports an error when an async function is passed as a callback argument
 * to a function parameter whose return type is `any` or `unknown`. Because
 * these types silently accept `Promise<T>`, the caller won't await the
 * result, leading to unhandled promise rejections at runtime.
 *
 * Example:
 * ```typescript
 * // onClick(fn: (evt: MouseEvent) => any)
 * button.onClick(async () => {
 *   await someFn(); // Unhandled rejection if someFn throws
 * });
 * ```
 *
 * `@typescript-eslint/no-misused-promises` only catches `=> void` callbacks.
 * This rule closes the gap for `=> any` and `=> unknown` callbacks.
 */
import type {
  ParserServicesWithTypeInformation,
  TSESTree
} from '@typescript-eslint/utils';
import type { Rule } from 'eslint';
import type {
  Signature,
  Type,
  TypeChecker,
  TypeNode
} from 'typescript';

import {
  isIdentifier,
  isTypeAliasDeclaration,
  isTypeReferenceNode,
  isUnionTypeNode,
  SymbolFlags,
  TypeFlags
} from 'typescript';

import { assertNonNullable } from '../type-guards.ts';

/**
Message ID reported when an async function is passed as a callback to a parameter whose return type is `any`/`unknown`, risking an unhandled promise rejection.
 */
export const MESSAGE_ID = 'noAsyncCallbackToUnsafeReturn';

/**
 * Checks whether the given TypeScript type is a function type with an unsafe
 * return type for async callbacks.
 *
 * @param checker - TypeScript type checker.
 * @param type - The type to inspect.
 * @returns `true` if the type has at least one call signature with an unsafe return.
 */
function hasUnsafeReturnCallSignature(checker: TypeChecker, type: Type): boolean {
  return type.getCallSignatures().some((sig) => isUnsafeReturnSignature(checker, sig));
}

/**
 * Checks whether a node is an async function expression (arrow or regular).
 *
 * @param node - AST node to check.
 * @returns `true` if the node is an async arrow or function expression.
 */
function isAsyncFunctionNode(node: TSESTree.Node): node is TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- AST node type string literals match the TSESTree enum values.
  return (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') && node.async;
}

// eslint-disable-next-line no-bitwise -- Bitwise flag mask is idiomatic for TypeScript compiler API.
const UNSAFE_RETURN_FLAGS = TypeFlags.Any | TypeFlags.Unknown;

const PROMISE_TYPE_NAMES = new Set(['Promise', 'PromiseLike']);

/**
 * Checks whether a type node contains a reference to `Promise` or `PromiseLike`,
 * either directly or through a type alias. This indicates the caller explicitly
 * accounts for promise returns.
 *
 * @param checker - TypeScript type checker.
 * @param node - The type node to inspect.
 * @returns `true` if the node references `Promise` or `PromiseLike`.
 */
function containsPromiseReference(checker: TypeChecker, node: TypeNode): boolean {
  if (isUnionTypeNode(node)) {
    return node.types.some((member) => containsPromiseReference(checker, member));
  }

  if (isTypeReferenceNode(node)) {
    /* v8 ignore start -- Qualified names (e.g., ns.Promise) and import aliases require multi-file setup not available in RuleTester. */
    const name = isIdentifier(node.typeName) ? node.typeName.text : '';
    /* v8 ignore stop */
    if (PROMISE_TYPE_NAMES.has(name)) {
      return true;
    }

    // Resolve type alias (following imports) and check its definition body
    let $symbol = checker.getSymbolAtLocation(node.typeName);
    /* v8 ignore start -- Import aliases require multi-file setup not available in RuleTester. */
    // eslint-disable-next-line no-bitwise -- Bitwise flag check is idiomatic for TypeScript compiler API.
    if ($symbol && $symbol.flags & SymbolFlags.Alias) {
      $symbol = checker.getAliasedSymbol($symbol);
    }
    /* v8 ignore stop */
    const declaration = $symbol?.declarations?.[0];
    if (declaration && isTypeAliasDeclaration(declaration)) {
      // eslint-disable-next-line unicorn/no-useless-recursion -- This function recurses in two places: here, following a type alias, and above, fanning out over the members of a union. Only this one is a tail call, so turning it into a loop would leave the function half recursive and half iterative over the same tree.
      return containsPromiseReference(checker, declaration.type);
    }
  }

  return false;
}

/**
 * Checks whether a call signature has an unsafe return type (`any` or `unknown`)
 * without explicitly accounting for promises.
 *
 * Flags bare `any`, `unknown`, and unions like `any | string` that resolve to
 * `any`/`unknown` without including `Promise`/`PromiseLike`. Does NOT flag type
 * aliases like `Awaitable<T>` or unions like `any | Promise<any>` that explicitly
 * handle promise returns.
 *
 * @param checker - TypeScript type checker.
 * @param sig - The call signature to inspect.
 * @returns `true` if the return type is unsafe for async callbacks.
 */
function isUnsafeReturnSignature(checker: TypeChecker, sig: Signature): boolean {
  const returnType = checker.getReturnTypeOfSignature(sig);

  // eslint-disable-next-line no-bitwise -- Bitwise flag check is idiomatic for TypeScript compiler API.
  if (!(returnType.flags & UNSAFE_RETURN_FLAGS)) {
    return false;
  }

  // Check the syntactic return type annotation. If it contains a reference to
  // Promise/PromiseLike (directly or via a type alias), the caller explicitly
  // handles async returns and should not be flagged.
  const declaration = sig.getDeclaration();
  const returnTypeNode = declaration.type;
  assertNonNullable(returnTypeNode, 'Signature declarations with any/unknown return always have a return type annotation');

  return !containsPromiseReference(checker, returnTypeNode);
}

/**
 * ESLint rule disallowing async functions passed as callbacks to parameters with an `any` or `unknown` return type, where the returned promise is silently dropped.
 */
export const noAsyncCallbackToUnsafeReturn: Rule.RuleModule = {
  create(context) {
    const services = context.sourceCode.parserServices as ParserServicesWithTypeInformation;
    const checker = services.program.getTypeChecker();

    return {
      CallExpression(node: Rule.Node): void {
        const callNode = node as TSESTree.CallExpression;

        for (let index = 0; index < callNode.arguments.length; index++) {
          const argument = callNode.arguments[index];
          if (!argument || !isAsyncFunctionNode(argument)) {
            continue;
          }

          const tsCalleeNode = services.esTreeNodeToTSNodeMap.get(callNode.callee);
          const calleeType = checker.getTypeAtLocation(tsCalleeNode);

          for (const sig of calleeType.getCallSignatures()) {
            const parameter = sig.getParameters()[index];
            if (!parameter) {
              continue;
            }

            const parameterType = checker.getTypeOfSymbol(parameter);

            if (hasUnsafeReturnCallSignature(checker, parameterType)) {
              context.report({
                messageId: MESSAGE_ID,
                node: argument
              });
              break;
            }
          }
        }
      }
    };
  },
  meta: {
    docs: {
      description: 'Disallow passing async functions as callbacks to parameters with `any` or `unknown` return type'
    },
    messages: {
      [MESSAGE_ID]: 'Async function passed as callback to a parameter with `any`/`unknown` return type. This may cause unhandled promise rejections. Wrap the call: `(...args) => { yourAsyncFn(...args); }`.'
    },
    schema: [],
    type: 'problem'
  }
};
