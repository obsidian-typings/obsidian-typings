/**
 * @file
 *
 * Tests for the changelog the wrapper packages publish.
 *
 * Only the pure half is tested, as in `changelog.test.ts` beside it: the tarball read is `npm pack` and one
 * `tar` member, and what is worth pinning is the shape of what gets published.
 */

import { gzipSync } from 'node:zlib';
// eslint-disable-next-line import-x/no-extraneous-dependencies -- Deliberately the ROOT package's vitest, which runs this file; see `scripts/vitest-config.ts`.
import {
  describe,
  expect,
  it
} from 'vitest';

import {
  createInitialChangelog,
  prependChangelogSection
} from './changelog.ts';
import {
  composeWrapperChangelogSection,
  readTarballMember
} from './wrapperChangelog.ts';

interface TarEntry {
  readonly content: string;
  readonly name: string;
  readonly prefix?: string;
}

const TAR_BLOCK_SIZE = 512;

/**
 * Writes a minimal gzipped ustar archive: one header per entry carrying the name, the prefix and the octal
 * size, then the data padded to a whole block, then the two zero blocks that end an archive.
 */
function makeTarball(entries: readonly TarEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const blocks: Uint8Array[] = [];

  for (const entry of entries) {
    const data = encoder.encode(entry.content);
    const header = new Uint8Array(TAR_BLOCK_SIZE);
    header.set(encoder.encode(entry.name), 0);
    header.set(encoder.encode(`${data.length.toString(8).padStart(11, '0')}\0`), 124);
    header.set(encoder.encode('ustar\0'), 257);
    header.set(encoder.encode(entry.prefix ?? ''), 345);
    blocks.push(header);

    const padded = new Uint8Array(Math.ceil(data.length / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE);
    padded.set(data);
    blocks.push(padded);
  }

  blocks.push(new Uint8Array(TAR_BLOCK_SIZE * 2));
  return gzipSync(Buffer.concat(blocks));
}

const SCOPED = { name: '@obsidian-typings/obsidian-public-1.13.7', version: '1.11.0' };
const TAG_NAME = 'obsidian-public-1.13.7-v1.11.0';
const RELEASE_LINK = `[its release notes](https://github.com/obsidian-typings/obsidian-typings/releases/tag/${TAG_NAME})`;

describe('composeWrapperChangelogSection', () => {
  it('names the package a -latest wrapper now resolves to, and links its release notes', () => {
    expect(composeWrapperChangelogSection({
      breakingChangeSubjects: [],
      resolutionChain: [SCOPED],
      tagName: TAG_NAME,
      version: '2.4.0'
    })).toBe([
      '## 2.4.0',
      '',
      `- Now resolves to \`@obsidian-typings/obsidian-public-1.13.7\` \`^1.11.0\`. See ${RELEASE_LINK}.`
    ].join('\n'));
  });

  it('walks the legacy package through the -latest wrapper it depends on', () => {
    expect(composeWrapperChangelogSection({
      breakingChangeSubjects: [],
      resolutionChain: [{ name: '@obsidian-typings/obsidian-public-latest', version: '2.4.0' }, SCOPED],
      tagName: TAG_NAME,
      version: '2.4.0'
    })).toBe([
      '## 2.4.0',
      '',
      '- Now resolves to `@obsidian-typings/obsidian-public-latest` `^2.4.0`, which resolves to'
      + ` \`@obsidian-typings/obsidian-public-1.13.7\` \`^1.11.0\`. See ${RELEASE_LINK}.`
    ].join('\n'));
  });

  it('repeats the release\'s breaking changes, which a caret consumer of the wrapper takes unsignalled', () => {
    expect(composeWrapperChangelogSection({
      breakingChangeSubjects: ['fix(vault)!: drop getConfigFile, which no build answers'],
      resolutionChain: [SCOPED],
      tagName: TAG_NAME,
      version: '2.4.0'
    })).toBe([
      '## 2.4.0',
      '',
      `- Now resolves to \`@obsidian-typings/obsidian-public-1.13.7\` \`^1.11.0\`. See ${RELEASE_LINK}.`,
      '',
      '### Breaking changes in that release',
      '',
      '- fix(vault)!: drop getConfigFile, which no build answers'
    ].join('\n'));
  });

  it('refuses an entry that resolves to nothing', () => {
    expect(() =>
      composeWrapperChangelogSection({
        breakingChangeSubjects: [],
        resolutionChain: [],
        tagName: TAG_NAME,
        version: '2.4.0'
      })
    ).toThrow('at least one package');
  });

  it('accumulates onto the previously published file, starting one when that version carried none', () => {
    const first = prependChangelogSection(
      createInitialChangelog(),
      composeWrapperChangelogSection({
        breakingChangeSubjects: [],
        resolutionChain: [SCOPED],
        tagName: TAG_NAME,
        version: '2.4.0'
      })
    );
    const second = prependChangelogSection(
      first,
      composeWrapperChangelogSection({
        breakingChangeSubjects: [],
        resolutionChain: [{ name: SCOPED.name, version: '1.12.0' }],
        tagName: 'obsidian-public-1.13.7-v1.12.0',
        version: '2.5.0'
      })
    );

    expect(second.indexOf('## 2.5.0')).toBeLessThan(second.indexOf('## 2.4.0'));
    expect(second.startsWith('# CHANGELOG\n\n## 2.5.0\n')).toBe(true);
    expect(second.endsWith('\n')).toBe(true);
  });
});

describe('readTarballMember', () => {
  const changelog = '# CHANGELOG\n\n## 2.4.0\n';

  it('reads the member after skipping entries of every size, a multi-block one included', () => {
    expect(readTarballMember(
      makeTarball([
        { content: '{}', name: 'package/package.json' },
        { content: 'x'.repeat(TAR_BLOCK_SIZE * 2 + 1), name: 'package/README.md' },
        { content: changelog, name: 'package/CHANGELOG.md' }
      ]),
      'package/CHANGELOG.md'
    )).toBe(changelog);
  });

  it('joins the ustar prefix to the name', () => {
    expect(readTarballMember(
      makeTarball([
        { content: changelog, name: 'CHANGELOG.md', prefix: 'package' }
      ]),
      'package/CHANGELOG.md'
    )).toBe(changelog);
  });

  it('answers null for a package that carries no changelog, which is every wrapper published before this', () => {
    expect(readTarballMember(
      makeTarball([
        { content: '{}', name: 'package/package.json' },
        { content: '', name: 'package/types.d.cts' }
      ]),
      'package/CHANGELOG.md'
    )).toBeNull();
  });
});
