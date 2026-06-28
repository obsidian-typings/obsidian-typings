/**
 * @file
 *
 * Type-checks a set of TypeScript files with `skipLibCheck` disabled, but reports only the
 * diagnostics whose source file we own. This lets the general build run with `skipLibCheck: true`
 * (so it does not fail on broken upstream `.d.ts` files we do not control, such as a given
 * version's `obsidian.d.ts`) while still fully validating the declarations we author.
 *
 * When upstream types are fixed, the `Ignored N diagnostic(s)` count drops to `0`, signalling the
 * workaround is no longer doing anything.
 */

import type {
  CompilerOptions,
  Diagnostic,
  FormatDiagnosticsHost,
  ParseConfigFileHost
} from 'typescript';

import process from 'node:process';
import {
  createProgram,
  DiagnosticCategory,
  formatDiagnostic,
  formatDiagnostics,
  formatDiagnosticsWithColorAndContext,
  getParsedCommandLineOfConfigFile,
  getPreEmitDiagnostics,
  sys
} from 'typescript';

/**
 * Parameters for {@link checkProjectTypes}.
 */
export interface CheckProjectTypesParams {
  /** Compiler options for the program. `skipLibCheck` is always forced to `false`. */
  readonly options: CompilerOptions;

  /** The root files to type-check. */
  readonly rootNames: readonly string[];

  /**
   * Decides whether a diagnostic should be reported, based on the diagnostic itself rather than its
   * source file. Runs in addition to {@link CheckProjectTypesParams.shouldKeepFile} — a diagnostic is
   * reported only when both predicates keep it. Use this to drop diagnostics that are reported in a
   * file we own but are caused by something we do not control (e.g. a cross-module-format interop
   * complaint about a third-party import). When omitted, no diagnostic is dropped on this basis.
   *
   * @param diagnostic - The diagnostic to evaluate.
   * @returns `true` to report the diagnostic, `false` to ignore it.
   */
  shouldKeepDiagnostic?(this: void, diagnostic: Diagnostic): boolean;

  /**
   * Decides whether a diagnostic's source file is one we care about.
   *
   * @param fileName - The diagnostic's source file, already passed through {@link toCanonical}.
   * @returns `true` to report the diagnostic, `false` to ignore it.
   */
  shouldKeepFile(this: void, fileName: string): boolean;
}

/**
 * The resolved result of {@link parseTsConfig}.
 */
export interface ParsedTsConfig {
  /** The resolved list of files the config includes (absolute paths). */
  readonly fileNames: readonly string[];

  /** The resolved compiler options (with `extends` applied). */
  readonly options: CompilerOptions;
}

const FORMAT_HOST: FormatDiagnosticsHost = {
  getCanonicalFileName: (fileName) => fileName,
  getCurrentDirectory: () => sys.getCurrentDirectory(),
  getNewLine: () => sys.newLine
};

/**
 * Type-checks a set of files with `skipLibCheck: false`, but reports only the diagnostics whose
 * source file passes `shouldKeepFile`. Diagnostics from files we do not control (e.g. broken
 * third-party `.d.ts` pulled in transitively) are dropped, while still being counted for
 * visibility.
 *
 * @param params - The program inputs and the keep predicate.
 * @returns `true` when no reported diagnostic is an error, `false` otherwise.
 */
export function checkProjectTypes(params: CheckProjectTypesParams): boolean {
  const options: CompilerOptions = {
    ...params.options,
    skipLibCheck: false
  };

  const program = createProgram({
    options,
    rootNames: [...params.rootNames]
  });

  const allDiagnostics = getPreEmitDiagnostics(program);
  const keptDiagnostics = allDiagnostics.filter((diagnostic) => shouldKeepDiagnosticByFile(diagnostic, params.shouldKeepFile) && (params.shouldKeepDiagnostic?.(diagnostic) ?? true));
  const ignoredCount = allDiagnostics.length - keptDiagnostics.length;

  if (keptDiagnostics.length > 0) {
    process.stdout.write(formatDiagnosticsWithColorAndContext(keptDiagnostics, FORMAT_HOST));
  }

  process.stdout.write(`Ignored ${String(ignoredCount)} diagnostic(s) outside the validated set.\n`);

  return !keptDiagnostics.some((diagnostic) => diagnostic.category === DiagnosticCategory.Error);
}

/**
 * Parses a `tsconfig.json` (resolving `extends`, `include`, `exclude`) into the resolved file list
 * and compiler options.
 *
 * @param tsConfigPath - Absolute path to the config file.
 * @returns The resolved file names and options.
 * @throws If the config cannot be parsed or contains errors.
 */
export function parseTsConfig(tsConfigPath: string): ParsedTsConfig {
  const host: ParseConfigFileHost = {
    fileExists: (path) => sys.fileExists(path),
    getCurrentDirectory: () => sys.getCurrentDirectory(),
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      throw new Error(formatDiagnostic(diagnostic, FORMAT_HOST));
    },
    readDirectory: (rootDir, extensions, excludes, includes, depth) => sys.readDirectory(rootDir, extensions, excludes, includes, depth),
    readFile: (path) => sys.readFile(path),
    useCaseSensitiveFileNames: sys.useCaseSensitiveFileNames
  };

  const parsed = getParsedCommandLineOfConfigFile(tsConfigPath, undefined, host);

  if (!parsed) {
    throw new Error(`Failed to parse TypeScript config: ${tsConfigPath}`);
  }

  if (parsed.errors.length > 0) {
    throw new Error(`Errors while parsing TypeScript config ${tsConfigPath}:\n${formatDiagnostics(parsed.errors, FORMAT_HOST)}`);
  }

  return {
    fileNames: parsed.fileNames,
    options: parsed.options
  };
}

/**
 * Normalizes a file path for comparison: forward slashes everywhere, lower-cased on a
 * case-insensitive file system.
 *
 * @param fileName - The path to normalize.
 * @returns The canonical path.
 */
export function toCanonical(fileName: string): string {
  const normalized = fileName.replaceAll('\\', '/');
  return sys.useCaseSensitiveFileNames ? normalized : normalized.toLowerCase();
}

function shouldKeepDiagnosticByFile(diagnostic: Diagnostic, shouldKeepFile: (fileName: string) => boolean): boolean {
  if (!diagnostic.file) {
    return true;
  }

  return shouldKeepFile(toCanonical(diagnostic.file.fileName));
}
