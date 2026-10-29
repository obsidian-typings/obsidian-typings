import type {
  ClassDeclaration,
  InterfaceDeclaration
} from 'ts-morph';

import type {
  MemberInfo,
  TypeInfo
} from './api-doc-types.ts';

import {
  extractMethodInfo,
  extractMethodSignatureInfo,
  extractPropertyInfo,
  extractPropertySignatureInfo,
  getDescription,
  getExamples,
  getRemarks
} from './api-doc-jsdoc.ts';

/**
 * Build a mapping from parent type parameter names to concrete type arguments.
 * E.g., parent has `typeParameters: ['Instance extends BaseInstance']` and
 * child extends `Parent<CanvasPluginInstance>` → `{Instance: 'CanvasPluginInstance'}`
 */
export function buildTypeParamMap(baseInfo: TypeInfo, typeArguments: string[]): Map<string, string> {
  const mapping = new Map<string, string>();
  const count = Math.min(baseInfo.typeParameters.length, typeArguments.length);
  for (let index = 0; index < count; index++) {
    const param = baseInfo.typeParameters[index];
    const argument = typeArguments[index];
    if (!param || !argument) {
      continue;
    }

    const bareParam = param.replace(/\s+extends\s+.*$/, '');
    mapping.set(bareParam, argument);
  }
  return mapping;
}

export function mergeClassIntoType(target: TypeInfo, cls: ClassDeclaration, isOfficial: boolean): void {
  if (target.typeParameters.length === 0) {
    const typeParams = cls.getTypeParameters().map((tp) => tp.getText());
    if (typeParams.length > 0) {
      target.typeParameters = typeParams;
    }
  }
  for (const method of cls.getMethods()) {
    mergeMethodOverload(target, extractMethodInfo(method, isOfficial), isOfficial);
  }
  for (const prop of cls.getProperties()) {
    const info = extractPropertyInfo(prop, isOfficial);
    const existing = target.properties.find((p) => p.name === info.name);
    if (existing) {
      if (!isOfficial && info.description) {
        existing.description = info.description;
      }
    } else {
      target.properties.push(info);
    }
  }
  const desc = getDescription(cls);
  if (!isOfficial && desc) {
    target.description = desc;
  }
}

export function mergeInterfaceIntoType(target: TypeInfo, iface: InterfaceDeclaration, isOfficial: boolean): void {
  if (target.typeParameters.length === 0) {
    const typeParams = iface.getTypeParameters().map((tp) => tp.getText());
    if (typeParams.length > 0) {
      target.typeParameters = typeParams;
    }
  }
  for (const method of iface.getMethods()) {
    mergeMethodOverload(target, extractMethodSignatureInfo(method, isOfficial), isOfficial);
  }
  for (const prop of iface.getProperties()) {
    const info = extractPropertySignatureInfo(prop, isOfficial);
    const propBaseName = info.name.replace(/__$/, '');
    const existing = target.properties.find((p) => p.name === info.name || p.name === propBaseName);
    if (existing) {
      if (!isOfficial) {
        // Replace official version with our augmented version
        Object.assign(existing, { ...info, name: propBaseName });
      }
    } else {
      target.properties.push(info);
    }
  }
  const desc = getDescription(iface);
  if (!isOfficial && desc) {
    target.description = desc;
  }
  const examples = getExamples(iface);
  if (!isOfficial && examples.length > 0) {
    target.examples = examples;
  }
  const remarks = getRemarks(iface);
  if (!isOfficial && remarks) {
    target.remarks = remarks;
  }
}

/**
 * Members an augmentation has already redeclared, so a later redeclaration of the same overload key picks a different
 * official overload instead of overwriting this one.
 */
const redeclaredMembers = new WeakSet<MemberInfo>();

/**
 * Merge one method signature into a type, keeping every overload. TypeScript merges each declaration of a method into
 * one overload list, so every declaration is a callable signature. The one exception is an augmentation member tagged
 * `@official` (or named with the `__` suffix): it redeclares an official overload with more precise types and docs, so
 * it replaces the official overload it matches - same parameter names, else same parameter count, else the first one
 * left - rather than adding a near-duplicate beside it.
 */
export function mergeMethodOverload(target: TypeInfo, info: MemberInfo, isOfficial: boolean): void {
  // Strip __ suffix for matching: getSuggestions__ should match getSuggestions
  const baseName = info.name.replace(/__$/, '');
  const baseKey = info.overloadKey.replace(/__(?=\(|$)/, '');
  const existingExact = target.methods.find((m) => m.name === info.name && m.signature === info.signature);
  if (existingExact) {
    if (!isOfficial && info.description) {
      existingExact.description = info.description;
    }
    if (!isOfficial) {
      redeclaredMembers.add(existingExact);
    }
    return;
  }

  const isRedeclaration = !isOfficial && (info.isOfficial || baseName !== info.name);
  const replaced = isRedeclaration ? findRedeclaredOverload(target.methods, info, baseKey) : undefined;
  if (!replaced) {
    target.methods.push(info);
    if (!isOfficial) {
      redeclaredMembers.add(info);
    }
    return;
  }

  // Keep the official name (without __) but use our description, examples, etc.
  const merged: MemberInfo = {
    ...info,
    name: baseName,
    overloadKey: baseKey,
    // A function replacer, not a string one: a `$` in `baseName` would otherwise be read as a
    // replacement pattern rather than as itself.
    signature: info.signature.replace(new RegExp(`^${info.name}`), () => baseName)
  };
  target.methods[target.methods.indexOf(replaced)] = merged;
  redeclaredMembers.add(merged);
}

/**
 * Parse generic type arguments from a base type expression.
 * E.g., `InternalPlugin<CanvasPluginInstance>` → `['CanvasPluginInstance']`
 * Handles nested angle brackets: `Foo<Bar<Baz>, Qux>` → `['Bar<Baz>', 'Qux']`
 */
export function parseTypeArguments(baseTypeName: string): string[] {
  const openIndex = baseTypeName.indexOf('<');
  if (openIndex === -1) {
    return [];
  }
  const inner = baseTypeName.slice(openIndex + 1, -1);
  const arguments_: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of inner) {
    if (ch === '<') {
      depth++;
      current += ch;
    } else if (ch === '>') {
      depth--;
      current += ch;
    } else if (ch === ',' && depth === 0) {
      arguments_.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    arguments_.push(current.trim());
  }
  return arguments_;
}

export function resolveInheritedMembers(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const baseTypeName of [...info.baseTypes, ...info.implementsTypes]) {
      const cleanBase = baseTypeName.replace(/<.*>$/, '').trim();
      const baseInfo = types.get(cleanBase);
      if (!baseInfo) {
        continue;
      }

      const typeArguments = parseTypeArguments(baseTypeName);
      const typeParamMap = buildTypeParamMap(baseInfo, typeArguments);

      for (const prop of baseInfo.properties) {
        if (info.properties.every((p) => p.name !== prop.name)) {
          info.properties.push(substituteMemberTypes({ ...prop, inheritedFrom: cleanBase }, typeParamMap));
        }
      }

      for (const method of baseInfo.methods) {
        if (info.methods.every((m) => !(m.name === method.name && m.signature === method.signature))) {
          info.methods.push(substituteMemberTypes({ ...method, inheritedFrom: cleanBase }, typeParamMap));
        }
      }
    }
  }
}

/**
Apply type parameter substitution to all type-bearing fields of a member
*/
export function substituteMemberTypes(member: MemberInfo, mapping: Map<string, string>): MemberInfo {
  return mapping.size === 0
    ? member
    : {
      ...member,
      parameters: member.parameters.map((p) => ({
        ...p,
        type: substituteTypeParams(p.type, mapping)
      })),
      returnType: substituteTypeParams(member.returnType, mapping),
      signature: substituteTypeParams(member.signature, mapping),
      type: substituteTypeParams(member.type, mapping)
    };
}

/**
Substitute generic type parameters in a type string using a mapping
*/
export function substituteTypeParams(typeText: string, mapping: Map<string, string>): string {
  return mapping.size === 0
    ? typeText
    : typeText.replaceAll(/\b(?<typeName>[a-zA-Z][a-zA-Z0-9]*)\b/g, (match) => {
      return mapping.get(match) ?? match;
    });
}

/**
 * Update namespace to the more specific path from source files.
 * Source files in subdirectories (e.g., obsidian/augmentations/components) should
 * override the flat namespace (obsidian/augmentations) assigned from obsidian.d.ts.
 */
export function updateNamespaceIfMoreSpecific(existing: TypeInfo, namespace: string, isOfficial: boolean): void {
  if (!isOfficial && namespace.startsWith(`${existing.namespace}/`)) {
    existing.namespace = namespace;
  }
}

/**
 * Find the official overload an augmentation redeclares: one with the same overload key that no augmentation has
 * redeclared yet, preferring the same parameter names, then the same parameter count.
 */
function findRedeclaredOverload(methods: MemberInfo[], info: MemberInfo, baseKey: string): MemberInfo | undefined {
  const candidates = methods.filter((m) => m.isOfficial && !redeclaredMembers.has(m) && (m.overloadKey === info.overloadKey || m.overloadKey === baseKey));
  const parameterNames = info.parameters.map((p) => p.name).join(',');
  return candidates.find((m) => m.parameters.map((p) => p.name).join(',') === parameterNames)
    ?? candidates.find((m) => m.parameters.length === info.parameters.length)
    ?? candidates[0];
}
