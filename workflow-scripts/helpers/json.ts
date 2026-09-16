/**
 * @file
 *
 * Reads and edits the JSON files the release scripts rewrite.
 *
 * Unlike `helpers/exec.ts` and `helpers/root.ts` beside it, this file is NOT copied into the other trees:
 * `scripts/` has never needed it, and `docs/scripts/` carried a copy in which every one of these helpers was
 * dead. It lives here because `create-new-release-branch.ts` and `publish-release.ts` are the only callers.
 */

import type {
  PackageJson,
  Promisable,
  UndefinedOnPartialDeep
} from 'type-fest';

import { existsSync } from 'node:fs';
import {
  readFile,
  writeFile
} from 'node:fs/promises';
import { resolve as posixResolve } from 'node:path/posix';

import {
  getRootFolder,
  toPosixPath
} from './root.ts';

export interface EditPackageJsonOptions {
  /**
   * A current working folder where `package.json` is located.
   */
  readonly cwd?: string;

  /**
   * If `true`, skips editing if the file does not exist.
   */
  readonly shouldSkipIfMissing?: boolean;
}

export interface PackageLockJson extends Partial<PackageJson> {
  /**
   * Packages in the `package-lock.json` file.
   */
  packages?: Record<string, PackageJson>;
}

/**
 * Options for {@link editJson}.
 */
interface EditJsonOptions {
  /**
   * If `true`, skips editing if the file does not exist.
   */
  readonly shouldSkipIfMissing?: boolean;
}

export async function editPackageJson(
  editFunction: (packageJson: PackageJson) => Promisable<void>,
  options: EditPackageJsonOptions = {}
): Promise<void> {
  const {
    cwd,
    shouldSkipIfMissing
  } = options;
  await editJson<PackageJson>(getPackageJsonPath(cwd), editFunction, normalizeOptionalProperties<EditJsonOptions>({ shouldSkipIfMissing }));
}

export async function editPackageLockJson(
  editFunction: (packageLockJson: PackageLockJson) => Promisable<void>,
  options: EditPackageJsonOptions = {}
): Promise<void> {
  const {
    cwd,
    shouldSkipIfMissing
  } = options;
  await editJson<PackageJson>(getPackageLockJsonPath(cwd), editFunction, normalizeOptionalProperties<EditJsonOptions>({ shouldSkipIfMissing }));
}

export async function readPackageJson(cwd?: string): Promise<PackageJson> {
  return await readJson<PackageJson>(getPackageJsonPath(cwd));
}

export function toJson(data: unknown): string {
  const INDENT = 2;
  return JSON.stringify(data, null, INDENT);
}

export async function writeJson(path: string, data: unknown): Promise<void> {
  await writeFile(path, `${toJson(data)}\n`);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- The generic type is better for the strong typing.
async function editJson<T>(
  path: string,
  editFunction: (data: T) => Promisable<void>,
  options: EditJsonOptions = {}
): Promise<void> {
  const {
    shouldSkipIfMissing
  } = options;
  if (shouldSkipIfMissing && !existsSync(path)) {
    return;
  }
  const data = await readJson<T>(path);
  await editFunction(data);
  await writeJson(path, data);
}

function ensureNonNullable<T>(value: null | T | undefined, errorMessage: string): T {
  if (value === null || value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}

function getPackageJsonPath(cwd?: string): string {
  return ensureNonNullable(resolvePathFromRoot('package.json', cwd), 'Could not determine the package.json path');
}

function getPackageLockJsonPath(cwd?: string): string {
  return ensureNonNullable(resolvePathFromRoot('package-lock.json', cwd), 'Could not determine the package-lock.json path');
}

function normalizeOptionalProperties<T>(object: UndefinedOnPartialDeep<T>): T {
  return object as T;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf-8')) as T;
}

function resolvePathFromRoot(path: string, cwd?: string): null | string {
  const rootFolder = getRootFolder(cwd);
  if (!rootFolder) {
    return null;
  }

  return resolveSafe(rootFolder, path);
}

function resolveSafe(...pathSegments: string[]): string {
  let path = posixResolve(...pathSegments);
  path = toPosixPath(path);
  const WINDOWS_POSIX_LIKE_PATH_REG_EXP = /[a-zA-Z]:\/[^:]*$/;
  const match = WINDOWS_POSIX_LIKE_PATH_REG_EXP.exec(path);
  return match?.[0] ?? path;
}
