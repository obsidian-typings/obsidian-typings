import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type {
  MemberInfo,
  PageContent,
  SidebarEntry,
  SidebarLink,
  SidebarTreeNode,
  TypeInfo
} from './api-doc-types.ts';

import {
  BASE_PATH,
  EVENT_METHODS,
  OUTPUT_DIR
} from './api-doc-constants.ts';
import { getConstructorMethod } from './api-doc-jsdoc.ts';
import {
  linkBaseType,
  markdownToHtml,
  memberHref,
  renderTypeWithLinks,
  resolveLinks,
  typeLink
} from './api-doc-link-rendering.ts';
import {
  ensureDir,
  escapeJsString,
  escapeJsxAttr,
  escapeMarkdown,
  escapeMdxAngleBrackets,
  escapeMdxBraces,
  escapeYaml,
  getComponentImportPath,
  getDisplayName,
  getImportStatement,
  getNamespaceDir,
  memberSlug,
  overloadSlug
} from './api-doc-text-utils.ts';

/** Append backlinks to overview pages and write all files */
export async function appendBacklinksAndWrite(
  pageContents: Map<string, PageContent>,
  types: Map<string, TypeInfo>,
  allTypes: Map<string, TypeInfo>
): Promise<void> {
  const backlinks = buildBacklinksFromContent(pageContents, types);

  for (const [name, { content, filePath }] of pageContents) {
    const typeBacklinks = backlinks.get(name) ?? [];
    const lines = [content];
    if (typeBacklinks.length > 0) {
      const sortedBacklinks = [...typeBacklinks].sort((a, b) => a.localeCompare(b));
      lines.push('');
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
    }
    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

/** Build backlinks by scanning generated page content for internal API links */
export function buildBacklinksFromContent(
  pageContents: Map<string, PageContent>,
  types: Map<string, TypeInfo>
): Map<string, string[]> {
  const backlinks = new Map<string, string[]>();
  const escapedBase = BASE_PATH.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const linkPattern = new RegExp(`${escapedBase}/api/(?:[a-zA-Z0-9_@-]+/)+(?<typeName>[a-zA-Z0-9_-]+)/`, 'g');
  for (const [sourceName, { content }] of pageContents) {
    const referencedTypes = new Set<string>();

    for (const match of content.matchAll(linkPattern)) {
      const typeName = match.groups?.['typeName'] ?? '';
      if (typeName && types.has(typeName) && typeName !== sourceName) {
        referencedTypes.add(typeName);
      }
    }

    for (const ref of referencedTypes) {
      if (!backlinks.has(ref)) {
        backlinks.set(ref, []);
      }
      backlinks.get(ref)?.push(sourceName);
    }
  }

  return backlinks;
}

export function buildSidebarTree(types: Map<string, TypeInfo>): SidebarTreeNode {
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

export async function generateMemberPages(name: string, info: TypeInfo, allTypes: Map<string, TypeInfo>): Promise<void> {
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
    const typeAttr = ` type="${escapeJsxAttr(markdownToHtml(renderTypeWithLinks(prop.type, allTypes, name)))}"`;
    const descAttr = prop.description ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(prop.description, allTypes)))}"` : '';
    const remarksAttr = prop.remarks ? ` remarks="${escapeJsxAttr(markdownToHtml(resolveLinks(prop.remarks, allTypes)))}"` : '';
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
      renderMethodOverloadMdx(lines, overload, name, allTypes);
      if (overloads.length > 1) {
        lines.push('---');
        lines.push('');
      }
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

export async function generateNamespaceIndexPages(types: Map<string, TypeInfo>, allTypes: Map<string, TypeInfo>): Promise<void> {
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
        lines.push(`| [${cls.name}](./${cls.name}/) | ${escapeMarkdown(resolveLinks(cls.description, allTypes))} |`);
      }
      lines.push('');
    }

    if (interfaces.length > 0) {
      lines.push('## Interfaces');
      lines.push('');
      lines.push('| Interface | Description |');
      lines.push('| :-- | :-- |');
      for (const iface of interfaces) {
        lines.push(`| [${iface.name}](./${iface.name}/) | ${escapeMarkdown(resolveLinks(iface.description, allTypes))} |`);
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
        lines.push(`| [${fn.name}](./${fn.name}/) | ${escapeMarkdown(resolveLinks(fn.description, allTypes))} |`);
      }
      lines.push('');
    }

    await writeFile(filePath, lines.join('\n'), 'utf-8');
  }
}

export async function generateOverviewPage(name: string, info: TypeInfo, allTypes: Map<string, TypeInfo>): Promise<PageContent> {
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
    lines.push(escapeMdxBraces(resolveLinks(info.description, allTypes)));
    lines.push('');
  }

  // Remarks
  if (info.remarks) {
    lines.push(`> ${escapeMdxBraces(resolveLinks(info.remarks, allTypes))}`);
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
    renderFunctionPage(lines, info, allTypes);
    return { content: lines.join('\n'), filePath };
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
    lines.push(`**Type:** ${escapeMdxBraces(escapeMdxAngleBrackets(renderTypeWithLinks(varType, allTypes)))}`);
    lines.push('');
    return { content: lines.join('\n'), filePath };
  }

  // Signature
  const typeParamsAttr = info.typeParameters.length > 0 ? ` typeParams={${JSON.stringify(info.typeParameters)}}` : '';
  const extendsAttr = info.baseTypes.length > 0 ? ` extends={${JSON.stringify(info.baseTypes)}}` : '';
  const implementsAttr = info.implementsTypes.length > 0 ? ` implements={${JSON.stringify(info.implementsTypes)}}` : '';
  lines.push(`<TypeSignature kind="${info.kind}" name="${name}"${typeParamsAttr}${extendsAttr}${implementsAttr} />`);
  lines.push('');

  if (info.baseTypes.length > 0) {
    const linkedTypes = info.baseTypes.map((t) => linkBaseType(t, allTypes));
    lines.push(`**Extends:** ${linkedTypes.join(', ')}`);
    lines.push('');
  }

  if (info.implementsTypes.length > 0) {
    const linkedTypes = info.implementsTypes.map((t) => linkBaseType(t, allTypes));
    lines.push(`**Implements:** ${linkedTypes.join(', ')}`);
    lines.push('');
  }

  renderConstructorMdx(lines, name, info, allTypes);
  renderPropertyTableMdx(lines, info, allTypes);
  renderMethodTableMdx(lines, info, allTypes);

  return { content: lines.join('\n'), filePath };
}

export async function generateSidebarJson(types: Map<string, TypeInfo>): Promise<void> {
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

export function renderConstructorMdx(lines: string[], name: string, info: TypeInfo, allTypes: Map<string, TypeInfo>): void {
  const constructorMethod = getConstructorMethod(info.methods);
  if (!constructorMethod) {
    return;
  }
  const ctorSig = `new ${name}${constructorMethod.signature.replace(/^constructor\d*__/, '')}`;
  const ctorDesc = constructorMethod.description
    ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(constructorMethod.description, allTypes)))}"`
    : '';
  const ctorStatus = renderApiStatus(constructorMethod.isOfficial);
  lines.push(`<ConstructorBlock status={${ctorStatus}} signature="${escapeJsxAttr(ctorSig)}"${ctorDesc} />`);
  lines.push('');
}

export function renderFunctionPage(lines: string[], info: TypeInfo, allTypes: Map<string, TypeInfo>): void {
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
        `| \`${param.name}\` | ${escapeMarkdown(escapeMdxAngleBrackets(renderTypeWithLinks(param.type, allTypes)))} | ${
          escapeMarkdown(resolveLinks(param.description, allTypes))
        } |`
      );
    }
    lines.push('');
  }

  const returnDesc = fn.returnDescription ? ` — ${escapeMdxAngleBrackets(resolveLinks(fn.returnDescription, allTypes))}` : '';
  lines.push(`**Returns:** ${escapeMdxAngleBrackets(renderTypeWithLinks(fn.returnType, allTypes))}${returnDesc}`);
  lines.push('');

  for (const example of fn.examples) {
    lines.push('**Example:**');
    lines.push('');
    lines.push(example);
    lines.push('');
  }
}

export function renderMethodOverloadMdx(lines: string[], overload: MemberInfo, typeName: string, allTypes: Map<string, TypeInfo>): void {
  const statusEnum = overload.isOfficial ? 'ApiStatus.Official' : 'ApiStatus.Unofficial';
  const sig = `${overload.signature}: ${overload.returnType}`;
  const descAttr = overload.description ? ` description="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.description, allTypes)))}"` : '';
  const remarksAttr = overload.remarks ? ` remarks="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.remarks, allTypes)))}"` : '';
  const sinceAttr = overload.since ? ` since="${escapeJsxAttr(overload.since)}"` : '';
  const returnTypeAttr = ` returnType="${escapeJsxAttr(markdownToHtml(renderTypeWithLinks(overload.returnType, allTypes, typeName)))}"`;
  const returnDescAttr = overload.returnDescription
    ? ` returnDescription="${escapeJsxAttr(markdownToHtml(resolveLinks(overload.returnDescription, allTypes)))}"`
    : '';
  const examplesAttr = overload.examples.length > 0 ? ` examples={${JSON.stringify(overload.examples)}}` : '';

  const params = overload.parameters.map((p) => ({
    description: markdownToHtml(p.description || (p.name.endsWith('?') ? '*(Optional)*' : '')),
    name: p.name,
    type: markdownToHtml(renderTypeWithLinks(p.type, allTypes, typeName))
  }));
  const paramsAttr = params.length > 0 ? ` parameters={${JSON.stringify(params)}}` : '';

  lines.push(
    `<MemberDetail status={${statusEnum}} signature="${
      escapeJsxAttr(sig)
    }"${descAttr}${remarksAttr}${sinceAttr}${returnTypeAttr}${returnDescAttr}${paramsAttr}${examplesAttr} />`
  );
  lines.push('');
}

export function renderMethodTableMdx(lines: string[], info: TypeInfo, allTypes: Map<string, TypeInfo>): void {
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
    const desc = escapeJsString(markdownToHtml(resolveLinks(method.description, allTypes)));
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
    const returnType = markdownToHtml(renderTypeWithLinks(method.returnType, allTypes, info.name));
    const inheritedAttr = method.inheritedFrom ? `, inheritedFrom: "${escapeJsString(markdownToHtml(typeLink(method.inheritedFrom, allTypes)))}"` : '';
    const href = memberHref(slug, method.inheritedFrom, allTypes);
    lines.push(
      `  { status: ${status}, signature: "${sig}", href: "${escapeJsString(href)}", returns: "${
        escapeJsString(returnType)
      }", description: "${desc}"${inheritedAttr} },`
    );
  }
  lines.push(']} />');
  lines.push('');
}

export function renderPropertyTableMdx(lines: string[], info: TypeInfo, allTypes: Map<string, TypeInfo>): void {
  const props = info.properties.filter((p) => !p.name.includes('__'));
  if (props.length === 0) {
    return;
  }
  lines.push('<PropertyTable rows={[');
  for (const prop of props) {
    const status = renderApiStatus(prop.isOfficial);
    const desc = escapeJsString(markdownToHtml(resolveLinks(prop.description, allTypes)));
    const type = markdownToHtml(renderTypeWithLinks(prop.type, allTypes, info.name));
    const inheritedAttr = prop.inheritedFrom ? `, inheritedFrom: "${escapeJsString(markdownToHtml(typeLink(prop.inheritedFrom, allTypes)))}"` : '';
    const href = memberHref(memberSlug(prop.name), prop.inheritedFrom, allTypes);
    lines.push(
      `  { status: ${status}, name: "${escapeJsString(prop.name)}", href: "${escapeJsString(href)}", type: "${
        escapeJsString(type)
      }", description: "${desc}"${inheritedAttr} },`
    );
  }
  lines.push(']} />');
  lines.push('');
}

export function sidebarTreeToEntries(node: SidebarTreeNode, label: string): SidebarEntry {
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

function renderApiStatus(isOfficial: boolean): string {
  return isOfficial ? 'ApiStatus.Official' : 'ApiStatus.Unofficial';
}
