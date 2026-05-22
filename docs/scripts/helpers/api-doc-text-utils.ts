import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

import type {
  MemberInfo,
  TypeInfo
} from './api-doc-types.ts';

import {
  EVENT_METHODS,
  TYPINGS_PACKAGE
} from './api-doc-constants.ts';

/** Compute an overload key for methods with distinguishing first param (e.g. on('changed',...)) */
export function computeOverloadKey(method: MemberInfo): string {
  if (EVENT_METHODS.has(method.name) && method.parameters.length > 0) {
    const firstParam = method.parameters[0];
    if (firstParam?.type.startsWith('"') || firstParam?.type.startsWith('\'')) {
      const normalizedType = firstParam.type.replace(/"/g, '\'');
      return `${method.name}(${normalizedType})`;
    }
  }
  return method.name;
}

export async function ensureDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
}

/** Escape text for use inside a JS string within a JSX expression: {...{key: "..."}} */
export function escapeJsString(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

/** Escape text for use inside a JSX attribute: attr="..." (MDX uses HTML-style parsing) */
export function escapeJsxAttr(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

export function escapeMarkdown(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

export function escapeMdxAngleBrackets(text: string): string {
  return text.replace(/</g, '\\<').replace(/>/g, '\\>');
}

/** Escape curly braces in MDX markdown content to prevent JSX expression parsing */
export function escapeMdxBraces(text: string): string {
  return text.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
}

export function escapeYaml(text: string): string {
  return text.replace(/"/g, '\\"');
}

/** Collapse single newlines within paragraphs to spaces, preserve double newlines as paragraph breaks. */
export function foldTsDocParagraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, ' '))
    .join('\n\n');
}

/** Compute relative import path from a generated page to the components directory */
export function getComponentImportPath(nsDir: string, typeDir: string): string {
  // Page is at: src/content/docs/api/{nsDir}/{typeDir}/index.mdx
  // Components are at: src/components/api/
  // We need to go up from content/docs/api/{nsDir}/{typeDir}/ to src/, then into components/api
  const segments = ['content', 'docs', 'api', ...nsDir.split('/'), ...typeDir.split('/')].filter(Boolean);
  const ups = '../'.repeat(segments.length);
  return `${ups}components/api`;
}

export function getDisplayName(name: string, info: TypeInfo): string {
  if (info.typeParameters.length === 0) {
    return name;
  }
  const bareParams = info.typeParameters.map((tp) => tp.replace(/\s+extends\s+.*$/, ''));
  return `${name}<${bareParams.join(', ')}>`;
}

export function getImportStatement(info: TypeInfo): string | undefined {
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

export function getNamespaceDir(namespace: string): string {
  return namespace;
}

/** Sanitize a member name for use as a filename */
export function memberSlug(name: string): string {
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
export function overloadSlug(overloadKey: string): string {
  return overloadKey
    .replace(/["'()]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function simplifyType(typeText: string): string {
  return typeText
    .replace(/import\("[^"]+"\)\./g, '')
    .replace(/import\('[^']+'\)\./g, '');
}
