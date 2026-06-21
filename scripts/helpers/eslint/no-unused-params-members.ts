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

const PARAMS_OPTIONS_SUFFIX_PATTERN = /(?:Params|Options)$/;

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

type ParamBinding = IdentifierBinding | PatternBinding;

interface ParamInfo {
  readonly binding: ParamBinding;
  readonly typeName: string;
}

interface PatternBinding {
  pattern: Rule.Node;
  type: 'pattern';
}

export const noUnusedParamsMembers: Rule.RuleModule = {
  create(context) {
    const interfaceKeyNodes = new Map<string, Map<string, Rule.Node>>();
    const usageByInterface = new Map<string, InterfaceUsage>();

    return {
      ':function'(node: Rule.Node): void {
        for (const param of record(node)['params'] as Rule.Node[]) {
          const info = getParamInfo(param);
          if (!info) {
            continue;
          }

          const usage = getOrCreateUsage(info.typeName);
          if (info.binding.type === 'pattern') {
            collectPatternMembers(info.binding.pattern, usage);
          } else {
            collectReferenceMembers(context.sourceCode.getScope(node), info.binding.name, usage);
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
      [MESSAGE_ID]:
        'Member "{{ member }}" of "{{ interfaceName }}" is never accessed by the function that receives it. Remove it (the compiler will catch it if it is still needed elsewhere).'
    },
    schema: [],
    type: 'suggestion'
  }
};

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
  const computed = record(node)['computed'] === true;
  const property = record(node)['property'] as Rule.Node;
  if (property.type === 'Identifier') {
    if (!computed) {
      usage.used.add(record(property)['name'] as string);
    }
    return;
  }

  if (property.type === 'Literal') {
    const value = record(property)['value'];
    if (typeof value === 'string') {
      usage.used.add(value);
    }
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

function collectReferenceMembers(scope: Scope.Scope, paramName: string, usage: InterfaceUsage): void {
  const variable = ensureNonNullable(scope.set.get(paramName), `Parameter "${paramName}" is missing from the function scope.`);
  for (const reference of variable.references) {
    classifyReference(reference.identifier, usage);
  }
}

function ensureNonNullable<T>(value: null | T | undefined, errorMessage: string): T {
  if (value === null || value === undefined) {
    throw new Error(errorMessage);
  }
  return value;
}

function getInterfaceMembers(node: Rule.Node): Map<string, Rule.Node> {
  const members = new Map<string, Rule.Node>();
  const interfaceBody = record(node)['body'] as Rule.Node;
  for (const signature of record(interfaceBody)['body'] as Rule.Node[]) {
    if (nodeType(signature) !== 'TSPropertySignature' && nodeType(signature) !== 'TSMethodSignature') {
      continue;
    }
    if (record(signature)['computed'] === true) {
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

function getParamInfo(param: Rule.Node): ParamInfo | undefined {
  const actualParam = nodeType(param) === 'TSParameterProperty' ? record(param)['parameter'] as Rule.Node : param;

  const typeName = getTypeReferenceName(actualParam);
  if (!typeName || !PARAMS_OPTIONS_SUFFIX_PATTERN.test(typeName)) {
    return undefined;
  }

  if (actualParam.type === 'Identifier') {
    return { binding: { name: record(actualParam)['name'] as string, type: 'identifier' }, typeName };
  }

  if (actualParam.type === 'ObjectPattern') {
    return { binding: { pattern: actualParam, type: 'pattern' }, typeName };
  }

  return undefined;
}

function getTypeReferenceName(param: Rule.Node): string | undefined {
  const annotation = record(param)['typeAnnotation'];
  if (!isNode(annotation)) {
    return undefined;
  }

  const typeNode = record(annotation)['typeAnnotation'] as Rule.Node;
  if (nodeType(typeNode) !== 'TSTypeReference') {
    return undefined;
  }

  const typeName = record(typeNode)['typeName'] as Rule.Node;
  if (typeName.type !== 'Identifier') {
    return undefined;
  }
  return record(typeName)['name'] as string;
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
