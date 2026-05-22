import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  LinkMatchGroups,
  TypeInfo,
  WebApiEntry
} from './api-doc-types.ts';

import {
  BASE_PATH,
  GENERIC_TYPE_PARAMS,
  TS_GLOBAL_TYPES,
  TS_PRIMITIVE_TYPES,
  TS_UTILITY_TYPES
} from './api-doc-constants.ts';
import {
  escapeMdxAngleBrackets,
  getNamespaceDir,
  memberSlug
} from './api-doc-text-utils.ts';

/** Loaded from typedoc-plugin-mdn-links data at runtime */
let webApiTypes: Record<string, unknown> = {};

/**
 * Link a base type expression for the "Extends:" line.
 * Simple type references (identifier + optional generics) use renderTypeWithLinks
 * so each type argument gets its own link.
 * Complex expressions (object types, intersections, etc.) fall back to typeLink
 * to avoid MDX parsing issues with `{`, `}`, `|` etc.
 */
export function linkBaseType(typeName: string, allTypes: Map<string, TypeInfo>): string {
  const isSimpleTypeRef = /^[a-zA-Z][a-zA-Z0-9]*(?:<.*>)?$/.test(typeName.trim());
  if (isSimpleTypeRef) {
    return escapeMdxAngleBrackets(renderTypeWithLinks(typeName, allTypes));
  }
  return typeLink(typeName, allTypes);
}

export function loadExternalTypeMaps(): void {
  try {
    const dataPath = join(process.cwd(), 'node_modules/typedoc-plugin-mdn-links/data/web-api.json');
    webApiTypes = JSON.parse(readFileSync(dataPath, 'utf-8')) as Record<string, unknown>;
    console.warn(`Loaded ${String(Object.keys(webApiTypes).length)} Web API type links`);
  } catch {
    console.warn('typedoc-plugin-mdn-links data not found — Web API links will be unavailable.');
  }
}

/** Convert inline markdown to HTML for use in component props with set:html */
export function markdownToHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)/g, '<a href="$<url>">$<text></a>')
    .replace(/`(?<code>[^`]+)`/g, '<code>$<code></code>')
    .replace(/\n/g, '<br/>');
}

/** Build the href for a member, pointing to the parent type's page if inherited */
export function memberHref(memberSlugStr: string, inheritedFrom: string, allTypes: Map<string, TypeInfo>): string {
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

/** Render a type string with clickable links for known types */
export function renderTypeWithLinks(typeText: string, allTypes: Map<string, TypeInfo>, selfTypeName?: string): string {
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

/** Resolve {@link Name} and {@link Name | display text} tags in description text */
export function resolveLinks(text: string, allTypes: Map<string, TypeInfo>): string {
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
        return renderTypeWithLinks(display, allTypes);
      }
      const targetNsDir = getNamespaceDir(info.namespace);
      return `[${display}](${BASE_PATH}/api/${targetNsDir}/${target}/)`;
    }
    return `\`${display}\``;
  });
}

export function resolveTsUtilityUrl(name: string): string | undefined {
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

export function resolveWebApiUrl(name: string): string | undefined {
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

/** Create an absolute link to a type page */
export function typeLink(typeName: string, allTypes: Map<string, TypeInfo>): string {
  const cleanName = typeName.replace(/<.*>$/, '').trim();
  const info = allTypes.get(cleanName);
  if (!info) {
    return `\`${typeName}\``;
  }
  const targetNsDir = getNamespaceDir(info.namespace);
  return `[${escapeMdxAngleBrackets(typeName)}](${BASE_PATH}/api/${targetNsDir}/${cleanName}/)`;
}
