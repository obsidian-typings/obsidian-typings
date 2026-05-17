/**
 * Custom API documentation generator.
 *
 * Reads obsidian.d.ts (base types) and our augmentation types,
 * merges them, and generates Starlight-compatible markdown pages.
 */

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
import {
  ClassDeclaration,
  InterfaceDeclaration,
  JSDocableNode,
  MethodDeclaration,
  MethodSignature,
  Node,
  Project,
  PropertyDeclaration,
  PropertySignature,
  SourceFile,
  Type
} from 'ts-morph';

const UNOFFICIAL_ICON = '<span title="Unofficial API — reverse-engineered, may change without notice">🔍</span>';
const OFFICIAL_ICON = '<span title="Official API — part of the public Obsidian API">📋</span>';

interface MemberInfo {
  description: string;
  inheritedFrom: string;
  isOfficial: boolean;
  name: string;
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
  properties: MemberInfo[];
}

const OUTPUT_DIR = join(process.cwd(), 'src/content/docs/api');

async function main(): Promise<void> {
  const project = new Project({ skipAddingFilesFromTsConfig: true });

  const rootDir = resolve(process.cwd(), '..');

  // Try to load base obsidian types (available on release branches)
  const obsidianPath = join(rootDir, 'node_modules/obsidian/obsidian.d.ts');
  let obsidianSrc: SourceFile | undefined;
  try {
    obsidianSrc = project.addSourceFileAtPath(obsidianPath);
  } catch {
    console.warn('obsidian.d.ts not found — base types will not be included. Run on a release branch for full output.');
  }

  // Load our augmentation types (bundled)
  const augSrc = project.addSourceFileAtPath(
    join(rootDir, 'dist/cjs/types.d.cts')
  );

  // Collect all types
  const types = new Map<string, TypeInfo>();

  // Process base obsidian types (if available)
  if (obsidianSrc) {
    for (const cls of obsidianSrc.getClasses()) {
      const name = cls.getName();
      if (!name) {
        continue;
      }
      types.set(name, extractClassInfo(cls, true));
    }

    for (const iface of obsidianSrc.getInterfaces()) {
      const name = iface.getName();
      if (types.has(name)) {
        mergeInterfaceIntoType(types.get(name) as TypeInfo, iface, true);
      } else {
        types.set(name, extractInterfaceInfo(iface, true));
      }
    }
  }

  // Process our augmentations — top-level and inside module declarations
  processSourceFile(augSrc, types, false);

  // Also process module augmentations (declare module "obsidian" { ... })
  for (const mod of augSrc.getModules()) {
    const modName = mod.getName().replace(/['"]/g, '');
    const isOfficial = modName !== 'obsidian'; // obsidian module augmentations are unofficial
    for (const iface of mod.getInterfaces()) {
      const name = iface.getName();
      if (types.has(name)) {
        mergeInterfaceIntoType(types.get(name) as TypeInfo, iface, false);
      } else {
        types.set(name, extractInterfaceInfo(iface, false));
      }
    }
    for (const cls of mod.getClasses()) {
      const name = cls.getName();
      if (!name) {
        continue;
      }
      if (types.has(name)) {
        mergeClassIntoType(types.get(name) as TypeInfo, cls, false);
      } else {
        types.set(name, extractClassInfo(cls, false));
      }
    }
  }

  // Resolve inherited members
  resolveInheritedMembers(types);

  // Clean output directory
  await rm(OUTPUT_DIR, { force: true, recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Generate pages
  let pageCount = 0;
  for (const [name, info] of types) {
    if (info.properties.length === 0 && info.methods.length === 0) {
      continue;
    }
    await generateOverviewPage(name, info);
    await generateMemberPages(name, info);
    pageCount++;
  }

  console.log(`Generated docs for ${String(pageCount)} types, ${String(types.size)} total types`);
}

function resolveInheritedMembers(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const baseTypeName of info.baseTypes) {
      // Strip generic parameters: "Events" from "Events", "Component<T>" -> "Component"
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

function processSourceFile(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean): void {
  for (const iface of src.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      mergeInterfaceIntoType(types.get(name) as TypeInfo, iface, isOfficial);
    } else {
      types.set(name, extractInterfaceInfo(iface, isOfficial));
    }
  }

  for (const cls of src.getClasses()) {
    const name = cls.getName();
    if (!name) {
      continue;
    }
    if (types.has(name)) {
      mergeClassIntoType(types.get(name) as TypeInfo, cls, isOfficial);
    } else {
      types.set(name, extractClassInfo(cls, isOfficial));
    }
  }
}

function extractClassInfo(cls: ClassDeclaration, isOfficial: boolean): TypeInfo {
  const name = cls.getName() ?? 'Unknown';
  return {
    baseTypes: cls.getExtends() ? [cls.getExtends()?.getText() ?? ''] : [],
    description: getDescription(cls),
    isOfficial,
    kind: 'class',
    methods: cls.getMethods().map((m) => extractMethodInfo(m, isOfficial)),
    name,
    properties: cls.getProperties().map((p) => extractPropertyInfo(p, isOfficial))
  };
}

function extractInterfaceInfo(iface: InterfaceDeclaration, isOfficial: boolean): TypeInfo {
  return {
    baseTypes: iface.getExtends().map((e) => e.getText()),
    description: getDescription(iface),
    isOfficial,
    kind: 'interface',
    methods: iface.getMethods().map((m) => extractMethodSignatureInfo(m, isOfficial)),
    name: iface.getName(),
    properties: iface.getProperties().map((p) => extractPropertySignatureInfo(p, isOfficial))
  };
}

function mergeInterfaceIntoType(target: TypeInfo, iface: InterfaceDeclaration, isOfficial: boolean): void {
  for (const method of iface.getMethods()) {
    const info = extractMethodSignatureInfo(method, isOfficial);
    if (!target.methods.some((m) => m.name === info.name && m.signature === info.signature)) {
      target.methods.push(info);
    }
  }
  for (const prop of iface.getProperties()) {
    const info = extractPropertySignatureInfo(prop, isOfficial);
    if (!target.properties.some((p) => p.name === info.name)) {
      target.properties.push(info);
    }
  }
}

function mergeClassIntoType(target: TypeInfo, cls: ClassDeclaration, isOfficial: boolean): void {
  for (const method of cls.getMethods()) {
    const info = extractMethodInfo(method, isOfficial);
    if (!target.methods.some((m) => m.name === info.name && m.signature === info.signature)) {
      target.methods.push(info);
    }
  }
  for (const prop of cls.getProperties()) {
    const info = extractPropertyInfo(prop, isOfficial);
    if (!target.properties.some((p) => p.name === info.name)) {
      target.properties.push(info);
    }
  }
}

function extractMethodInfo(method: MethodDeclaration, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const params = method.getParameters().map((p) => ({
    description: '',
    name: p.getName(),
    type: simplifyType(p.getType().getText())
  }));
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  return {
    description: getDescription(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    name,
    parameters: params,
    returnType: simplifyType(method.getReturnType().getText()),
    signature: `${name}(${paramStr})`,
    type: ''
  };
}

function extractMethodSignatureInfo(method: MethodSignature, isOfficial: boolean): MemberInfo {
  const name = method.getName();
  const params = method.getParameters().map((p) => ({
    description: '',
    name: p.getName(),
    type: simplifyType(p.getType().getText())
  }));
  const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
  return {
    description: getDescription(method),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(method, isOfficial),
    name,
    parameters: params,
    returnType: simplifyType(method.getReturnType().getText()),
    signature: `${name}(${paramStr})`,
    type: ''
  };
}

function extractPropertyInfo(prop: PropertyDeclaration, isOfficial: boolean): MemberInfo {
  return {
    description: getDescription(prop),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    name: prop.getName(),
    parameters: [],
    returnType: '',
    signature: prop.getName(),
    type: simplifyType(prop.getType().getText())
  };
}

function extractPropertySignatureInfo(prop: PropertySignature, isOfficial: boolean): MemberInfo {
  return {
    description: getDescription(prop),
    inheritedFrom: '',
    isOfficial: checkIsOfficial(prop, isOfficial),
    name: prop.getName(),
    parameters: [],
    returnType: '',
    signature: prop.getName(),
    type: simplifyType(prop.getType().getText())
  };
}

function getDescription(node: JSDocableNode): string {
  const docs = node.getJsDocs();
  if (docs.length === 0) {
    return '';
  }
  return docs[0]?.getDescription().trim() ?? '';
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

function simplifyType(typeText: string): string {
  // Remove import() expressions and simplify long type paths
  return typeText
    .replace(/import\("[^"]+"\)\./g, '')
    .replace(/import\('[^']+'\)\./g, '');
}

function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function kebabCase(name: string): string {
  return name.replace(/[A-Z]/g, (c, i) => (i > 0 ? '-' : '') + c.toLowerCase());
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

async function generateOverviewPage(name: string, info: TypeInfo): Promise<void> {
  const filePath = join(OUTPUT_DIR, `${kebabCase(name)}.md`);
  await ensureDir(filePath);

  const lines: string[] = [];

  // Frontmatter
  lines.push('---');
  lines.push(`title: ${name}`);
  lines.push('editUrl: false');
  lines.push('---');
  lines.push('');

  // Description
  if (info.description) {
    lines.push(info.description);
    lines.push('');
  }

  // Signature
  const extendsClause = info.baseTypes.length > 0 ? ` extends ${info.baseTypes.join(', ')}` : '';
  lines.push('**Signature:**');
  lines.push('');
  lines.push('```ts');
  lines.push(`export ${info.kind} ${name}${extendsClause}`);
  lines.push('```');
  lines.push('');

  // Extends
  if (info.baseTypes.length > 0) {
    lines.push(`**Extends:** ${info.baseTypes.map((t) => `\`${t}\``).join(', ')}`);
    lines.push('');
  }

  // Properties table
  if (info.properties.length > 0) {
    lines.push('## Properties');
    lines.push('');
    lines.push('| | Property | Type | Description |');
    lines.push('| :--: | :-- | :-- | :-- |');
    for (const prop of info.properties) {
      if (prop.name.includes('__')) {
        continue;
      }
      const icon = prop.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
      const inherited = prop.inheritedFrom ? ` *(Inherited from ${prop.inheritedFrom})*` : '';
      const desc = escapeMarkdown(prop.description) + inherited;
      const type = escapeMarkdown(prop.type);
      lines.push(`| ${icon} | \`${prop.name}\` | \`${type}\` | ${desc} |`);
    }
    lines.push('');
  }

  // Methods table
  const methods = info.methods.filter((m) => !m.name.includes('__'));
  if (methods.length > 0) {
    lines.push('## Methods');
    lines.push('');
    lines.push('| | Method | Returns | Description |');
    lines.push('| :--: | :-- | :-- | :-- |');
    for (const method of methods) {
      const icon = method.isOfficial ? OFFICIAL_ICON : UNOFFICIAL_ICON;
      const desc = escapeMarkdown(method.description);
      const inherited = method.inheritedFrom ? ` *(Inherited from ${method.inheritedFrom})*` : '';
      const escapedSig = escapeMarkdown(method.signature);
      const link = `[${escapedSig}](./${kebabCase(name)}/${kebabCase(method.name)}/)`;
      lines.push(`| ${icon} | ${link} | \`${escapeMarkdown(method.returnType)}\` | ${desc}${inherited} |`);
    }
    lines.push('');
  }

  await writeFile(filePath, lines.join('\n'), 'utf-8');
}

async function generateMemberPages(name: string, info: TypeInfo): Promise<void> {
  const methods = info.methods.filter((m) => !m.name.includes('__'));

  // Group overloads by method name
  const methodGroups = new Map<string, MemberInfo[]>();
  for (const method of methods) {
    if (!methodGroups.has(method.name)) {
      methodGroups.set(method.name, []);
    }
    methodGroups.get(method.name)?.push(method);
  }

  for (const [methodName, overloads] of methodGroups) {
    const filePath = join(OUTPUT_DIR, kebabCase(name), `${kebabCase(methodName)}.md`);
    await ensureDir(filePath);

    const lines: string[] = [];
    lines.push('---');
    lines.push(`title: "${name}.${methodName}()"`);
    lines.push('editUrl: false');
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
        lines.push(overload.description);
        lines.push('');
      }

      if (overload.parameters.length > 0) {
        lines.push('**Parameters:**');
        lines.push('');
        lines.push('| Parameter | Type | Description |');
        lines.push('| :-- | :-- | :-- |');
        for (const param of overload.parameters) {
          lines.push(`| \`${param.name}\` | \`${escapeMarkdown(param.type)}\` | ${escapeMarkdown(param.description)} |`);
        }
        lines.push('');
      }

      lines.push(`**Returns:** \`${overload.returnType}\``);
      lines.push('');

      if (overloads.length > 1) {
        lines.push('---');
        lines.push('');
      }
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

await main();
