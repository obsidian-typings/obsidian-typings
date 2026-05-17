import type { Application } from 'typedoc';
import type { MarkdownRenderer } from 'typedoc-plugin-markdown';

import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

interface HeadingRegex {
  regex: RegExp[];
  type: string;
}

const CONVERT_HEADINGS = ['Todo', 'Tutorial', 'Remark', 'Deprecated', 'Unofficial', 'Official'];

const UNOFFICIAL_ICON = '<span title="Unofficial API — reverse-engineered, may change without notice">🔮</span>';
const OFFICIAL_ICON = '<span title="Official API — part of the public Obsidian API">📋</span>';

export function load(app: Application): void {
  const regexes: HeadingRegex[] = CONVERT_HEADINGS.map((heading) => ({
    regex: [
      new RegExp(`#{1,6} ${heading}\n([\\s\\S]*?)(?=^##|\\z|:::)`, 'gm'),
      new RegExp(`#{1,6} ${heading}\n([\\s\\S]*)(?=:::)`, 'gm')
    ],
    type: heading.toLowerCase()
  }));

  const renderer = app.renderer as MarkdownRenderer;
  renderer.on(MarkdownPageEvent.END, (page: MarkdownPageEvent) => {
    for (const heading of regexes) {
      for (const regexp of heading.regex) {
        page.contents = page.contents.replace(regexp, `:::${heading.type}{.${heading.type}}$1:::\n`);
      }
    }

    page.contents = collapseConstructorsSection(page.contents);
    page.contents = convertMethodsToTable(page.contents);
    page.contents = addStatusColumnToTables(page.contents);
  });
}

function collapseConstructorsSection(contents: string): string {
  return contents.replace(
    /^## Constructors\n+### Constructor\n+> (.*)\n+(?:#### Returns\n+.*\n+)?(?:#### Inherited from\n+.*\n+)?/gm,
    '## Constructor\n\n> $1\n\n'
  );
}

function convertMethodsToTable(contents: string): string {
  const METHOD_SECTION_RE = /^## Methods\n([\s\S]*?)(?=^## |\n$(?![\s\S]))/gm;

  return contents.replace(METHOD_SECTION_RE, (_match, methodsBody: string) => {
    const methodBlocks = methodsBody.split(/^### /gm).filter((block) => block.trim());
    const rows: string[] = [];

    for (const block of methodBlocks) {
      const parsed = parseMethodBlock(block);
      if (parsed) {
        rows.push(parsed);
      }
    }

    if (rows.length === 0) {
      return _match;
    }

    const header = '| Method | Returns | Description |';
    const separator = '| :-- | :-- | :-- |';
    return `## Methods\n\n${header}\n${separator}\n${rows.join('\n')}\n\n`;
  });
}

function isConstructorPseudoMethod(name: string): boolean {
  // Matches: constructor__(), constructor2__(), ~~constructor__()~~, ~~constructor2\_\_()~~
  return /^~{0,2}constructor\d*(?:\\?_){2}/.test(name);
}

function parseMethodBlock(block: string): string | undefined {
  const lines = block.split('\n');
  const nameLine = lines[0]?.trim();
  if (!nameLine) {
    return undefined;
  }

  const name = nameLine.replace(/\(\)$/, '');

  if (isConstructorPseudoMethod(name)) {
    return undefined;
  }

  const signatureMatch = block.match(/> \*\*(\w+)\*\*(\([^)]*\)):\s*(.+)/);
  const params = signatureMatch ? signatureMatch[2]?.trim() ?? '()' : '()';
  const returnType = signatureMatch ? signatureMatch[3]?.trim() ?? '' : '';

  const descLines: string[] = [];
  let isFoundSignature = false;
  for (const line of lines) {
    if (line.startsWith('> **')) {
      isFoundSignature = true;
      continue;
    }
    if (isFoundSignature && !line.startsWith('>') && !line.startsWith('#') && !line.startsWith('Defined in:') && !line.startsWith('| ') && line.trim()) {
      const trimmed = line.trim();
      if (trimmed === '#### Returns' || trimmed === '#### Parameters' || trimmed === '#### Call Signature' || trimmed.startsWith('Defined in:')) {
        continue;
      }
      if (trimmed && !trimmed.startsWith('#')) {
        descLines.push(trimmed);
        break;
      }
    }
  }

  const isUnofficial = block.includes('**Unofficial**');
  const isOfficial = block.includes('**Official**');
  const description = descLines.join(' ').replace(/\s*\*\*Unofficial\*\*/g, '').replace(/\s*\*\*Official\*\*/g, '').trim();

  // Keep an unofficial/official marker so addStatusColumnToTables can add the icon column
  const marker = isUnofficial ? ' **Unofficial**' : isOfficial ? ' **Official**' : '';

  const cleanName = name.replace(/\\/g, '');
  const cleanParams = params.replace(/\\/g, '');
  const cleanReturn = returnType.replace(/\\/g, '');

  return `| \`${cleanName}${cleanParams}\` | ${cleanReturn} | ${description}${marker} |`;
}

function addStatusColumnToTables(contents: string): string {
  return contents.replace(/^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n)*)/gm, (_match, headerRow: string, separatorRow: string, bodyRows: string) => {
    if (!headerRow.includes('Property') && !headerRow.includes('Method')) {
      return _match;
    }

    const newHeader = headerRow.replace('|', '| |');
    const newSeparator = separatorRow.replace('|', '| :--: |');
    const newBody = bodyRows.replace(/^(\|.+)\|$/gm, (row: string) => {
      let icon = OFFICIAL_ICON;
      let cleanedRow = row;
      if (row.includes('**Unofficial**')) {
        icon = UNOFFICIAL_ICON;
        cleanedRow = row.replace(/\s*\*\*Unofficial\*\*/g, '');
      } else if (row.includes('**Official**')) {
        cleanedRow = row.replace(/\s*\*\*Official\*\*/g, '');
      }
      return cleanedRow.replace('|', `| ${icon} |`);
    });

    return `${newHeader}\n${newSeparator}\n${newBody}`;
  });
}
