import type {
  ClassDeclaration,
  InterfaceDeclaration,
  JSDocableNode,
  MethodDeclaration,
  MethodSignature,
  PropertyDeclaration,
  PropertySignature,
  SourceFile
} from 'ts-morph';

import type {
  MemberInfo,
  ReturnTypeProvider,
  TypeInfo
} from './api-doc-types.ts';

import {
  computeOverloadKey,
  foldTsDocParagraphs,
  simplifyType
} from './api-doc-text-utils.ts';

export function checkIsOfficial(node: JSDocableNode, defaultIsOfficial: boolean): boolean {
  const docs = node.getJsDocs();
  for (const doc of docs) {
    const tags = doc.getTags();
    if (tags.some((t) => t.getTagName() === 'unofficial')) {
      return false;
    }
    if (tags.some((t) => t.getTagName() === 'official')) {
      return true;
    }
  }
  return defaultIsOfficial;
}

export function extractClassInfo(cls: ClassDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  const name = cls.getName() ?? 'Unknown';
  return {
    baseTypes: cls.getExtends() ? [cls.getExtends()?.getText() ?? ''] : [],
    description: getDescription(cls),
    examples: getExamples(cls),
    implementsTypes: cls.getImplements().map((i) => i.getText()),
    isOfficial,
    kind: 'class',
    methods: cls.getMethods().map((m) => extractMethodInfo(m, isOfficial)),
    name,
    namespace,
    properties: cls.getProperties().map((p) => extractPropertyInfo(p, isOfficial)),
    remarks: getRemarks(cls),
    typeParameters: cls.getTypeParameters().map((tp) => tp.getText())
  };
}

export function extractInterfaceInfo(iface: InterfaceDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  return {
    baseTypes: iface.getExtends().map((e) => e.getText()),
    description: getDescription(iface),
    examples: getExamples(iface),
    implementsTypes: [],
    isOfficial,
    kind: 'interface',
    methods: iface.getMethods().map((m) => extractMethodSignatureInfo(m, isOfficial)),
    name: iface.getName(),
    namespace,
    properties: iface.getProperties().map((p) => extractPropertySignatureInfo(p, isOfficial)),
    remarks: getRemarks(iface),
    typeParameters: iface.getTypeParameters().map((tp) => tp.getText())
  };
}

export function extractMethodInfo(method: MethodDeclaration, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const paramDescriptions = getParamDescriptions(method);
  const params = method.getParameters().map((p) => {
    const isOptional = p.isOptional();
    const optionalSuffix = isOptional ? '?' : '';
    return {
      description: paramDescriptions.get(p.getName()) ?? (isOptional ? '*(Optional)*' : ''),
      name: `${p.getName()}${optionalSuffix}`,
      type: simplifyType(p.getType().getText())
    };
  });
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  const info: MemberInfo = {
    description: getDescription(method),
    examples: getExamples(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    isStatic: false,
    name,
    overloadKey: '',
    parameters: params,
    remarks: getRemarks(method),
    returnDescription: getReturnDescription(method),
    returnType: getDeclaredReturnType(method),
    signature: `${name}(${paramStr})`,
    since: getSince(method),
    type: ''
  };
  info.overloadKey = computeOverloadKey(info);
  return info;
}

export function extractMethodSignatureInfo(method: MethodSignature, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const paramDescriptions = getParamDescriptions(method);
  const params = method.getParameters().map((p) => {
    const isOptional = p.isOptional();
    const optionalSuffix = isOptional ? '?' : '';
    return {
      description: paramDescriptions.get(p.getName()) ?? (isOptional ? '*(Optional)*' : ''),
      name: `${p.getName()}${optionalSuffix}`,
      type: simplifyType(p.getType().getText())
    };
  });
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  const info: MemberInfo = {
    description: getDescription(method),
    examples: getExamples(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    isStatic: false,
    name,
    overloadKey: '',
    parameters: params,
    remarks: getRemarks(method),
    returnDescription: getReturnDescription(method),
    returnType: getDeclaredReturnType(method),
    signature: `${name}(${paramStr})`,
    since: getSince(method),
    type: ''
  };
  info.overloadKey = computeOverloadKey(info);
  return info;
}

export function extractPropertyInfo(prop: PropertyDeclaration, isOfficial: boolean): MemberInfo {
  const name = prop.getName();
  const isOptional = prop.hasQuestionToken();
  const optionalSuffix = isOptional ? '?' : '';
  return {
    description: getDescription(prop),
    examples: getExamples(prop),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    isStatic: false,
    name: `${name}${optionalSuffix}`,
    overloadKey: '',
    parameters: [],
    remarks: getRemarks(prop),
    returnDescription: '',
    returnType: '',
    signature: `${name}${optionalSuffix}`,
    since: getSince(prop),
    type: getPropertyType(prop)
  };
}

export function extractPropertySignatureInfo(prop: PropertySignature, isOfficial: boolean): MemberInfo {
  const name = prop.getName();
  const isOptional = prop.hasQuestionToken();
  const optionalSuffix = isOptional ? '?' : '';
  return {
    description: getDescription(prop),
    examples: getExamples(prop),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    isStatic: false,
    name: `${name}${optionalSuffix}`,
    overloadKey: '',
    parameters: [],
    remarks: getRemarks(prop),
    returnDescription: '',
    returnType: '',
    signature: `${name}${optionalSuffix}`,
    since: getSince(prop),
    type: getPropertyType(prop)
  };
}

/** Pick the highest-numbered constructorN__ pseudo-method (matches ExtractConstructor logic) */
export function getConstructorMethod(methods: MemberInfo[]): MemberInfo | undefined {
  const constructors = methods.filter((m) => /^constructor\d*__$/.test(m.name));
  if (constructors.length === 0) {
    return undefined;
  }
  return constructors.sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, '') || '0', 10);
    const numB = parseInt(b.name.replace(/\D/g, '') || '0', 10);
    return numB - numA;
  })[0];
}

/** Get the return type as declared in source (preserves union order), falling back to resolved type */
export function getDeclaredReturnType(method: ReturnTypeProvider): string {
  const annotation = method.getReturnTypeNode?.()?.getText();
  if (annotation) {
    return simplifyType(annotation);
  }
  return simplifyType(method.getReturnType().getText());
}

export function getDescription(node: JSDocableNode): string {
  const docs = node.getJsDocs();
  if (docs.length === 0) {
    return '';
  }
  const raw = docs[docs.length - 1]?.getDescription().trim() ?? '';
  return foldTsDocParagraphs(raw);
}

/** Extract @example blocks from JSDoc */
export function getExamples(node: JSDocableNode): string[] {
  const examples: string[] = [];
  for (const doc of node.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'example') {
        const text = tag.getCommentText()?.trim() ?? '';
        if (text) {
          examples.push(text);
        }
      }
    }
  }
  return examples;
}

/** Extract @param descriptions from JSDoc tags */
export function getParamDescriptions(node: JSDocableNode): Map<string, string> {
  const result = new Map<string, string>();
  const docs = node.getJsDocs();
  for (const doc of docs) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'param') {
        // Use getCommentText() for clean description without JSDoc artifacts
        const comment = foldTsDocParagraphs(tag.getCommentText()?.trim().replace(/\s*\*\s*$/g, '').replace(/^-\s*/, '').trim() ?? '');
        // Get param name from the tag structure
        const tagText = tag.getText();
        const nameMatch = /@param\s+(?:\{[^}]*\}\s+)?(?<paramName>\w+)/.exec(tagText);
        if (nameMatch?.groups) {
          result.set(nameMatch.groups['paramName'] ?? '', comment);
        }
      }
    }
  }
  return result;
}

/** Strip `| undefined` only when it was implicitly added by ts-morph for optional properties */
export function getPropertyType(prop: PropertyDeclaration | PropertySignature): string {
  // Use the type node text (what's written in source) if available, otherwise fall back to resolved type
  const typeNode = prop.getTypeNode();
  if (typeNode) {
    return resolveTypeofAliases(simplifyType(typeNode.getText()), prop.getSourceFile());
  }
  return simplifyType(prop.getType().getText());
}

/** Extract @remarks text from JSDoc */
export function getRemarks(node: JSDocableNode): string {
  for (const doc of node.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'remarks' || tag.getTagName() === 'remark') {
        return foldTsDocParagraphs(tag.getCommentText()?.trim().replace(/\s*\*\s*$/g, '').trim() ?? '');
      }
    }
  }
  return '';
}

/** Extract @returns description from JSDoc */
export function getReturnDescription(node: JSDocableNode): string {
  for (const doc of node.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'returns') {
        return foldTsDocParagraphs(tag.getCommentText()?.trim().replace(/^-\s*/, '').replace(/\s*\*\s*$/g, '').trim() ?? '');
      }
    }
  }
  return '';
}

/** Extract @since version from JSDoc */
export function getSince(node: JSDocableNode): string {
  for (const doc of node.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === 'since') {
        return tag.getCommentText()?.trim().replace(/\s*\*\s*$/g, '').trim() ?? '';
      }
    }
  }
  return '';
}

/**
 * Resolve `typeof aliasName` patterns where aliasName is an import alias.
 * E.g., `typeof momentInstance` → `typeof moment` when `import { moment as momentInstance }`.
 */
export function resolveTypeofAliases(typeText: string, sourceFile: SourceFile): string {
  return typeText.replace(/\btypeof (?<alias>[a-zA-Z][a-zA-Z0-9]*)\b/g, (match, alias: string) => {
    for (const importDecl of sourceFile.getImportDeclarations()) {
      for (const namedImport of importDecl.getNamedImports()) {
        if (namedImport.getAliasNode()?.getText() === alias) {
          return `typeof ${namedImport.getName()}`;
        }
      }
    }
    return match;
  });
}
