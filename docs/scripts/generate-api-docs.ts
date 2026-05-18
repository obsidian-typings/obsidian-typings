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

import { readFileSync } from 'node:fs';
import {
  mkdir,
  rm,
  writeFile
} from 'node:fs/promises';
import {
  dirname,
  join,
  resolve
} from 'node:path';
import { Project } from 'ts-morph';

const UNOFFICIAL_ICON = '<span class="icon-unofficial" title="Unofficial API — reverse-engineered, may change without notice"></span>';
const OFFICIAL_ICON = '<span class="icon-official" title="Official API — part of the public Obsidian API"></span>';

interface LinkMatchGroups {
  display?: string;
  target: string;
}

interface MemberInfo {
  description: string;
  inheritedFrom: string;
  isOfficial: boolean;
  name: string;
  overloadKey: string;
  parameters: ParameterInfo[];
  returnType: string;
  signature: string;
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
  isOfficial: boolean;
  kind: 'class' | 'interface';
  methods: MemberInfo[];
  name: string;
  namespace: string;
  properties: MemberInfo[];
}

interface WebApiEntry {
  url: string;
}

const NAMESPACE_DISPLAY_NAMES: Record<string, string> = {
  '@codemirror/language': '@codemirror/language',
  '@codemirror/state': '@codemirror/state',
  '@codemirror/view': '@codemirror/view',
  'global': 'obsidian globals',
  'internals': 'obsidian internals',
  'obsidian': 'obsidian'
};

const NAMESPACE_DIR_NAMES: Record<string, string> = {
  '@codemirror/language': 'codemirror-language',
  '@codemirror/state': 'codemirror-state',
  '@codemirror/view': 'codemirror-view',
  'global': 'globals',
  'internals': 'internals',
  'obsidian': 'obsidian'
};

const OUTPUT_DIR = join(process.cwd(), 'src/content/docs/api');

// Global type map for cross-referencing
let allTypes = new Map<string, TypeInfo>();

function extractClassInfo(cls: ClassDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  const name = cls.getName() ?? 'Unknown';
  return {
    baseTypes: cls.getExtends() ? [cls.getExtends()?.getText() ?? ''] : [],
    description: getDescription(cls),
    isOfficial,
    kind: 'class',
    methods: cls.getMethods().map((m) => extractMethodInfo(m, isOfficial)),
    name,
    namespace,
    properties: cls.getProperties().map((p) => extractPropertyInfo(p, isOfficial))
  };
}

function extractInterfaceInfo(iface: InterfaceDeclaration, isOfficial: boolean, namespace: string): TypeInfo {
  return {
    baseTypes: iface.getExtends().map((e) => e.getText()),
    description: getDescription(iface),
    isOfficial,
    kind: 'interface',
    methods: iface.getMethods().map((m) => extractMethodSignatureInfo(m, isOfficial)),
    name: iface.getName(),
    namespace,
    properties: iface.getProperties().map((p) => extractPropertySignatureInfo(p, isOfficial))
  };
}

async function main(): Promise<void> {
  loadExternalTypeMaps();

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  const rootDir = resolve(process.cwd(), '..');

  const obsidianPath = join(rootDir, 'node_modules/obsidian/obsidian.d.ts');
  let obsidianSrc: SourceFile | undefined;
  try {
    obsidianSrc = project.addSourceFileAtPath(obsidianPath);
  } catch {
    console.warn('obsidian.d.ts not found — base types will not be included.');
  }

  const augSrc = project.addSourceFileAtPath(join(rootDir, 'dist/cjs/types.d.cts'));

  // Load implementations types (constructor getters, etc.)
  const implPath = join(rootDir, 'dist/cjs/implementations.d.cts');
  let implSrc: SourceFile | undefined;
  try {
    implSrc = project.addSourceFileAtPath(implPath);
  } catch {
    console.warn('implementations.d.cts not found — implementation functions will not be included.');
  }

  const types = new Map<string, TypeInfo>();

  if (obsidianSrc) {
    processSourceFile(obsidianSrc, types, true, 'obsidian');
  }

  processSourceFile(augSrc, types, false, 'internals');
  collectFunctions(augSrc, types, false, 'internals');

  if (implSrc) {
    collectFunctions(implSrc, types, false, 'internals');
  }

  for (const mod of augSrc.getModules()) {
    const modName = mod.getName().replace(/['"]/g, '');
    const namespace = modName === 'global' ? 'global' : modName;
    processModuleDeclaration(mod, types, false, namespace);
  }

  resolveInheritedMembers(types);

  // Sort members alphabetically
  for (const [_name, info] of types) {
    info.properties.sort((a, b) => a.name.localeCompare(b.name));
    info.methods.sort((a, b) => a.name.localeCompare(b.name));
  }

  allTypes = types;

  await rm(OUTPUT_DIR, { force: true, recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  await generateNamespaceIndexPages(types);

  let pageCount = 0;
  for (const [name, info] of types) {
    if (info.properties.length === 0 && info.methods.length === 0) {
      continue;
    }
    await generateOverviewPage(name, info);
    await generateMemberPages(name, info);
    pageCount++;
  }

  // Generate sidebar JSON for astro config
  await generateSidebarJson(types);

  console.warn(`Generated docs for ${String(pageCount)} types, ${String(types.size)} total types`);
}

function mergeClassIntoType(target: TypeInfo, cls: ClassDeclaration, isOfficial: boolean): void {
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
  for (const method of iface.getMethods()) {
    const info = extractMethodSignatureInfo(method, isOfficial);
    // Deduplicate by overload key — prefer our (unofficial) version over official
    const existingByKey = target.methods.find((m) => m.overloadKey === info.overloadKey);
    const existingExact = target.methods.find((m) => m.name === info.name && m.signature === info.signature);
    if (existingExact) {
      if (!isOfficial && info.description) {
        existingExact.description = info.description;
      }
    } else if (existingByKey && !isOfficial) {
      // Replace official version with our augmented version (more precise types)
      const idx = target.methods.indexOf(existingByKey);
      target.methods[idx] = info;
    } else if (!existingByKey) {
      target.methods.push(info);
    }
  }
  for (const prop of iface.getProperties()) {
    const info = extractPropertySignatureInfo(prop, isOfficial);
    const existing = target.properties.find((p) => p.name === info.name);
    if (existing) {
      if (!isOfficial && info.description) {
        existing.description = info.description;
      }
    } else {
      target.properties.push(info);
    }
  }
  const desc = getDescription(iface);
  if (!isOfficial && desc) {
    target.description = desc;
  }
}

function processModuleDeclaration(mod: ReturnType<SourceFile['getModules']>[number], types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  for (const alias of mod.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: []
      });
    }
  }

  for (const iface of mod.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
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
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
    }
  }
}

function processSourceFile(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  // Collect type aliases and enums for link resolution (they don't generate pages but need to be linkable)
  for (const alias of src.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: []
      });
    }
  }
  for (const enumDecl of src.getEnums()) {
    const name = enumDecl.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(enumDecl),
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: []
      });
    }
  }

  for (const iface of src.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
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
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
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

      for (const prop of baseInfo.properties) {
        if (!info.properties.some((p) => p.name === prop.name)) {
          info.properties.push({ ...prop, inheritedFrom: cleanBase });
        }
      }

      for (const method of baseInfo.methods) {
        if (!info.methods.some((m) => m.name === method.name && m.signature === method.signature)) {
          info.methods.push({ ...method, inheritedFrom: cleanBase });
        }
      }
    }
  }
}

/** Event-like method names that should be split by string literal first param */
const EVENT_METHODS = new Set(['off', 'on', 'trigger', 'tryTrigger']);

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
    types.set(name, {
      baseTypes: [],
      description: getDescription(fn),
      isOfficial,
      kind: 'interface',
      methods: [],
      name,
      namespace,
      properties: []
    });
  }
}

/** Compute an overload key for methods with distinguishing first param (e.g. on('changed',...)) */
function computeOverloadKey(method: MemberInfo): string {
  if (EVENT_METHODS.has(method.name) && method.parameters.length > 0) {
    const firstParam = method.parameters[0];
    if (firstParam?.type.startsWith('"')) {
      return `${method.name}(${firstParam.type})`;
    }
  }
  return method.name;
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function extractMethodInfo(method: MethodDeclaration, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const params = method.getParameters().map((p) => ({
    description: '',
    name: p.getName(),
    type: simplifyType(p.getType().getText())
  }));
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  const info: MemberInfo = {
    description: getDescription(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    name,
    overloadKey: '',
    parameters: params,
    returnType: simplifyType(method.getReturnType().getText()),
    signature: `${name}(${paramStr})`,
    type: ''
  };
  info.overloadKey = computeOverloadKey(info);
  return info;
}

function extractMethodSignatureInfo(method: MethodSignature, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const params = method.getParameters().map((p) => ({
    description: '',
    name: p.getName(),
    type: simplifyType(p.getType().getText())
  }));
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  const info: MemberInfo = {
    description: getDescription(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    name,
    overloadKey: '',
    parameters: params,
    returnType: simplifyType(method.getReturnType().getText()),
    signature: `${name}(${paramStr})`,
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
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    name: `${name}${optionalSuffix}`,
    overloadKey: '',
    parameters: [],
    returnType: '',
    signature: `${name}${optionalSuffix}`,
    type: getPropertyType(prop)
  };
}

function extractPropertySignatureInfo(prop: PropertySignature, isOfficial: boolean): MemberInfo {
  const name = prop.getName();
  const isOptional = prop.hasQuestionToken();
  const optionalSuffix = isOptional ? '?' : '';
  return {
    description: getDescription(prop),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    name: `${name}${optionalSuffix}`,
    overloadKey: '',
    parameters: [],
    returnType: '',
    signature: `${name}${optionalSuffix}`,
    type: getPropertyType(prop)
  };
}

async function generateMemberPages(name: string, info: TypeInfo): Promise<void> {
  const nsDir = getNamespaceDir(info.namespace);
  const typeDir = kebabCase(name);

  // Property pages
  const props = info.properties.filter((p) => !p.name.includes('__'));
  for (const prop of props) {
    const filePath = join(OUTPUT_DIR, nsDir, typeDir, `${memberSlug(prop.name)}.md`);
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

    const icon = prop.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
    lines.push(`${icon} **Type:** ${renderTypeWithLinks(prop.type, nsDir)}`);
    lines.push('');

    if (prop.description) {
      lines.push(resolveLinks(prop.description, nsDir));
      lines.push('');
    }

    if (prop.inheritedFrom) {
      lines.push(`*Inherited from ${prop.inheritedFrom}*`);
      lines.push('');
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }

  // Method pages — each overload key gets its own page (fix #9)
  const methods = info.methods.filter((m) => !m.name.includes('__'));
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
    const filePath = join(OUTPUT_DIR, nsDir, typeDir, `${slug}.md`);
    await ensureDir(filePath);

    const displayName = overloads.length === 1
      ? `${name}.${overloads[0]?.name ?? overloadKey}()`
      : `${name}.${overloadKey}`;

    const lines: string[] = [];
    lines.push('---');
    lines.push(`title: "${escapeYaml(displayName)}"`);
    lines.push('editUrl: false');
    lines.push('sidebar:');
    lines.push(`  label: "${escapeYaml(displayName)}"`);
    lines.push('---');
    lines.push('');

    for (const overload of overloads) {
      const icon = overload.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
      lines.push(`${icon} **Signature:**`);
      lines.push('');
      lines.push('```ts');
      lines.push(`${overload.signature}: ${overload.returnType}`);
      lines.push('```');
      lines.push('');

      if (overload.description) {
        lines.push(resolveLinks(overload.description, nsDir));
        lines.push('');
      }

      if (overload.parameters.length > 0) {
        lines.push('**Parameters:**');
        lines.push('');
        lines.push('| Parameter | Type | Description |');
        lines.push('| :-- | :-- | :-- |');
        for (const param of overload.parameters) {
          lines.push(`| \`${param.name}\` | ${renderTypeWithLinks(param.type, nsDir)} | ${escapeMarkdown(param.description)} |`);
        }
        lines.push('');
      }

      lines.push(`**Returns:** ${renderTypeWithLinks(overload.returnType, nsDir)}`);
      lines.push('');

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
    if (info.properties.length === 0 && info.methods.length === 0) {
      continue;
    }
    if (!namespaces.has(info.namespace)) {
      namespaces.set(info.namespace, []);
    }
    namespaces.get(info.namespace)?.push(info);
  }

  for (const [namespace, nsTypes] of namespaces) {
    const nsDir = getNamespaceDir(namespace);
    const displayName = NAMESPACE_DISPLAY_NAMES[namespace] ?? namespace;
    const filePath = join(OUTPUT_DIR, nsDir, 'index.md');
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
        lines.push(`| [${cls.name}](./${kebabCase(cls.name)}/) | ${escapeMarkdown(resolveLinks(cls.description, nsDir))} |`);
      }
      lines.push('');
    }

    if (interfaces.length > 0) {
      lines.push('## Interfaces');
      lines.push('');
      lines.push('| Interface | Description |');
      lines.push('| :-- | :-- |');
      for (const iface of interfaces) {
        lines.push(`| [${iface.name}](./${kebabCase(iface.name)}/) | ${escapeMarkdown(resolveLinks(iface.description, nsDir))} |`);
      }
      lines.push('');
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

async function generateOverviewPage(name: string, info: TypeInfo): Promise<void> {
  const nsDir = getNamespaceDir(info.namespace);
  const typeSlug = kebabCase(name);
  const filePath = join(OUTPUT_DIR, nsDir, typeSlug, 'index.md');
  await ensureDir(filePath);

  const lines: string[] = [];

  const badgeText = info.isOfficial ? 'Official' : 'Unofficial';
  const badgeVariant = info.isOfficial ? 'success' : 'caution';
  lines.push('---');
  lines.push(`title: ${name}`);
  lines.push('editUrl: false');
  lines.push('sidebar:');
  lines.push(`  label: ${name}`);
  lines.push('  badge:');
  lines.push(`    text: ${badgeText}`);
  lines.push(`    variant: ${badgeVariant}`);
  lines.push('---');
  lines.push('');

  const typeIcon = info.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
  const typeLabel = info.isOfficial ? 'Official' : 'Unofficial';
  lines.push(`<p>${typeIcon} <strong>${typeLabel}</strong></p>`);
  lines.push('');

  if (info.description) {
    lines.push(resolveLinks(info.description, nsDir));
    lines.push('');
  }

  const extendsClause = info.baseTypes.length > 0 ? ` extends ${info.baseTypes.join(', ')}` : '';
  lines.push('**Signature:**');
  lines.push('');
  lines.push('```ts');
  lines.push(`export ${info.kind} ${name}${extendsClause}`);
  lines.push('```');
  lines.push('');

  if (info.baseTypes.length > 0) {
    const linkedTypes = info.baseTypes.map((t) => typeLink(t, nsDir));
    lines.push(`**Extends:** ${linkedTypes.join(', ')}`);
    lines.push('');
  }

  // Constructor section — extract from constructorN__ pseudo-methods
  const constructorMethod = getConstructorMethod(info.methods);
  if (constructorMethod) {
    lines.push('## Constructor');
    lines.push('');
    lines.push('```ts');
    lines.push(`new ${name}${constructorMethod.signature.replace(/^constructor\d*__/, '')}`);
    lines.push('```');
    lines.push('');
    if (constructorMethod.description) {
      lines.push(resolveLinks(constructorMethod.description, nsDir));
      lines.push('');
    }
  }

  // Properties table
  const props = info.properties.filter((p) => !p.name.includes('__'));
  if (props.length > 0) {
    lines.push('## Properties');
    lines.push('');
    lines.push('| | Property | Type | Description |');
    lines.push('| :--: | :-- | :-- | :-- |');
    for (const prop of props) {
      const icon = prop.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
      const inherited = prop.inheritedFrom ? `<br/>*(Inherited from ${prop.inheritedFrom})*` : '';
      const desc = escapeMarkdown(resolveLinks(prop.description, nsDir)) + inherited;
      const type = renderTypeWithLinks(prop.type, nsDir);
      const propLink = `[${prop.name}](./${memberSlug(prop.name)}/)`;
      lines.push(`| ${icon} | ${propLink} | ${type} | ${desc} |`);
    }
    lines.push('');
  }

  // Methods table — each overload gets its own row and link
  const methods = info.methods.filter((m) => !m.name.includes('__'));
  if (methods.length > 0) {
    lines.push('## Methods');
    lines.push('');
    lines.push('| | Method | Returns | Description |');
    lines.push('| :--: | :-- | :-- | :-- |');
    for (const method of methods) {
      const icon = method.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
      const desc = escapeMarkdown(resolveLinks(method.description, nsDir));
      const escapedSig = escapeMarkdown(method.signature);
      // Each overload gets its own page slug
      const slug = overloadSlug(method.overloadKey);
      const link = `[${escapedSig}](./${slug}/)`;
      const returnType = renderTypeWithLinks(method.returnType, nsDir);
      const inheritedHtml = method.inheritedFrom ? `<br/>*(Inherited from ${method.inheritedFrom})*` : '';
      lines.push(`| ${icon} | ${link} | ${returnType} | ${desc}${inheritedHtml} |`);
    }
    lines.push('');
  }

  await writeFile(filePath, lines.join('\n'), 'utf-8');
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

function getDescription(node: JSDocableNode): string {
  const docs = node.getJsDocs();
  if (docs.length === 0) {
    return '';
  }
  return docs[docs.length - 1]?.getDescription().trim() ?? '';
}

function getNamespaceDir(namespace: string): string {
  return NAMESPACE_DIR_NAMES[namespace] ?? kebabCase(namespace);
}

/** Strip `| undefined` only when it was implicitly added by ts-morph for optional properties */
function getPropertyType(prop: PropertyDeclaration | PropertySignature): string {
  // Use the type node text (what's written in source) if available, otherwise fall back to resolved type
  const typeNode = prop.getTypeNode();
  if (typeNode) {
    return simplifyType(typeNode.getText());
  }
  return simplifyType(prop.getType().getText());
}

function kebabCase(name: string): string {
  return name.replace(/[A-Z]/g, (c, i) => (i > 0 ? '-' : '') + c.toLowerCase());
}

/** Sanitize a member name for use as a filename */
function memberSlug(name: string): string {
  const cleaned = name
    .replace(/^["']|["']$/g, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
  if (!cleaned) {
    return 'unnamed';
  }
  return kebabCase(cleaned);
}

/** Slugify an overload key for URLs: on("changed") -> on-changed */
function overloadSlug(overloadKey: string): string {
  return overloadKey
    .replace(/["'()]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/** Resolve {@link Name} and {@link Name | display text} tags in description text */
function resolveLinks(text: string, currentNsDir: string): string {
  return text.replace(/\{@link\s+(?<target>[^|}]+?)(?:\s*\|\s*(?<display>[^}]+?))?\}/g, (...args) => {
    const groups = args[args.length - 1] as LinkMatchGroups;
    const target = groups.target.trim();
    const display = groups.display?.trim() ?? target;
    const info = allTypes.get(target);
    if (info) {
      const targetNsDir = getNamespaceDir(info.namespace);
      if (targetNsDir === currentNsDir) {
        return `[${display}](../${kebabCase(target)}/)`;
      }
      return `[${display}](../../${targetNsDir}/${kebabCase(target)}/)`;
    }
    return `\`${display}\``;
  });
}

function simplifyType(typeText: string): string {
  return typeText
    .replace(/import\("[^"]+"\)\./g, '')
    .replace(/import\('[^']+'\)\./g, '');
}

/** Create a link to a type. Links are relative to the overview page (nsDir/typeSlug/index.md) */
function typeLink(typeName: string, currentNsDir: string): string {
  const cleanName = typeName.replace(/<.*>$/, '').trim();
  const info = allTypes.get(cleanName);
  if (!info) {
    return `\`${typeName}\``;
  }
  const targetNsDir = getNamespaceDir(info.namespace);
  if (targetNsDir === currentNsDir) {
    return `[${typeName}](../${kebabCase(cleanName)}/)`;
  }
  return `[${typeName}](../../${targetNsDir}/${kebabCase(cleanName)}/)`;
}

/** Single-letter and common generic type parameter names — not linkable */
const GENERIC_TYPE_PARAMS = new Set([
  'Arg', 'Args', // Short identifiers / enum-like values that aren't types
  'ASC', 'Callback', 'ComponentType', 'DESC', 'DOMContentLoaded',
  'GET', 'HookCallback', 'HookName', 'ID', 'Input', 'Instance', 'Item', 'K', 'Key', 'Marked',
  'O', 'Output', 'Owner', 'P', 'POST', 'R', 'S', 'Suspects',
  'T', 'TFunction', 'TModal', 'TView', 'TViewType',
  'U', 'UserProperties', 'V', 'VIEW'
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
  Array: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array',
  // TypeScript lib built-ins
  ArrayBufferLike: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer',
  ArrayLike: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
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
  HeadersInit: 'https://developer.mozilla.org/docs/Web/API/Headers/Headers#init',
  HTMLElementEventMap: 'https://developer.mozilla.org/docs/Web/API/HTMLElement#events',

  HTMLElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/Document/createElement',
  Iterable: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols',
  Iterator: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator',

  Map: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map',
  // Moment.js
  Moment: 'https://momentjs.com/docs/#/parsing/',
  MomentInput: 'https://momentjs.com/docs/#/parsing/',
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
  WindowEventMap: 'https://developer.mozilla.org/docs/Web/API/Window#events'
};
// Cspell:enable

function escapeYaml(text: string): string {
  return text.replace(/["']/g, '');
}

async function generateSidebarJson(types: Map<string, TypeInfo>): Promise<void> {
  const namespaces = new Map<string, TypeInfo[]>();
  for (const [_name, info] of types) {
    if (info.properties.length === 0 && info.methods.length === 0) {
      continue;
    }
    if (!namespaces.has(info.namespace)) {
      namespaces.set(info.namespace, []);
    }
    namespaces.get(info.namespace)?.push(info);
  }

  const sidebar = [];
  for (const [namespace, nsTypes] of namespaces) {
    const nsDir = getNamespaceDir(namespace);
    const displayName = NAMESPACE_DISPLAY_NAMES[namespace] ?? namespace;
    const items = nsTypes
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((t) => ({
        label: t.name,
        link: `/api/${nsDir}/${kebabCase(t.name)}/`
      }));

    sidebar.push({
      collapsed: true,
      items,
      label: displayName
    });
  }

  const sidebarPath = join(process.cwd(), 'src/generated-sidebar.json');
  const JSON_INDENT = 2;
  await writeFile(sidebarPath, JSON.stringify(sidebar, null, JSON_INDENT), 'utf-8');
  console.warn(`Generated sidebar with ${String(sidebar.length)} namespaces`);
}

/** Render a type string with clickable links for known types */
function renderTypeWithLinks(typeText: string, currentNsDir: string): string {
  return escapeMarkdown(typeText).replace(/\b(?<typeName>[a-zA-Z][a-zA-Z0-9]*)\b/g, (match) => {
    // Skip generic type parameters
    if (GENERIC_TYPE_PARAMS.has(match)) {
      return match;
    }

    // Check our own types first
    const info = allTypes.get(match);
    if (info) {
      const targetNsDir = getNamespaceDir(info.namespace);
      if (targetNsDir === currentNsDir) {
        return `[${match}](../${kebabCase(match)}/)`;
      }
      return `[${match}](../../${targetNsDir}/${kebabCase(match)}/)`;
    }

    // TypeScript utility types
    const tsUrl = resolveTsUtilityUrl(match);
    if (tsUrl) {
      return `[${match}](${tsUrl})`;
    }

    // JS global types (Array, Promise, Map, etc.)
    const globalUrl = TS_GLOBAL_TYPES[match];
    if (globalUrl) {
      return `[${match}](${globalUrl})`;
    }

    // Web API / MDN types (1099 types from typedoc-plugin-mdn-links)
    const mdnUrl = resolveWebApiUrl(match);
    if (mdnUrl) {
      return `[${match}](${mdnUrl})`;
    }

    // TypeScript primitive types
    const primitiveUrl = TS_PRIMITIVE_TYPES[match];
    if (primitiveUrl) {
      return `[${match}](${primitiveUrl})`;
    }

    return match;
  });
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

await main();
