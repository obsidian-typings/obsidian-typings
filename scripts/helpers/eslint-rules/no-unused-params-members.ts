/**
 * @file
 *
 * ESLint rule: no-unused-params-members
 *
 * Flags members of a `*Params` / `*Options` parameter-bag interface that are
 * never accessed within the function/method/constructor that receives the
 * interface as a parameter.
 *
 * Detection is per-function, using scope analysis to find the real references
 * to the parameter (not unrelated same-named identifiers). A member counts as
 * used when it is referenced by name — `params.member`, `params['member']`, or
 * `const { member } = params` (plus a destructured signature
 * `fn({ member }: FooParams)`).
 *
 * Crucially, if the object ever ESCAPES whole — spread (`{ ...params }`), rest
 * (`const { ...rest } = params`), passed as an argument (`f(params)`), returned,
 * or stored (`this.params = params`) — every member is treated as used and
 * nothing is reported for that interface. Such an escape either reads every
 * member (spread/rest) or hands the object to code this rule cannot see, so
 * member deadness cannot be decided locally.
 *
 * A member is therefore flagged only when it is never referenced by name AND
 * the object never escapes — i.e. the "a `params.x` usage was deleted but `x`
 * was left on the interface" case. A member that is actually still needed (read
 * via an escape) is never wrongly flagged; a member that is escaped but dead
 * downstream is a tolerated false negative (its deadness is not local).
 *
 * Only interfaces declared in the same file are checked; an imported parameter
 * type is skipped. Only identifier-named members are tracked.
 */

import type {
  Rule,
  Scope
} from 'eslint';

import { ensureNonNullable } from '../type-guards.ts';

const PARAMS_OPTIONS_SUFFIX_PATTERN = /(?:Params|Options)$/;

/**
Message ID reported when a `*Params`/`*Options` interface member is never accessed by the function that receives it.
 */
export const MESSAGE_ID = 'unusedParamsMember';

interface IdentifierBinding {
  name: string;
  type: 'identifier';
}

interface InterfaceUsage {
  readonly used: Set<string>;
  usesAll: boolean;
}

interface MaybeTypedNode {
  type?: unknown;
}

type ParameterBinding = IdentifierBinding | PatternBinding;

interface ParameterInfo {
  readonly binding: ParameterBinding;
  readonly typeName: string;
}

interface PatternBinding {
  pattern: Rule.Node;
  type: 'pattern';
}

/**
 * ESLint rule flagging `*Params`/`*Options` interface members that the function receiving them never accesses.
 */
export const noUnusedParamsMembers: Rule.RuleModule = {
  create(context) {
    const interfaceKeyNodes = new Map<string, Map<string, Rule.Node>>();
    const usageByInterface = new Map<string, InterfaceUsage>();

    return {
      ':function'(node: Rule.Node): void {
        for (const parameter of record(node)['params'] as Rule.Node[]) {
          const info = getParameterInfo(parameter);
          if (!info) {
            continue;
          }

          const usage = getOrCreateUsage(info.typeName);
          if (info.binding.type === 'pattern') {
            collectPatternMembers(info.binding.pattern, usage);
          } else {
            collectReferenceMembers({
              parameterName: info.binding.name,
              scope: context.sourceCode.getScope(node),
              usage
            });
          }
        }
      },
      'Program:exit'(): void {
        for (const [typeName, keyNodes] of interfaceKeyNodes) {
          const usage = usageByInterface.get(typeName);
          if (!usage || usage.usesAll) {
            continue;
          }

          for (const [memberName, keyNode] of keyNodes) {
            if (!usage.used.has(memberName)) {
              context.report({
                data: {
                  interfaceName: typeName,
                  member: memberName
                },
                messageId: MESSAGE_ID,
                node: keyNode
              });
            }
          }
        }
      },
      TSInterfaceDeclaration(node: Rule.Node): void {
        const name = getInterfaceName(node);
        if (!PARAMS_OPTIONS_SUFFIX_PATTERN.test(name)) {
          return;
        }
        interfaceKeyNodes.set(name, getInterfaceMembers(node));
      }
    };

    function getOrCreateUsage(typeName: string): InterfaceUsage {
      let usage = usageByInterface.get(typeName);
      if (!usage) {
        usage = { used: new Set<string>(), usesAll: false };
        usageByInterface.set(typeName, usage);
      }
      return usage;
    }
  },
  meta: {
    docs: {
      description: 'Flag `*Params`/`*Options` interface members never accessed by the function that receives them'
    },
    messages: {
      [MESSAGE_ID]: 'Member "{{ member }}" of "{{ interfaceName }}" is never accessed by the function that receives it. Remove it (the compiler will catch it if it is still needed elsewhere).'
    },
    schema: [],
    type: 'suggestion'
  }
};

/**
 * Parameters for {@link collectReferenceMembers}.
 */
interface CollectReferenceMembersParams {
  /**
   * The name of the parameter whose references are inspected.
   */
  readonly parameterName: string;

  /**
   * The scope in which the parameter is bound.
   */
  readonly scope: Scope.Scope;

  /**
   * The usage accumulator to record accessed members into.
   */
  readonly usage: InterfaceUsage;
}

function classifyReference(reference: object, usage: InterfaceUsage): void {
  const parent = record(reference)['parent'] as Rule.Node;
  if (parent.type === 'MemberExpression' && record(parent)['object'] === reference) {
    collectMemberAccess(parent, usage);
    return;
  }

  if (parent.type === 'VariableDeclarator' && record(parent)['init'] === reference && (record(parent)['id'] as Rule.Node).type === 'ObjectPattern') {
    collectPatternMembers(record(parent)['id'] as Rule.Node, usage);
    return;
  }

  // The object escapes whole (passed as an argument, returned, stored, spread, ...): every member may be read elsewhere.
  usage.usesAll = true;
}

function collectMemberAccess(node: Rule.Node, usage: InterfaceUsage): void {
  const isComputed = record(node)['computed'] === true;
  const property = record(node)['property'] as Rule.Node;
  if (property.type === 'Identifier') {
    if (!isComputed) {
      usage.used.add(record(property)['name'] as string);
    }
    return;
  }

  if (property.type !== 'Literal') {
    return;
  }

  const value = record(property)['value'];
  if (typeof value === 'string') {
    usage.used.add(value);
  }
}

function collectPatternMembers(pattern: Rule.Node, usage: InterfaceUsage): void {
  for (const property of record(pattern)['properties'] as Rule.Node[]) {
    if (property.type !== 'Property') {
      // `const { ...rest } = params` reads every remaining member.
      usage.usesAll = true;
      continue;
    }
    if (record(property)['computed'] === true) {
      continue;
    }
    const key = record(property)['key'] as Rule.Node;
    if (key.type === 'Identifier') {
      usage.used.add(record(key)['name'] as string);
    }
  }
}

function collectReferenceMembers(params: CollectReferenceMembersParams): void {
  const { parameterName, scope, usage } = params;
  const variable = ensureNonNullable(scope.set.get(parameterName));
  for (const reference of variable.references) {
    classifyReference(reference.identifier, usage);
  }
}

function getInterfaceMembers(node: Rule.Node): Map<string, Rule.Node> {
  const members = new Map<string, Rule.Node>();
  const interfaceBody = record(node)['body'] as Rule.Node;
  for (const signature of record(interfaceBody)['body'] as Rule.Node[]) {
    if ((nodeType(signature) !== 'TSPropertySignature' && nodeType(signature) !== 'TSMethodSignature') || (record(signature)['computed'] === true)) {
      continue;
    }
    const key = record(signature)['key'] as Rule.Node;
    if (key.type === 'Identifier') {
      members.set(record(key)['name'] as string, key);
    }
  }
  return members;
}

function getInterfaceName(node: Rule.Node): string {
  const id = record(node)['id'] as Rule.Node;
  return record(id)['name'] as string;
}

function getParameterInfo(parameter: Rule.Node): ParameterInfo | undefined {
  const actualParameter = nodeType(parameter) === 'TSParameterProperty' ? record(parameter)['parameter'] as Rule.Node : parameter;

  const typeName = getTypeReferenceName(actualParameter);
  if (!typeName || !PARAMS_OPTIONS_SUFFIX_PATTERN.test(typeName)) {
    return undefined;
  }

  if (actualParameter.type === 'Identifier') {
    return { binding: { name: record(actualParameter)['name'] as string, type: 'identifier' }, typeName };
  }

  return actualParameter.type === 'ObjectPattern' ? { binding: { pattern: actualParameter, type: 'pattern' }, typeName } : undefined;
}

function getTypeReferenceName(parameter: Rule.Node): string | undefined {
  const annotation = record(parameter)['typeAnnotation'];
  if (!isNode(annotation)) {
    return undefined;
  }

  const typeNode = record(annotation)['typeAnnotation'] as Rule.Node;
  if (nodeType(typeNode) !== 'TSTypeReference') {
    return undefined;
  }

  const typeName = record(typeNode)['typeName'] as Rule.Node;
  return typeName.type === 'Identifier' ? (record(typeName)['name'] as string) : undefined;
}

function isNode(value: unknown): value is Rule.Node {
  return typeof value === 'object' && value !== null && typeof (value as MaybeTypedNode).type === 'string';
}

function nodeType(node: Rule.Node): string {
  return record(node)['type'] as string;
}

function record(node: object): Record<string, unknown> {
  return node as Record<string, unknown>;
}
