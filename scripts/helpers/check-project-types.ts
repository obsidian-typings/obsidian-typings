import process from 'node:process';
import ts from 'typescript';

export interface CheckProjectTypesParams {
  /** Compiler options for the program. `skipLibCheck` is always forced to `false`. */
  readonly options: ts.CompilerOptions;

  /** The root files to type-check. */
  readonly rootNames: readonly string[];

  /**
   * Decides whether a diagnostic's source file is one we care about.
   *
   * @param fileName - The diagnostic's source file, already passed through `toCanonical`.
   * @returns `true` to report the diagnostic, `false` to ignore it.
   */
  shouldKeepFile(fileName: string): boolean;
}

export interface ParsedTsConfig {
  /** The resolved list of files the config includes (absolute paths). */
  readonly fileNames: readonly string[];

  /** The resolved compiler options (with `extends` applied). */
  readonly options: ts.CompilerOptions;
}

const FORMAT_HOST: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (fileName) => fileName,
  getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
  getNewLine: () => ts.sys.newLine
};

/**
 * Type-checks a set of files with `skipLibCheck: false`, but reports only the diagnostics whose
 * source file passes `shouldKeepFile`. Diagnostics from files we do not control (e.g. broken
 * third-party `.d.ts` pulled in transitively) are dropped, while still being collected so they
 * can be counted for visibility.
 *
 * @param params - The program inputs and the keep predicate.
 * @returns `true` when no reported diagnostic is an error, `false` otherwise.
 */
export function checkProjectTypes(params: CheckProjectTypesParams): boolean {
  const options: ts.CompilerOptions = {
    ...params.options,
    skipLibCheck: false
  };

  const program = ts.createProgram({
    options,
    rootNames: [...params.rootNames]
  });

  const allDiagnostics = ts.getPreEmitDiagnostics(program);
  const keptDiagnostics = allDiagnostics.filter((diagnostic) => shouldKeepDiagnostic(diagnostic, params.shouldKeepFile));
  const ignoredCount = allDiagnostics.length - keptDiagnostics.length;

  if (keptDiagnostics.length > 0) {
    process.stdout.write(ts.formatDiagnosticsWithColorAndContext(keptDiagnostics, FORMAT_HOST));
  }

  console.log(`Ignored ${String(ignoredCount)} diagnostic(s) outside the validated set.`);

  return !keptDiagnostics.some((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
}

/**
 * Parses a `tsconfig.json` (resolving `extends`, `include`, `exclude`) into the resolved file list
 * and compiler options.
 *
 * @param tsConfigPath - Absolute path to the config file.
 * @param overrideOptions - Compiler options that override the parsed ones.
 * @returns The resolved file names and options.
 */
export function parseTsConfig(tsConfigPath: string, overrideOptions?: ts.CompilerOptions): ParsedTsConfig {
  const host: ts.ParseConfigFileHost = {
    fileExists: (path) => ts.sys.fileExists(path),
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      throw new Error(ts.formatDiagnostic(diagnostic, FORMAT_HOST));
    },
    readDirectory: (rootDir, extensions, excludes, includes, depth) => ts.sys.readDirectory(rootDir, extensions, excludes, includes, depth),
    readFile: (path) => ts.sys.readFile(path),
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames
  };

  const parsed = ts.getParsedCommandLineOfConfigFile(tsConfigPath, overrideOptions, host);

  if (!parsed) {
    throw new Error(`Failed to parse TypeScript config: ${tsConfigPath}`);
  }

  if (parsed.errors.length > 0) {
    throw new Error(`Errors while parsing TypeScript config ${tsConfigPath}:\n${ts.formatDiagnostics(parsed.errors, FORMAT_HOST)}`);
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
  return ts.sys.useCaseSensitiveFileNames ? normalized : normalized.toLowerCase();
}

function shouldKeepDiagnostic(diagnostic: ts.Diagnostic, shouldKeepFile: (fileName: string) => boolean): boolean {
  if (!diagnostic.file) {
    return true;
  }

  return shouldKeepFile(toCanonical(diagnostic.file.fileName));
}
