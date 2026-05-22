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
export function buildTypeParamMap(baseInfo: TypeInfo, typeArgs: string[]): Map<string, string> {
  const mapping = new Map<string, string>();
  const count = Math.min(baseInfo.typeParameters.length, typeArgs.length);
  for (let i = 0; i < count; i++) {
    const param = baseInfo.typeParameters[i];
    const arg = typeArgs[i];
    if (param && arg) {
      const bareParam = param.replace(/\s+extends\s+.*$/, '');
      mapping.set(bareParam, arg);
    }
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
    const info = extractMethodInfo(method, isOfficial);
    const existingByKey = target.methods.find((m) => m.overloadKey === info.overloadKey);
    const existingExact = target.methods.find((m) => m.name === info.name && m.signature === info.signature);
    if (existingExact) {
      if (!isOfficial && info.description) {
        existingExact.description = info.description;
      }
    } else if (existingByKey && !isOfficial) {
      const idx = target.methods.indexOf(existingByKey);
      target.methods[idx] = info;
    } else if (!existingByKey) {
      target.methods.push(info);
    }
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
    const info = extractMethodSignatureInfo(method, isOfficial);
    // Strip __ suffix for matching: getSuggestions__ should match getSuggestions
    const baseName = info.name.replace(/__$/, '');
    const baseKey = info.overloadKey.replace(/__(?=\(|$)/, '');
    // Deduplicate by overload key — prefer our (unofficial) version over official
    const existingByKey = target.methods.find((m) => m.overloadKey === info.overloadKey || m.overloadKey === baseKey);
    const existingExact = target.methods.find((m) => m.name === info.name && m.signature === info.signature);
    if (existingExact) {
      if (!isOfficial && info.description) {
        existingExact.description = info.description;
      }
    } else if (existingByKey && !isOfficial) {
      // Replace official version with our augmented version (more precise types/docs)
      // Keep the official name (without __) but use our description, examples, etc.
      const idx = target.methods.indexOf(existingByKey);
      target.methods[idx] = {
        ...info,
        name: baseName,
        overloadKey: baseKey,
        signature: info.signature.replace(new RegExp(`^${info.name}`), baseName)
      };
    } else if (!existingByKey) {
      target.methods.push(info);
    }
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
  const args: string[] = [];
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
      args.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    args.push(current.trim());
  }
  return args;
}

export function resolveInheritedMembers(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const baseTypeName of [...info.baseTypes, ...info.implementsTypes]) {
      const cleanBase = baseTypeName.replace(/<.*>$/, '').trim();
      const baseInfo = types.get(cleanBase);
      if (!baseInfo) {
        continue;
      }

      const typeArgs = parseTypeArguments(baseTypeName);
      const typeParamMap = buildTypeParamMap(baseInfo, typeArgs);

      for (const prop of baseInfo.properties) {
        if (!info.properties.some((p) => p.name === prop.name)) {
          info.properties.push(substituteMemberTypes({ ...prop, inheritedFrom: cleanBase }, typeParamMap));
        }
      }

      for (const method of baseInfo.methods) {
        if (!info.methods.some((m) => m.name === method.name && m.signature === method.signature)) {
          info.methods.push(substituteMemberTypes({ ...method, inheritedFrom: cleanBase }, typeParamMap));
        }
      }
    }
  }
}

/** Apply type parameter substitution to all type-bearing fields of a member */
export function substituteMemberTypes(member: MemberInfo, mapping: Map<string, string>): MemberInfo {
  if (mapping.size === 0) {
    return member;
  }
  return {
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

/** Substitute generic type parameters in a type string using a mapping */
export function substituteTypeParams(typeText: string, mapping: Map<string, string>): string {
  if (mapping.size === 0) {
    return typeText;
  }
  return typeText.replace(/\b(?<typeName>[a-zA-Z][a-zA-Z0-9]*)\b/g, (match) => {
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
