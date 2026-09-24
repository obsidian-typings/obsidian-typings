/**
 * @file
 *
 * Builds the changelog the three wrapper packages publish: both `-latest` wrappers and the legacy
 * `obsidian-typings`.
 *
 * Until 2026-09-23 they shipped none at all -- the wrapper is built in a temp folder from an object literal,
 * and `README.md` was the only document copied into it. Those are the packages most consumers install, and a
 * caret consumer of one takes a breaking correction with no version signal, so a wrapper with no changelog was
 * the one place that correction could not be read about.
 *
 * ## What a wrapper's entry says
 *
 * A wrapper carries its own version, which moves independently of the versioned package's, and has no content
 * of its own: its only change, ever, is which package it resolves to. So one entry per wrapper version names
 * that package and links the release notes that describe it, rather than pasting the versioned package's
 * section in under a heading that would carry the wrong number. The one part of that section repeated here is
 * its breaking-change subjects, because those are exactly what a `-latest` consumer takes without a version
 * signal, and a link is not a thing anybody follows before an install.
 *
 * ## Where the previous entries come from
 *
 * The wrapper has no file in git to accumulate into, so its previous `CHANGELOG.md` is read back out of its
 * last published tarball. A tarball without one -- every wrapper version published before this existed --
 * starts a fresh file, which is the same answer `readChangelog` gives a branch that never had one.
 */

import { gunzipSync } from 'node:zlib';

import {
  CHANGELOG_FILE_NAME,
  createInitialChangelog
} from './changelog.ts';
import { execFromRoot } from './root.ts';

/**
 * The GitHub release page every release of this repository publishes its notes on.
 */
const RELEASES_URL = 'https://github.com/obsidian-typings/obsidian-typings/releases/tag';

/* The tar header fields {@link readTarballMember} reads, as POSIX ustar lays them out. */
const TAR_BLOCK_SIZE = 512;
const TAR_NAME_OFFSET = 0;
const TAR_NAME_LENGTH = 100;
const TAR_SIZE_OFFSET = 124;
const TAR_SIZE_LENGTH = 12;
const TAR_PREFIX_OFFSET = 345;
const TAR_PREFIX_LENGTH = 155;
const OCTAL_RADIX = 8;

/**
 * What {@link composeWrapperChangelogSection} needs to write one wrapper version's section.
 */
export interface WrapperChangelogSectionOptions {
  /**
   * The breaking-change subjects of the versioned release this wrapper version resolves to.
   */
  readonly breakingChangeSubjects: readonly string[];

  /**
   * The chain of packages this wrapper version resolves to, nearest first. The legacy package's chain is two
   * long, through the public `-latest` wrapper; a `-latest` wrapper's is one.
   */
  readonly resolutionChain: readonly WrapperDependency[];

  /**
   * The tag of the versioned release, which names its GitHub release page.
   */
  readonly tagName: string;

  /**
   * The wrapper's own version, which heads the section.
   */
  readonly version: string;
}

/**
 * One package a wrapper resolves to, directly or through another wrapper.
 */
export interface WrapperDependency {
  /**
   * The package name.
   */
  readonly name: string;

  /**
   * The version the dependency range floors at, without the caret.
   */
  readonly version: string;
}

/**
 * Writes one wrapper version's section of its `CHANGELOG.md`.
 *
 * @param options - See {@link WrapperChangelogSectionOptions}.
 * @returns The section, with no trailing newline.
 */
export function composeWrapperChangelogSection(options: WrapperChangelogSectionOptions): string {
  const {
    breakingChangeSubjects,
    resolutionChain,
    tagName,
    version
  } = options;

  if (resolutionChain.length === 0) {
    throw new Error('A wrapper changelog entry needs at least one package to resolve to.');
  }

  const chain = resolutionChain.map((dependency) => `\`${dependency.name}\` \`^${dependency.version}\``).join(', which resolves to ');
  const lines = [
    `## ${version}`,
    '',
    `- Now resolves to ${chain}. See [its release notes](${RELEASES_URL}/${tagName}).`
  ];

  if (breakingChangeSubjects.length > 0) {
    lines.push('', '### Breaking changes in that release', '', ...breakingChangeSubjects.map((subject) => `- ${subject}`));
  }

  return lines.join('\n');
}

/**
 * Reads the `CHANGELOG.md` a published package version carries, or the initial one when it carries none.
 *
 * The tarball's URL comes from `npm view`, and the tarball itself is fetched and read in memory by
 * {@link readTarballMember}: no temp folder, and no `tar` binary, whose flags and path handling differ between
 * the runner and a Windows checkout. A missing member is the expected answer for every wrapper version
 * published before 2026-09-23, so it is not an error; a failed download is, because answering it with an empty
 * file would publish a changelog that silently dropped the wrapper's whole history.
 *
 * @param packageName - The package to read from.
 * @param version - The published version to read.
 * @returns The contents.
 */
export async function readPublishedChangelog(packageName: string, version: string): Promise<string> {
  const tarballUrl = (await execFromRoot(['npm', 'view', `${packageName}@${version}`, 'dist.tarball'], { isQuiet: true })).trim();

  if (!tarballUrl) {
    throw new Error(`npm reported no tarball for ${packageName}@${version}.`);
  }

  const response = await fetch(tarballUrl);

  if (!response.ok) {
    throw new Error(`Downloading ${tarballUrl} failed: ${String(response.status)} ${response.statusText}.`);
  }

  const changelog = readTarballMember(new Uint8Array(await response.arrayBuffer()), `package/${CHANGELOG_FILE_NAME}`);

  if (changelog === null) {
    console.warn(`${packageName}@${version} carries no ${CHANGELOG_FILE_NAME}; starting a new one.`);
    return createInitialChangelog();
  }

  return changelog;
}

/**
 * Reads one text member out of a gzipped tarball, or `null` when it holds no such member.
 *
 * Only as much of the tar format as an npm tarball uses: 512-byte headers carrying a NUL-terminated name, an
 * octal size and the `ustar` prefix field, each followed by its data padded to a whole block. Every other
 * entry -- pax extended headers included -- is skipped by its size, which is all this needs, since the one
 * member wanted has a short name that never takes a pax override.
 *
 * @param gzippedTarball - The `.tgz` bytes, as the registry serves them.
 * @param memberPath - The member's full path inside the archive, e.g. `package/CHANGELOG.md`.
 * @returns The member's contents, decoded as UTF-8, or `null`.
 */
export function readTarballMember(gzippedTarball: Uint8Array, memberPath: string): null | string {
  const tarball = gunzipSync(gzippedTarball);
  const decoder = new TextDecoder();
  let offset = 0;

  while (offset + TAR_BLOCK_SIZE <= tarball.length) {
    const header = tarball.subarray(offset, offset + TAR_BLOCK_SIZE);

    if (header.every((byte) => byte === 0)) {
      return null;
    }

    function readField(start: number, length: number): string {
      return decoder.decode(header.subarray(start, start + length)).replace(/\0.*$/s, '');
    }

    const name = readField(TAR_NAME_OFFSET, TAR_NAME_LENGTH);
    const prefix = readField(TAR_PREFIX_OFFSET, TAR_PREFIX_LENGTH);
    const size = Number.parseInt(readField(TAR_SIZE_OFFSET, TAR_SIZE_LENGTH).trim() || '0', OCTAL_RADIX);
    const dataStart = offset + TAR_BLOCK_SIZE;

    if ((prefix ? `${prefix}/${name}` : name) === memberPath) {
      return decoder.decode(tarball.subarray(dataStart, dataStart + size));
    }

    offset = dataStart + Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
  }

  return null;
}
