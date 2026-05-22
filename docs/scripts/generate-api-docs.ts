/**
 * Custom API documentation generator.
 *
 * Reads obsidian.d.ts (base types) and our augmentation types,
 * merges them, and generates Starlight-compatible markdown pages.
 */

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

import { createHash } from 'node:crypto';
import {
  existsSync,
  readdirSync,
  readFileSync
} from 'node:fs';
import {
  mkdir,
  rm,
  writeFile
} from 'node:fs/promises';
import {
  basename,
  dirname,
  join,
  relative,
  resolve
} from 'node:path';
import { Project } from 'ts-morph';

interface LinkMatchGroups {
  display?: string;
  target: string;
}

interface MemberInfo {
  description: string;
  examples: string[];
  inheritedFrom: string;
  isOfficial: boolean;
  isStatic: boolean;
  name: string;
  overloadKey: string;
  parameters: ParameterInfo[];
  remarks: string;
  returnDescription: string;
  returnType: string;
  signature: string;
  since: string;
  type: string;
}

interface ParameterInfo {
  description: string;
  name: string;
  type: string;
}

interface TypeInfo {
  baseTypes: string[];
  description: string;
  examples: string[];
  isOfficial: boolean;
  kind: 'class' | 'function' | 'interface' | 'variable';
  methods: MemberInfo[];
  name: string;
  namespace: string;
  properties: MemberInfo[];
  remarks: string;
  typeParameters: string[];
  /** For variables: the declaration keyword (let/const/var) */
  variableKeyword?: string;
  /** For variables: the type annotation */
  variableType?: string;
}

interface WebApiEntry {
  url: string;
}

const CHANNEL = process.env['CURRENT_CHANNEL'] === 'catalyst' ? 'catalyst' : 'public';
const BASE_PATH = process.env['BASE_PATH'] ?? '/obsidian-typings';
const TYPINGS_PACKAGE = `@obsidian-typings/obsidian-${CHANNEL}-latest`;

const OUTPUT_DIR = join(process.cwd(), 'src/content/docs/api');

// Global type map for cross-referencing
let allTypes = new Map<string, TypeInfo>();

function extractClassInfo(cls: ClassDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  const name = cls.getName() ?? 'Unknown';
  return {
    baseTypes: cls.getExtends() ? [cls.getExtends()?.getText() ?? ''] : [],
    description: getDescription(cls),
    examples: getExamples(cls),
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

function extractInterfaceInfo(iface: InterfaceDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  return {
    baseTypes: iface.getExtends().map((e) => e.getText()),
    description: getDescription(iface),
    examples: getExamples(iface),
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

/** Recursively find all .d.ts and .ts source files under a directory */
function findDtsFiles(dir: string): string[] {
  const results: string[] = [];
  const tsFiles: string[] = [];
  const dtsNames = new Set<string>();

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findDtsFiles(fullPath));
    } else if (entry.name.endsWith('.d.ts') && entry.name !== 'index.d.ts') {
      results.push(fullPath);
      dtsNames.add(entry.name.replace(/\.d\.ts$/, ''));
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') && entry.name !== 'index.ts') {
      tsFiles.push(fullPath);
    }
  }

  // Include .ts files only when no corresponding .d.ts exists (e.g., implementation files)
  for (const tsFile of tsFiles) {
    const baseName = basename(tsFile, '.ts');
    if (!dtsNames.has(baseName)) {
      results.push(tsFile);
    }
  }

  return results;
}

const CACHE_FILE = join(process.cwd(), 'src/content/docs/api/.cache-hash');

/**
 * Build a mapping from parent type parameter names to concrete type arguments.
 * E.g., parent has `typeParameters: ['Instance extends BaseInstance']` and
 * child extends `Parent<CanvasPluginInstance>` → `{Instance: 'CanvasPluginInstance'}`
 */
function buildTypeParamMap(baseInfo: TypeInfo, typeArgs: string[]): Map<string, string> {
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

/** Collect functions declared inside module declarations */
function collectModuleFunctions(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const fn of mod.getFunctions()) {
    const name = fn.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(fn);
    const params = fn.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(fn.getReturnType().getText());
    const signature = `${name}(${paramStr})`;
    types.set(name, {
      baseTypes: [],
      description: getDescription(fn),
      examples: getExamples(fn),
      isOfficial: checkIsOfficial(fn, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(fn),
        examples: getExamples(fn),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(fn, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(fn),
        returnDescription: getReturnDescription(fn),
        returnType,
        signature,
        since: getSince(fn),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(fn),
      typeParameters: fn.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/** Collect variable declarations (e.g., const Platform__, let apiVersion__) */
function collectModuleVariables(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const varStmt of mod.getVariableStatements()) {
    const declKind = varStmt.getDeclarationKind();
    for (const decl of varStmt.getDeclarations()) {
      const rawName = decl.getName();
      const name = rawName.replace(/__$/, '');
      if (!name || types.has(name)) {
        continue;
      }
      const varType = simplifyType(decl.getType().getText());
      types.set(name, {
        baseTypes: [],
        description: getDescription(varStmt),
        examples: getExamples(varStmt),
        isOfficial: checkIsOfficial(varStmt, isOfficial),
        kind: 'variable',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(varStmt),
        typeParameters: [],
        variableKeyword: declKind,
        variableType: varType
      });
    }
  }
}

/** Collect static functions from namespace declarations (e.g., namespace App { function getOverrideConfigDir(...) }) */
function collectNamespaceStaticFunctions(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean
): void {
  for (const nestedNs of mod.getModules()) {
    const nsName = nestedNs.getName();
    const parentType = types.get(nsName);
    if (!parentType) {
      continue;
    }
    for (const fn of nestedNs.getFunctions()) {
      const fnName = fn.getName();
      if (!fnName) {
        continue;
      }
      const paramDescriptions = getParamDescriptions(fn);
      const params = fn.getParameters().map((p) => ({
        description: paramDescriptions.get(p.getName()) ?? '',
        name: p.getName(),
        type: simplifyType(p.getType().getText())
      }));
      const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
      const returnType = simplifyType(fn.getReturnType().getText());
      const signature = `${fnName}(${paramStr})`;
      const existing = parentType.methods.find((m) => m.name === fnName);
      if (!existing) {
        parentType.methods.push({
          description: getDescription(fn),
          examples: getExamples(fn),
          inheritedFrom: '',
          isOfficial: checkIsOfficial(fn, isOfficial),
          isStatic: true,
          name: fnName,
          overloadKey: fnName,
          parameters: params,
          remarks: getRemarks(fn),
          returnDescription: getReturnDescription(fn),
          returnType,
          signature: `static ${signature}`,
          since: getSince(fn),
          type: ''
        });
      }
    }
  }
}

/** Compute a hash of all source files + the generator script itself */
function computeCacheHash(srcDir: string): string {
  const hash = createHash('sha256');

  // Hash the generator script itself
  const generatorPath = resolve(import.meta.dirname, 'generate-api-docs.ts');
  hash.update(readFileSync(generatorPath, 'utf-8'));

  // Hash all source .d.ts files
  const dtsFiles = findDtsFiles(srcDir).sort();
  for (const filePath of dtsFiles) {
    hash.update(filePath);
    hash.update(readFileSync(filePath, 'utf-8'));
  }

  return hash.digest('hex');
}

async function main(): Promise<void> {
  loadExternalTypeMaps();

  const rootDir = process.env['TYPINGS_ROOT'] ?? resolve(process.cwd(), '..');
  const srcDir = join(rootDir, 'src');

  // Check cache — skip generation if nothing changed
  const currentHash = computeCacheHash(srcDir);
  if (existsSync(CACHE_FILE) && readFileSync(CACHE_FILE, 'utf-8').trim() === currentHash) {
    console.warn('Source files and generator unchanged — skipping generation.');
    return;
  }

  const project = new Project({ skipAddingFilesFromTsConfig: true });

  // Load official obsidian.d.ts for merging
  const obsidianPath = join(rootDir, 'node_modules/obsidian/obsidian.d.ts');
  let obsidianSrc: SourceFile | undefined;
  try {
    obsidianSrc = project.addSourceFileAtPath(obsidianPath);
  } catch {
    console.warn('obsidian.d.ts not found — base types will not be included.');
  }

  const types = new Map<string, TypeInfo>();

  // Process official obsidian.d.ts first (all types marked as official)
  if (obsidianSrc) {
    processSourceFile(obsidianSrc, types, true, 'obsidian/augmentations');
  }

  // Walk all source .d.ts files
  const dtsFiles = findDtsFiles(srcDir);
  console.warn(`Found ${String(dtsFiles.length)} source .d.ts files`);

  for (const filePath of dtsFiles) {
    const relPath = relative(srcDir, filePath).replace(/\\/g, '/');
    const dirPath = dirname(relPath);
    const src = project.addSourceFileAtPath(filePath);

    // Check if file contains module declarations (augmentations)
    const modules = src.getModules();
    if (modules.length > 0) {
      for (const mod of modules) {
        processModuleDeclaration(mod, types, false, dirPath);
      }
    }

    // Process top-level exports (internals, standalone types)
    processSourceFile(src, types, false, dirPath);
    collectFunctions(src, types, false, dirPath);
  }

  resolveInheritedMembers(types);

  // Sort members alphabetically
  for (const [_name, info] of types) {
    info.properties.sort((a, b) => a.name.localeCompare(b.name));
    info.methods.sort((a, b) => a.name.localeCompare(b.name));
  }

  allTypes = types;

  registerGenericTypeParams(types);

  // Build backlinks map
  const backlinks = buildBacklinks(types);

  await rm(OUTPUT_DIR, { force: true, recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  await generateNamespaceIndexPages(types);

  let pageCount = 0;
  for (const [name, info] of types) {
    if (info.kind !== 'variable' && info.kind !== 'function' && info.properties.length === 0 && info.methods.length === 0 && info.baseTypes.length === 0) {
      continue;
    }
    await generateOverviewPage(name, info, backlinks.get(name) ?? []);
    if (info.kind !== 'function') {
      await generateMemberPages(name, info);
    }
    pageCount++;
  }

  // Generate sidebar JSON for astro config
  await generateSidebarJson(types);

  // Write cache hash on successful generation
  await writeFile(CACHE_FILE, currentHash, 'utf-8');

  console.warn(`Generated docs for ${String(pageCount)} types, ${String(types.size)} total types`);
}

function mergeClassIntoType(target: TypeInfo, cls: ClassDeclaration, isOfficial: boolean): void {
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

function mergeInterfaceIntoType(target: TypeInfo, iface: InterfaceDeclaration, isOfficial: boolean): void {
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
function parseTypeArguments(baseTypeName: string): string[] {
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

function processModuleDeclaration(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const alias of mod.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        examples: getExamples(alias),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(alias),
        typeParameters: alias.getTypeParameters().map((tp) => tp.getText())
      });
    }
  }

  for (const iface of mod.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractInterfaceInfo(iface, isOfficial, namespace));
    }
  }
  for (const cls of mod.getClasses()) {
    const name = cls.getName();
    if (!name) {
      continue;
    }
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeClassIntoType(existing, cls, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
    }
  }

  collectModuleFunctions(mod, types, isOfficial, namespace);
  collectNamespaceStaticFunctions(mod, types, isOfficial);
  collectModuleVariables(mod, types, isOfficial, namespace);
}

function processSourceFile(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  // Collect type aliases and enums for link resolution (they don't generate pages but need to be linkable)
  for (const alias of src.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        examples: getExamples(alias),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(alias),
        typeParameters: alias.getTypeParameters().map((tp) => tp.getText())
      });
    }
  }
  for (const enumDecl of src.getEnums()) {
    const name = enumDecl.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(enumDecl),
        examples: getExamples(enumDecl),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(enumDecl),
        typeParameters: []
      });
    }
  }

  for (const iface of src.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractInterfaceInfo(iface, isOfficial, namespace));
    }
  }

  for (const cls of src.getClasses()) {
    const name = cls.getName();
    if (!name) {
      continue;
    }
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeClassIntoType(existing, cls, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
    }
  }
}

/**
 * Register all type parameter names so renderTypeWithLinks won't hyperlink them.
 * Skip names that are also known types — those should still be linkable.
 */
function registerGenericTypeParams(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const tp of info.typeParameters) {
      // Strip constraints: "T extends Foo" → "T"
      const bareParam = tp.replace(/\s+extends\s+.*$/, '');
      if (!types.has(bareParam)) {
        GENERIC_TYPE_PARAMS.add(bareParam);
      }
    }
  }
}

function resolveInheritedMembers(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const baseTypeName of info.baseTypes) {
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
function substituteMemberTypes(member: MemberInfo, mapping: Map<string, string>): MemberInfo {
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
function substituteTypeParams(typeText: string, mapping: Map<string, string>): string {
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
function updateNamespaceIfMoreSpecific(existing: TypeInfo, namespace: string, isOfficial: boolean): void {
  if (!isOfficial && namespace.startsWith(`${existing.namespace}/`)) {
    existing.namespace = namespace;
  }
}

/** Event-like method names that should be split by string literal first param */
const EVENT_METHODS = new Set(['off', 'on', 'trigger', 'tryTrigger']);

interface ReturnTypeProvider {
  getReturnType(): TextProvider;
  getReturnTypeNode?(): TextProvider | undefined;
}

interface TextProvider {
  getText(): string;
}

/** Build a map of type name → list of type names that reference it */
function buildBacklinks(types: Map<string, TypeInfo>): Map<string, string[]> {
  const backlinks = new Map<string, string[]>();

  for (const [sourceName, info] of types) {
    const referencedTypes = new Set<string>();

    // Base types
    for (const baseType of info.baseTypes) {
      const clean = baseType.replace(/<.*>$/, '').trim();
      if (types.has(clean)) {
        referencedTypes.add(clean);
      }
    }

    // Property types
    for (const prop of info.properties) {
      findTypeReferences(prop.type, types, referencedTypes);
    }

    // Method return types and param types
    for (const method of info.methods) {
      findTypeReferences(method.returnType, types, referencedTypes);
      for (const param of method.parameters) {
        findTypeReferences(param.type, types, referencedTypes);
      }
    }

    for (const ref of referencedTypes) {
      if (ref === sourceName) {
        continue;
      }
      if (!backlinks.has(ref)) {
        backlinks.set(ref, []);
      }
      backlinks.get(ref)?.push(sourceName);
    }
  }

  return backlinks;
}

function checkIsOfficial(node: JSDocableNode, defaultIsOfficial: boolean): boolean {
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

/** Collect standalone functions into the types map for link resolution and doc generation */
function collectFunctions(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  for (const fn of src.getFunctions()) {
    const name = fn.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(fn);
    const params = fn.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(fn.getReturnType().getText());
    const signature = `${name}(${paramStr})`;
    // Store function as a type with a single method representing the function call
    types.set(name, {
      baseTypes: [],
      description: getDescription(fn),
      examples: getExamples(fn),
      isOfficial: checkIsOfficial(fn, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(fn),
        examples: getExamples(fn),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(fn, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(fn),
        returnDescription: getReturnDescription(fn),
        returnType,
        signature,
        since: getSince(fn),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(fn),
      typeParameters: fn.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/** Compute an overload key for methods with distinguishing first param (e.g. on('changed',...)) */
function computeOverloadKey(method: MemberInfo): string {
  if (EVENT_METHODS.has(method.name) && method.parameters.length > 0) {
    const firstParam = method.parameters[0];
    if (firstParam?.type.startsWith('"') || firstParam?.type.startsWith('\'')) {
      const normalizedType = firstParam.type.replace(/"/g, '\'');
      return `${method.name}(${normalizedType})`;
    }
  }
  return method.name;
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

/** Escape text for use inside a JS string within a JSX expression: {...{key: "..."}} */
function escapeJsString(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

/** Escape text for use inside a JSX attribute: attr="..." (MDX uses HTML-style parsing) */
function escapeJsxAttr(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

function escapeMdxAngleBrackets(text: string): string {
  return text.replace(/</g, '\\<').replace(/>/g, '\\>');
}

/** Escape curly braces in MDX markdown content to prevent JSX expression parsing */
function escapeMdxBraces(text: string): string {
  return text.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

function extractMethodInfo(method: MethodDeclaration, isOfficial: boolean): MemberInfo {
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

function extractMethodSignatureInfo(method: MethodSignature, isOfficial: boolean): MemberInfo {
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

function extractPropertyInfo(prop: PropertyDeclaration, isOfficial: boolean): MemberInfo {
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

function extractPropertySignatureInfo(prop: PropertySignature, isOfficial: boolean): MemberInfo {
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

function findTypeReferences(typeText: string, types: Map<string, TypeInfo>, result: Set<string>): void {
  const matches = typeText.matchAll(/\b(?<typeName>[A-Z][a-zA-Z0-9]*)\b/g);
  for (const match of matches) {
    const name = match.groups?.['typeName'] ?? '';
    if (types.has(name)) {
      result.add(name);
    }
  }
}

/** Collapse single newlines within paragraphs to spaces, preserve double newlines as paragraph breaks. */
function foldTsDocParagraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, ' '))
    .join('\n\n');
}

async function generateMemberPages(name: string, info: TypeInfo): Promise<void> {
  const nsDir = getNamespaceDir(info.namespace);
  const typeDir = name;
  const componentImport = `import { MemberDetail, ApiStatus } from "${getComponentImportPath(nsDir, typeDir)}";`;

  // Property pages (skip inherited — they live on the parent type)
  const props = info.properties.filter((p) => !p.name.includes('__') && !p.inheritedFrom);
  for (const prop of props) {
    const filePath = join(OUTPUT_DIR, nsDir, typeDir, `${memberSlug(prop.name)}.mdx`);
    await ensureDir(filePath);

    const lines: string[] = [];
    const propTitle = `${name}.${prop.name}`;
    lines.push('---');
    lines.push(`title: "${escapeYaml(propTitle)}"`);
    lines.push('editUrl: false');
    lines.push('sidebar:');
    lines.push(`  label: "${escapeYaml(propTitle)}"`);
    lines.push('---');
    lines.push('');
    lines.push(componentImport);
    lines.push('');

    // Breadcrumb
    lines.push(`[${name}](${BASE_PATH}/api/${nsDir}/${typeDir}/) › ${prop.name}`);
    lines.push('');

    const statusEnum = prop.isOfficial ? 'ApiStatus.Official' : 'ApiStatus.Unofficial';
    const typeAttr = ` type="${escapeJsxAttr(markdownToHtml(renderTypeWithLinks(prop.type, name)))}"`;
    const descAttr = prop.description ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(prop.description)))}"` : '';
    const remarksAttr = prop.remarks ? ` remarks="${escapeJsxAttr(markdownToHtml(resolveLinks(prop.remarks)))}"` : '';
    const sinceAttr = prop.since ? ` since="${escapeJsxAttr(prop.since)}"` : '';
    const examplesAttr = prop.examples.length > 0 ? ` examples={${JSON.stringify(prop.examples)}}` : '';

    lines.push(`<MemberDetail status={${statusEnum}}${typeAttr}${descAttr}${remarksAttr}${sinceAttr}${examplesAttr} />`);
    lines.push('');

    if (prop.inheritedFrom) {
      lines.push(`*Inherited from ${prop.inheritedFrom}*`);
      lines.push('');
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }

  // Method pages — each overload key gets its own page (skip inherited)
  const methods = info.methods.filter((m) => !m.name.includes('__') && !m.inheritedFrom);
  const overloadGroups = new Map<string, MemberInfo[]>();
  for (const method of methods) {
    const key = method.overloadKey;
    if (!overloadGroups.has(key)) {
      overloadGroups.set(key, []);
    }
    overloadGroups.get(key)?.push(method);
  }

  for (const [overloadKey, overloads] of overloadGroups) {
    const slug = overloadSlug(overloadKey);
    const filePath = join(OUTPUT_DIR, nsDir, typeDir, `${slug}.mdx`);
    await ensureDir(filePath);

    const displayName = `${name}.${overloadKey} method`;

    const lines: string[] = [];
    lines.push('---');
    lines.push(`title: "${escapeYaml(displayName)}"`);
    lines.push('editUrl: false');
    lines.push('sidebar:');
    lines.push(`  label: "${escapeYaml(`${name}.${overloadKey}`)}"`);
    lines.push('---');
    lines.push('');
    lines.push(componentImport);
    lines.push('');

    // Breadcrumb
    lines.push(`[${name}](${BASE_PATH}/api/${nsDir}/${typeDir}/) › ${overloadKey}`);
    lines.push('');

    for (const overload of overloads) {
      renderMethodOverloadMdx(lines, overload, name);
      if (overloads.length > 1) {
        lines.push('---');
        lines.push('');
      }
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

async function generateNamespaceIndexPages(types: Map<string, TypeInfo>): Promise<void> {
  const namespaces = new Map<string, TypeInfo[]>();
  for (const [_name, info] of types) {
    if (info.kind !== 'variable' && info.kind !== 'function' && info.properties.length === 0 && info.methods.length === 0 && info.baseTypes.length === 0) {
      continue;
    }
    if (!namespaces.has(info.namespace)) {
      namespaces.set(info.namespace, []);
    }
    namespaces.get(info.namespace)?.push(info);
  }

  for (const [namespace, nsTypes] of namespaces) {
    const nsDir = getNamespaceDir(namespace);
    const displayName = namespace;
    const filePath = join(OUTPUT_DIR, nsDir, 'index.mdx');
    await ensureDir(filePath);

    const lines: string[] = [];
    lines.push('---');
    lines.push(`title: "${displayName}"`);
    lines.push('editUrl: false');
    lines.push('sidebar:');
    lines.push(`  label: "${displayName}"`);
    lines.push('---');
    lines.push('');

    const classes = nsTypes.filter((t) => t.kind === 'class').sort((a, b) => a.name.localeCompare(b.name));
    const interfaces = nsTypes.filter((t) => t.kind === 'interface').sort((a, b) => a.name.localeCompare(b.name));

    if (classes.length > 0) {
      lines.push('## Classes');
      lines.push('');
      lines.push('| Class | Description |');
      lines.push('| :-- | :-- |');
      for (const cls of classes) {
        lines.push(`| [${cls.name}](./${cls.name}/) | ${escapeMarkdown(resolveLinks(cls.description))} |`);
      }
      lines.push('');
    }

    if (interfaces.length > 0) {
      lines.push('## Interfaces');
      lines.push('');
      lines.push('| Interface | Description |');
      lines.push('| :-- | :-- |');
      for (const iface of interfaces) {
        lines.push(`| [${iface.name}](./${iface.name}/) | ${escapeMarkdown(resolveLinks(iface.description))} |`);
      }
      lines.push('');
    }

    const functions = nsTypes.filter((t) => t.kind === 'function').sort((a, b) => a.name.localeCompare(b.name));

    if (functions.length > 0) {
      lines.push('## Functions');
      lines.push('');
      lines.push('| Function | Description |');
      lines.push('| :-- | :-- |');
      for (const fn of functions) {
        lines.push(`| [${fn.name}](./${fn.name}/) | ${escapeMarkdown(resolveLinks(fn.description))} |`);
      }
      lines.push('');
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

async function generateOverviewPage(name: string, info: TypeInfo, typeBacklinks: string[]): Promise<void> {
  const nsDir = getNamespaceDir(info.namespace);
  const typeSlug = name;
  const filePath = join(OUTPUT_DIR, nsDir, typeSlug, 'index.mdx');
  await ensureDir(filePath);

  const lines: string[] = [];

  // Frontmatter
  const displayName = getDisplayName(name, info);
  const badgeText = info.isOfficial ? 'Official' : 'Unofficial';
  const badgeVariant = info.isOfficial ? 'success' : 'caution';
  lines.push('---');
  lines.push(`title: "${displayName}"`);
  lines.push('editUrl: false');
  lines.push('sidebar:');
  lines.push(`  label: "${displayName}"`);
  lines.push('  badge:');
  lines.push(`    text: ${badgeText}`);
  lines.push(`    variant: ${badgeVariant}`);
  lines.push('---');
  lines.push('');

  // Component imports — compute relative path from generated page to components
  const componentPath = getComponentImportPath(nsDir, typeSlug);
  lines.push(
    `import { TypeBadge, TypeSignature, ImportStatement, ConstructorBlock, MemberFilters, PropertyTable, MethodTable, ApiStatus } from "${componentPath}";`
  );
  lines.push('');

  // Status badge + filters
  const hasMembers = info.properties.length > 0 || info.methods.length > 0;
  if (hasMembers && info.kind !== 'function') {
    lines.push(`<TypeBadge status={${renderApiStatus(info.isOfficial)}}><MemberFilters /></TypeBadge>`);
  } else {
    lines.push(`<TypeBadge status={${renderApiStatus(info.isOfficial)}} />`);
  }
  lines.push('');

  // Description
  if (info.description) {
    lines.push(escapeMdxBraces(resolveLinks(info.description)));
    lines.push('');
  }

  // Remarks
  if (info.remarks) {
    lines.push(`> ${escapeMdxBraces(resolveLinks(info.remarks))}`);
    lines.push('');
  }

  // Import statement
  const importStatement = getImportStatement(info);
  if (importStatement) {
    lines.push(`<ImportStatement text="${escapeJsxAttr(importStatement)}" />`);
    lines.push('');
  }

  // Examples
  for (const example of info.examples) {
    lines.push('**Example:**');
    lines.push('');
    lines.push(example);
    lines.push('');
  }

  // Functions render like method detail pages — signature, params, returns
  if (info.kind === 'function') {
    renderFunctionPage(lines, info);
    await writeFile(filePath, lines.join('\n'), 'utf-8');
    return;
  }

  // Variables render with declaration keyword and type
  if (info.kind === 'variable') {
    const keyword = info.variableKeyword ?? 'let';
    const varType = info.variableType ?? 'unknown';
    lines.push('**Signature:**');
    lines.push('');
    lines.push('```ts');
    lines.push(`${keyword} ${name}: ${varType}`);
    lines.push('```');
    lines.push('');
    lines.push(`**Type:** ${escapeMdxBraces(escapeMdxAngleBrackets(renderTypeWithLinks(varType)))}`);
    lines.push('');
    renderBacklinks(lines, typeBacklinks);
    await writeFile(filePath, lines.join('\n'), 'utf-8');
    return;
  }

  // Signature
  const typeParamsAttr = info.typeParameters.length > 0 ? ` typeParams={${JSON.stringify(info.typeParameters)}}` : '';
  const extendsAttr = info.baseTypes.length > 0 ? ` extends={${JSON.stringify(info.baseTypes)}}` : '';
  lines.push(`<TypeSignature kind="${info.kind}" name="${name}"${typeParamsAttr}${extendsAttr} />`);
  lines.push('');

  if (info.baseTypes.length > 0) {
    const linkedTypes = info.baseTypes.map((t) => linkBaseType(t));
    lines.push(`**Extends:** ${linkedTypes.join(', ')}`);
    lines.push('');
  }

  renderConstructorMdx(lines, name, info);
  renderPropertyTableMdx(lines, info);
  renderMethodTableMdx(lines, info);

  renderBacklinks(lines, typeBacklinks);

  await writeFile(filePath, lines.join('\n'), 'utf-8');
}

/** Compute relative import path from a generated page to the components directory */
function getComponentImportPath(nsDir: string, typeDir: string): string {
  // Page is at: src/content/docs/api/{nsDir}/{typeDir}/index.mdx
  // Components are at: src/components/api/
  // We need to go up from content/docs/api/{nsDir}/{typeDir}/ to src/, then into components/api
  const segments = ['content', 'docs', 'api', ...nsDir.split('/'), ...typeDir.split('/')].filter(Boolean);
  const ups = '../'.repeat(segments.length);
  return `${ups}components/api`;
}

/** Pick the highest-numbered constructorN__ pseudo-method (matches ExtractConstructor logic) */
function getConstructorMethod(methods: MemberInfo[]): MemberInfo | undefined {
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
function getDeclaredReturnType(method: ReturnTypeProvider): string {
  const annotation = method.getReturnTypeNode?.()?.getText();
  if (annotation) {
    return simplifyType(annotation);
  }
  return simplifyType(method.getReturnType().getText());
}

function getDescription(node: JSDocableNode): string {
  const docs = node.getJsDocs();
  if (docs.length === 0) {
    return '';
  }
  const raw = docs[docs.length - 1]?.getDescription().trim() ?? '';
  return foldTsDocParagraphs(raw);
}

function getDisplayName(name: string, info: TypeInfo): string {
  if (info.typeParameters.length === 0) {
    return name;
  }
  const bareParams = info.typeParameters.map((tp) => tp.replace(/\s+extends\s+.*$/, ''));
  return `${name}<${bareParams.join(', ')}>`;
}

/** Extract @example blocks from JSDoc */
function getExamples(node: JSDocableNode): string[] {
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

function getImportStatement(info: TypeInfo): string | undefined {
  // Globals/augmentations → global scope, no import needed
  if (info.namespace.startsWith('globals')) {
    return undefined;
  }

  // Implementations/ → runtime code, import from TYPINGS_PACKAGE/implementations
  if (info.namespace.includes('implementations')) {
    return `import { ${info.name} } from '${TYPINGS_PACKAGE}/implementations';`;
  }

  // Augmentations/ → import from the original package
  if (info.namespace.includes('/augmentations')) {
    const packageDir = info.namespace.split('/')[0] ?? '';

    if (packageDir === 'obsidian') {
      const importKeyword = info.kind === 'interface' ? 'import type' : 'import';
      return `${importKeyword} { ${info.name} } from 'obsidian';`;
    }

    // @codemirror__state → @codemirror/state, i18next → i18next, etc.
    const packageName = packageDir.includes('__') ? packageDir.replace('__', '/') : packageDir;
    return `import type { ${info.name} } from '${packageName}';`;
  }

  // Internals/ and everything else → import type from TYPINGS_PACKAGE
  return `import type { ${info.name} } from '${TYPINGS_PACKAGE}';`;
}

function getNamespaceDir(namespace: string): string {
  return namespace;
}

/** Extract @param descriptions from JSDoc tags */
function getParamDescriptions(node: JSDocableNode): Map<string, string> {
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
function getPropertyType(prop: PropertyDeclaration | PropertySignature): string {
  // Use the type node text (what's written in source) if available, otherwise fall back to resolved type
  const typeNode = prop.getTypeNode();
  if (typeNode) {
    return resolveTypeofAliases(simplifyType(typeNode.getText()), prop.getSourceFile());
  }
  return simplifyType(prop.getType().getText());
}

/** Extract @remarks text from JSDoc */
function getRemarks(node: JSDocableNode): string {
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
function getReturnDescription(node: JSDocableNode): string {
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
function getSince(node: JSDocableNode): string {
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
 * Link a base type expression for the "Extends:" line.
 * Simple type references (identifier + optional generics) use renderTypeWithLinks
 * so each type argument gets its own link.
 * Complex expressions (object types, intersections, etc.) fall back to typeLink
 * to avoid MDX parsing issues with `{`, `}`, `|` etc.
 */
function linkBaseType(typeName: string): string {
  const isSimpleTypeRef = /^[a-zA-Z][a-zA-Z0-9]*(?:<.*>)?$/.test(typeName.trim());
  if (isSimpleTypeRef) {
    return escapeMdxAngleBrackets(renderTypeWithLinks(typeName));
  }
  return typeLink(typeName);
}

/** Convert inline markdown to HTML for use in component props with set:html */
function markdownToHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)/g, '<a href="$<url>">$<text></a>')
    .replace(/`(?<code>[^`]+)`/g, '<code>$<code></code>')
    .replace(/\n/g, '<br/>');
}

/** Build the href for a member, pointing to the parent type's page if inherited */
function memberHref(memberSlugStr: string, inheritedFrom: string): string {
  if (!inheritedFrom) {
    return `./${memberSlugStr}/`;
  }
  const parentInfo = allTypes.get(inheritedFrom);
  if (!parentInfo) {
    return `./${memberSlugStr}/`;
  }
  const parentNsDir = getNamespaceDir(parentInfo.namespace);
  return `${BASE_PATH}/api/${parentNsDir}/${inheritedFrom}/${memberSlugStr}/`;
}

/** Sanitize a member name for use as a filename */
function memberSlug(name: string): string {
  const cleaned = name
    .replace(/^["']|["']$/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  if (!cleaned) {
    return 'unnamed';
  }
  return cleaned;
}

/** Slugify an overload key for URLs: on("changed") -> on-changed */
function overloadSlug(overloadKey: string): string {
  return overloadKey
    .replace(/["'()]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function renderApiStatus(isOfficial: boolean): string {
  return isOfficial ? 'ApiStatus.Official' : 'ApiStatus.Unofficial';
}

function renderBacklinks(lines: string[], typeBacklinks: string[]): void {
  if (typeBacklinks.length === 0) {
    return;
  }
  const sortedBacklinks = [...typeBacklinks].sort((a, b) => a.localeCompare(b));
  lines.push('---');
  lines.push('');
  lines.push('**Links to this page:**');
  lines.push('');
  for (const bl of sortedBacklinks) {
    const blInfo = allTypes.get(bl);
    if (blInfo) {
      const blNsDir = getNamespaceDir(blInfo.namespace);
      lines.push(`- [${bl}](${BASE_PATH}/api/${blNsDir}/${bl}/)`);
    }
  }
  lines.push('');
}

function renderConstructorMdx(lines: string[], name: string, info: TypeInfo): void {
  const constructorMethod = getConstructorMethod(info.methods);
  if (!constructorMethod) {
    return;
  }
  const ctorSig = `new ${name}${constructorMethod.signature.replace(/^constructor\d*__/, '')}`;
  const ctorDesc = constructorMethod.description ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(constructorMethod.description)))}"` : '';
  const ctorStatus = renderApiStatus(constructorMethod.isOfficial);
  lines.push(`<ConstructorBlock status={${ctorStatus}} signature="${escapeJsxAttr(ctorSig)}"${ctorDesc} />`);
  lines.push('');
}

function renderFunctionPage(lines: string[], info: TypeInfo): void {
  const fn = info.methods[0];
  if (!fn) {
    return;
  }

  lines.push('**Signature:**');
  lines.push('');
  lines.push('```ts');
  lines.push(`function ${fn.signature}: ${fn.returnType}`);
  lines.push('```');
  lines.push('');

  if (fn.parameters.length > 0) {
    lines.push('**Parameters:**');
    lines.push('');
    lines.push('| Parameter | Type | Description |');
    lines.push('| :-- | :-- | :-- |');
    for (const param of fn.parameters) {
      lines.push(
        `| \`${param.name}\` | ${escapeMarkdown(escapeMdxAngleBrackets(renderTypeWithLinks(param.type)))} | ${
          escapeMarkdown(resolveLinks(param.description))
        } |`
      );
    }
    lines.push('');
  }

  const returnDesc = fn.returnDescription ? ` — ${escapeMdxAngleBrackets(resolveLinks(fn.returnDescription))}` : '';
  lines.push(`**Returns:** ${escapeMdxAngleBrackets(renderTypeWithLinks(fn.returnType))}${returnDesc}`);
  lines.push('');

  for (const example of fn.examples) {
    lines.push('**Example:**');
    lines.push('');
    lines.push(example);
    lines.push('');
  }
}

function renderMethodOverloadMdx(lines: string[], overload: MemberInfo, typeName: string): void {
  const statusEnum = overload.isOfficial ? 'ApiStatus.Official' : 'ApiStatus.Unofficial';
  const sig = `${overload.signature}: ${overload.returnType}`;
  const descAttr = overload.description ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.description)))}"` : '';
  const remarksAttr = overload.remarks ? ` remarks="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.remarks)))}"` : '';
  const sinceAttr = overload.since ? ` since="${escapeJsxAttr(overload.since)}"` : '';
  const returnTypeAttr = ` returnType="${escapeJsxAttr(markdownToHtml(renderTypeWithLinks(overload.returnType, typeName)))}"`;
  const returnDescAttr = overload.returnDescription ? ` returnDescription="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.returnDescription)))}"` : '';
  const examplesAttr = overload.examples.length > 0 ? ` examples={${JSON.stringify(overload.examples)}}` : '';

  const params = overload.parameters.map((p) => ({
    description: markdownToHtml(p.description || (p.name.endsWith('?') ? '*(Optional)*' : '')),
    name: p.name,
    type: markdownToHtml(renderTypeWithLinks(p.type, typeName))
  }));
  const paramsAttr = params.length > 0 ? ` parameters={${JSON.stringify(params)}}` : '';

  lines.push(
    `<MemberDetail status={${statusEnum}} signature="${
      escapeJsxAttr(sig)
    }"${descAttr}${remarksAttr}${sinceAttr}${returnTypeAttr}${returnDescAttr}${paramsAttr}${examplesAttr} />`
  );
  lines.push('');
}

function renderMethodTableMdx(lines: string[], info: TypeInfo): void {
  const methods = info.methods
    .filter((m) => !m.name.includes('__'))
    .sort((a, b) => {
      if (a.isStatic !== b.isStatic) {
        return a.isStatic ? 1 : -1;
      }
      return a.name.localeCompare(b.name);
    });
  if (methods.length === 0) {
    return;
  }
  lines.push('<MethodTable rows={[');
  for (const method of methods) {
    const status = renderApiStatus(method.isOfficial);
    const desc = escapeJsString(markdownToHtml(resolveLinks(method.description)));
    const staticPrefix = method.isStatic ? 'static ' : '';
    const shortParams = method.parameters.map((p, i) => {
      if (i === 0 && EVENT_METHODS.has(method.name) && (p.type.startsWith('"') || p.type.startsWith('\''))) {
        return p.type.replace(/"/g, '\'');
      }
      return p.name;
    }).join(', ');
    const shortSig = `${staticPrefix}${method.name}(${shortParams})`;
    const sig = escapeJsString(shortSig);
    const slug = overloadSlug(method.overloadKey);
    const returnType = markdownToHtml(renderTypeWithLinks(method.returnType, info.name));
    const inheritedAttr = method.inheritedFrom ? `, inheritedFrom: "${escapeJsString(markdownToHtml(typeLink(method.inheritedFrom)))}"` : '';
    const href = memberHref(slug, method.inheritedFrom);
    lines.push(
      `  { status: ${status}, signature: "${sig}", href: "${escapeJsString(href)}", returns: "${
        escapeJsString(returnType)
      }", description: "${desc}"${inheritedAttr} },`
    );
  }
  lines.push(']} />');
  lines.push('');
}

function renderPropertyTableMdx(lines: string[], info: TypeInfo): void {
  const props = info.properties.filter((p) => !p.name.includes('__'));
  if (props.length === 0) {
    return;
  }
  lines.push('<PropertyTable rows={[');
  for (const prop of props) {
    const status = renderApiStatus(prop.isOfficial);
    const desc = escapeJsString(markdownToHtml(resolveLinks(prop.description)));
    const type = markdownToHtml(renderTypeWithLinks(prop.type, info.name));
    const inheritedAttr = prop.inheritedFrom ? `, inheritedFrom: "${escapeJsString(markdownToHtml(typeLink(prop.inheritedFrom)))}"` : '';
    const href = memberHref(memberSlug(prop.name), prop.inheritedFrom);
    lines.push(
      `  { status: ${status}, name: "${escapeJsString(prop.name)}", href: "${escapeJsString(href)}", type: "${
        escapeJsString(type)
      }", description: "${desc}"${inheritedAttr} },`
    );
  }
  lines.push(']} />');
  lines.push('');
}

/** Resolve {@link Name} and {@link Name | display text} tags in description text */
function resolveLinks(text: string): string {
  return text.replace(/\{@link\s+(?<target>[^|}]+?)(?:\s*\|\s*(?<display>[^}]+?))?\}/g, (...args) => {
    const groups = args[args.length - 1] as LinkMatchGroups;
    const target = groups.target.trim();
    // Strip TSDoc backslash escapes (e.g., \< \> \{ \}) from display text
    const display = (groups.display?.trim() ?? target).replace(/\\(?=[<>{}])/g, '');

    // Handle Type.member references (e.g., Vault.on)
    const dotMatch = /^(?<typeName>[A-Za-z]\w*)\.(?<memberName>\w+)$/.exec(target);
    if (dotMatch?.groups) {
      const typeName = dotMatch.groups['typeName'] ?? '';
      const memberName = dotMatch.groups['memberName'] ?? '';
      const typeInfo = allTypes.get(typeName);
      if (typeInfo) {
        const targetNsDir = getNamespaceDir(typeInfo.namespace);
        return `[${display}](${BASE_PATH}/api/${targetNsDir}/${typeName}/${memberSlug(memberName)}/)`;
      }
    }

    // Handle simple type references — if display contains generic args, link each type individually
    const info = allTypes.get(target);
    if (info) {
      if (display !== target && display.includes('<')) {
        return renderTypeWithLinks(display);
      }
      const targetNsDir = getNamespaceDir(info.namespace);
      return `[${display}](${BASE_PATH}/api/${targetNsDir}/${target}/)`;
    }
    return `\`${display}\``;
  });
}

/**
 * Resolve `typeof aliasName` patterns where aliasName is an import alias.
 * E.g., `typeof momentInstance` → `typeof moment` when `import { moment as momentInstance }`.
 */
function resolveTypeofAliases(typeText: string, sourceFile: SourceFile): string {
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

function simplifyType(typeText: string): string {
  return typeText
    .replace(/import\("[^"]+"\)\./g, '')
    .replace(/import\('[^']+'\)\./g, '');
}

/** Create an absolute link to a type page */
function typeLink(typeName: string): string {
  const cleanName = typeName.replace(/<.*>$/, '').trim();
  const info = allTypes.get(cleanName);
  if (!info) {
    return `\`${typeName}\``;
  }
  const targetNsDir = getNamespaceDir(info.namespace);
  return `[${escapeMdxAngleBrackets(typeName)}](${BASE_PATH}/api/${targetNsDir}/${cleanName}/)`;
}

/** Single-letter and common generic type parameter names — not linkable */
const GENERIC_TYPE_PARAMS = new Set([
  'Arg',
  'Args', // Short identifiers / enum-like values that aren't types
  'ASC',
  'Callback',
  'ComponentType',
  'DESC',
  'DOMContentLoaded',
  'GET',
  'HookCallback',
  'HookName',
  'ID',
  'Input',
  'Instance',
  'Item',
  'K',
  'Key',
  'Marked',
  'O',
  'Output',
  'Owner',
  'P',
  'POST',
  'R',
  'S',
  'Suspects',
  'T',
  'TFunction',
  'TModal',
  'TView',
  'TViewType',
  'U',
  'UserProperties',
  'V',
  'VIEW'
]);

const TS_HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

const TS_PRIMITIVE_TYPES: Record<string, string> = {
  any: `${TS_HANDBOOK}/2/everyday-types.html#any`,
  boolean: `${TS_HANDBOOK}/basic-types.html#boolean`,
  never: `${TS_HANDBOOK}/basic-types.html#never`,
  null: `${TS_HANDBOOK}/basic-types.html#null-and-undefined`,
  number: `${TS_HANDBOOK}/basic-types.html#number`,
  object: `${TS_HANDBOOK}/basic-types.html#object`,
  string: `${TS_HANDBOOK}/basic-types.html#string`,
  symbol: `${TS_HANDBOOK}/symbols.html`,
  undefined: `${TS_HANDBOOK}/basic-types.html#null-and-undefined`,
  unknown: `${TS_HANDBOOK}/2/functions.html#unknown`,
  void: `${TS_HANDBOOK}/basic-types.html#void`
};

/** Loaded from typedoc-plugin-mdn-links data at runtime */
let webApiTypes: Record<string, unknown> = {};

function loadExternalTypeMaps(): void {
  try {
    const dataPath = join(process.cwd(), 'node_modules/typedoc-plugin-mdn-links/data/web-api.json');
    webApiTypes = JSON.parse(readFileSync(dataPath, 'utf-8')) as Record<string, unknown>;
    console.warn(`Loaded ${String(Object.keys(webApiTypes).length)} Web API type links`);
  } catch {
    console.warn('typedoc-plugin-mdn-links data not found — Web API links will be unavailable.');
  }
}

function resolveWebApiUrl(name: string): string | undefined {
  if (!Object.hasOwn(webApiTypes, name)) {
    return undefined;
  }
  const entry = webApiTypes[name];
  if (typeof entry === 'string') {
    return entry;
  }
  if (typeof entry === 'object' && entry !== null && 'url' in entry) {
    const typedEntry = entry as WebApiEntry;
    return typedEntry.url;
  }
  return undefined;
}

// Cspell:disable -- URL fragments are not words
const TS_UTILITY_TYPES = new Map<string, string>([
  ['Awaited', 'awaitedtype'],
  ['Capitalize', 'capitalizestringtype'],
  ['ConstructorParameters', 'constructorparameterstype'],
  ['Exclude', 'excludeuniontype-excludedmembers'],
  ['Extract', 'extracttype-union'],
  ['InstanceType', 'instancetypetype'],
  ['Iterable', 'iterable-interface'],
  ['Lowercase', 'lowercasestringtype'],
  ['NoInfer', 'noinfertype'],
  ['NonNullable', 'nonnullabletype'],
  ['Omit', 'omittype-keys'],
  ['OmitThisParameter', 'omitthisparametertype'],
  ['Parameters', 'parameterstype'],
  ['Partial', 'partialtype'],
  ['Pick', 'picktype-keys'],
  ['Readonly', 'readonlytype'],
  ['Record', 'recordkeys-type'],
  ['Required', 'requiredtype'],
  ['ReturnType', 'returntypetype'],
  ['ThisParameterType', 'thisparametertypetype'],
  ['ThisType', 'thistypetype'],
  ['Uncapitalize', 'uncapitalizestringtype'],
  ['Uppercase', 'uppercasestringtype']
]);

const TS_GLOBAL_TYPES: Record<string, string> = {
  // DOM event/element maps (TypeScript lib.dom.d.ts)
  AddEventListenerOptions: 'https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#options',
  AnimationFrameProvider: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L3756',
  Array: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array',
  // TypeScript lib built-ins
  ArrayBufferLike: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer',
  ArrayLike: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
  // Fetch API
  BodyInit: 'https://developer.mozilla.org/docs/Web/API/Request/Request#body',
  // Node.js types
  Buffer: 'https://nodejs.org/api/buffer.html#class-buffer',
  // Canvas/WebGL
  CanvasRenderingContext2DSettings: 'https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/getContext#contextattributes',
  // CodeMirror
  ChangeSpec: 'https://codemirror.net/docs/ref/#state.ChangeSpec',
  CharCategory: 'https://codemirror.net/docs/ref/#state.CharCategory',
  DecorationSet: 'https://codemirror.net/docs/ref/#view.DecorationSet',
  Direction: 'https://codemirror.net/docs/ref/#view.Direction',
  DocumentEventMap: 'https://developer.mozilla.org/docs/Web/API/Document#events',
  DocumentOrShadowRoot: 'https://developer.mozilla.org/docs/Web/API/Document',
  DOMEventHandlers: 'https://codemirror.net/docs/ref/#view.DOMEventHandlers',
  Error: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error',
  EventListenerOptions: 'https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener#options',

  EventListenerOrEventListenerObject: 'https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback',
  Extension: 'https://codemirror.net/docs/ref/#state.Extension',
  FacetReader: 'https://codemirror.net/docs/ref/#state.FacetReader',
  FSWatcher: 'https://nodejs.org/api/fs.html#class-fsfswatcher',
  Function: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function',
  GlobalEventHandlers: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L16746',
  HeadersInit: 'https://developer.mozilla.org/docs/Web/API/Headers/Headers#init',
  HTMLElementEventMap: 'https://developer.mozilla.org/docs/Web/API/HTMLElement#events',

  HTMLElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/Document/createElement',
  Iterable: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols',
  Iterator: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator',

  Map: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map',
  // Moment.js
  Moment: 'https://momentjs.com/docs/#/parsing/',
  MomentInput: 'https://momentjs.com/docs/#/parsing/',
  NonElementParentNode: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L26373',
  Object: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object',
  ParentNode: 'https://developer.mozilla.org/docs/Web/API/ParentNode',
  Promise: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise',
  PromiseLike: 'https://github.com/Microsoft/TypeScript/blob/38c3279/src/lib/es5.d.ts#L1519',
  PromiseWithResolvers: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers',
  PropertyDescriptor: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty',
  PropertyDescriptorMap: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties',

  PropertyKey: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
  Proxy: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy',
  RangeCursor: 'https://codemirror.net/docs/ref/#state.RangeCursor',
  RegExp: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
  RequestInfo: 'https://developer.mozilla.org/docs/Web/API/Request/Request#input',

  RequestInit: 'https://developer.mozilla.org/docs/Web/API/Request/Request#options',
  ResponseInit: 'https://developer.mozilla.org/docs/Web/API/Response/Response#init',
  Set: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set',

  Stats: 'https://nodejs.org/api/fs.html#class-fsstats',
  SVGElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/Document/createElementNS',

  Symbol: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
  TypedPropertyDescriptor: 'https://www.typescriptlang.org/docs/handbook/decorators.html',
  WeakMap: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap',
  WeakRef: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakRef',
  WeakSet: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakSet',
  WebGLContextAttributes: 'https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/getContextAttributes',
  WebGLPowerPreference: 'https://developer.mozilla.org/docs/Web/API/WebGLRenderingContext/getContextAttributes',
  WindowEventHandlers: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41634',
  WindowEventMap: 'https://developer.mozilla.org/docs/Web/API/Window#events',
  WindowLocalStorage: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41685',
  WindowOrWorkerGlobalScope:
    'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41690',
  WindowSessionStorage: 'https://raw.githubusercontent.com/microsoft/TypeScript/38c3279e29e45c274c408d909394b7bf45c24fdc/src/lib/dom.generated.d.ts#L41736'
};
// Cspell:enable

interface SidebarEntry {
  collapsed: boolean;
  items: (SidebarEntry | SidebarLink)[];
  label: string;
}

interface SidebarLink {
  label: string;
  link: string;
}

/** Recursive tree node for building the sidebar */
interface SidebarTreeNode {
  children: Map<string, SidebarTreeNode>;
  types: TypeInfo[];
}

function buildSidebarTree(types: Map<string, TypeInfo>): SidebarTreeNode {
  const root: SidebarTreeNode = { children: new Map(), types: [] };
  for (const [_name, info] of types) {
    if (info.kind !== 'variable' && info.kind !== 'function' && info.properties.length === 0 && info.methods.length === 0 && info.baseTypes.length === 0) {
      continue;
    }
    const parts = info.namespace.split('/');
    let node = root;
    for (const part of parts) {
      if (!node.children.has(part)) {
        node.children.set(part, { children: new Map(), types: [] });
      }
      node = node.children.get(part) ?? node;
    }
    node.types.push(info);
  }
  return root;
}

function escapeYaml(text: string): string {
  return text.replace(/"/g, '\\"');
}

async function generateSidebarJson(types: Map<string, TypeInfo>): Promise<void> {
  const root = buildSidebarTree(types);

  const sidebar: SidebarEntry[] = [];
  const PRIORITY_GROUPS = ['obsidian', 'globals'];
  const allTopLevels = [...root.children.keys()];
  const prioritized = PRIORITY_GROUPS.filter((g) => allTopLevels.includes(g));
  const rest = allTopLevels.filter((g) => !PRIORITY_GROUPS.includes(g)).sort((a, b) => a.localeCompare(b));

  for (const topLevel of prioritized) {
    const child = root.children.get(topLevel);
    if (child) {
      sidebar.push(sidebarTreeToEntries(child, topLevel.replace(/__/g, '/')));
    }
  }

  if (prioritized.length > 0 && rest.length > 0) {
    // Visual separator — empty group with a line label and custom CSS class
    sidebar.push({ collapsed: false, items: [], label: '───' });
  }

  for (const topLevel of rest) {
    const child = root.children.get(topLevel);
    if (child) {
      sidebar.push(sidebarTreeToEntries(child, topLevel.replace(/__/g, '/')));
    }
  }

  // Wrap all API groups under a single "TypeScript API" parent
  const wrappedSidebar = [{
    collapsed: false,
    items: sidebar,
    label: 'TypeScript API'
  }];

  const sidebarPath = join(process.cwd(), 'src/generated-sidebar.json');
  const JSON_INDENT = 2;
  await writeFile(sidebarPath, JSON.stringify(wrappedSidebar, null, JSON_INDENT), 'utf-8');
  console.warn(`Generated sidebar with ${String(sidebar.length)} module groups`);
}

/** Render a type string with clickable links for known types */
function renderTypeWithLinks(typeText: string, selfTypeName?: string): string {
  // Pre-pass: link Object.method patterns to MDN before word-by-word linking
  const MDN_OBJECT_BASE = 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object';
  const withObjectMethods = typeText.replace(
    /\bObject\.(?<method>[a-zA-Z][a-zA-Z0-9]*)\b/g,
    (_fullMatch, method: string) => `[Object](${MDN_OBJECT_BASE}).[${method}](${MDN_OBJECT_BASE}/${method})`
  );
  // Main pass: link individual type names, skipping text already inside markdown links
  return withObjectMethods.replace(
    /\[(?<linkText>[^\]]+)\]\([^)]+\)|\b(?<typeName>[a-zA-Z][a-zA-Z0-9]*)\b/g,
    (match, _linkText: string | undefined, _unused: unknown, ...rest: unknown[]) => {
      // If this matched a markdown link, preserve it as-is
      const groups = rest[rest.length - 1] as Record<string, string | undefined>;
      if (groups['linkText']) {
        return match;
      }
      const typeName = groups['typeName'];
      if (!typeName) {
        return match;
      }
      // Link `this` return type to the current type's page
      if (typeName === 'this' && selfTypeName) {
        const selfInfo = allTypes.get(selfTypeName);
        if (selfInfo) {
          const targetNsDir = getNamespaceDir(selfInfo.namespace);
          return `[${typeName}](${BASE_PATH}/api/${targetNsDir}/${selfTypeName}/)`;
        }
      }

      // Skip generic type parameters
      if (GENERIC_TYPE_PARAMS.has(typeName)) {
        return typeName;
      }

      // Check our own types first
      const info = allTypes.get(typeName);
      if (info) {
        const targetNsDir = getNamespaceDir(info.namespace);
        return `[${typeName}](${BASE_PATH}/api/${targetNsDir}/${typeName}/)`;
      }

      // TypeScript utility types
      const tsUrl = resolveTsUtilityUrl(typeName);
      if (tsUrl) {
        return `[${typeName}](${tsUrl})`;
      }

      // JS global types (Array, Promise, Map, etc.)
      const globalUrl = Object.hasOwn(TS_GLOBAL_TYPES, typeName) ? TS_GLOBAL_TYPES[typeName] : undefined;
      if (globalUrl) {
        return `[${typeName}](${globalUrl})`;
      }

      // Web API / MDN types (1099 types from typedoc-plugin-mdn-links)
      const mdnUrl = resolveWebApiUrl(typeName);
      if (mdnUrl) {
        return `[${typeName}](${mdnUrl})`;
      }

      // TypeScript primitive types
      const primitiveUrl = Object.hasOwn(TS_PRIMITIVE_TYPES, typeName) ? TS_PRIMITIVE_TYPES[typeName] : undefined;
      if (primitiveUrl) {
        return `[${typeName}](${primitiveUrl})`;
      }

      return typeName;
    }
  );
}

function resolveTsUtilityUrl(name: string): string | undefined {
  const hash = TS_UTILITY_TYPES.get(name);
  if (hash) {
    if (['Iterable'].includes(name)) {
      return `https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#${hash}`;
    }
    if (['Capitalize', 'Lowercase', 'Uncapitalize', 'Uppercase'].includes(name)) { // Cspell:disable-line
      return `https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#${hash}`;
    }
    return `https://www.typescriptlang.org/docs/handbook/utility-types.html#${hash}`;
  }
  return undefined;
}

function sidebarTreeToEntries(node: SidebarTreeNode, label: string): SidebarEntry {
  const items: (SidebarEntry | SidebarLink)[] = [];

  // Add child directory groups first (before individual types)
  const sortedChildren = [...node.children.keys()].sort((a, b) => a.localeCompare(b));
  for (const childName of sortedChildren) {
    const child = node.children.get(childName);
    if (child) {
      items.push(sidebarTreeToEntries(child, childName.replace(/__/g, '/')));
    }
  }

  // Add type links at this level
  const sortedTypes = [...node.types].sort((a, b) => a.name.localeCompare(b.name));
  for (const t of sortedTypes) {
    items.push({ label: t.name, link: `/api/${t.namespace}/${t.name}/` });
  }

  return { collapsed: true, items, label };
}

await main();
