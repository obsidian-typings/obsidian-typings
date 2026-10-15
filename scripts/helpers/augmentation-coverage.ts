/**
 * @file
 *
 * Every public export of the `obsidian` package gets one augmentation file under `src/obsidian/augmentations/`,
 * named after the export. Nothing used to check that: a reconcile against a new `obsidian` version added the members
 * the new version introduced to the files that already existed, and a brand-new export (`FrontmatterValue`, new in
 * 1.14.4) silently got no file at all. These helpers list the package's exports and report the ones with no file.
 */

import type { Statement } from 'typescript';

import {
  canHaveModifiers,
  createSourceFile,
  getModifiers,
  isClassDeclaration,
  isEnumDeclaration,
  isExportDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isInterfaceDeclaration,
  isModuleDeclaration,
  isNamedExports,
  isTypeAliasDeclaration,
  isVariableStatement,
  ScriptTarget,
  SyntaxKind
} from 'typescript';

const DECLARATION_FILE_EXTENSION = '.d.ts';

interface GetMissingAugmentationsParams {
  readonly augmentationFilePaths: readonly string[];
  readonly exportNames: readonly string[];
}

/**
 * Returns the export names that no augmentation file is named after, sorted.
 *
 * @param params - The export names and the augmentation file paths, in any subdirectory.
 * @returns The export names with no matching augmentation file.
 */
export function getMissingAugmentations(params: GetMissingAugmentationsParams): string[] {
  const augmentationNames = new Set(params.augmentationFilePaths.map(getDeclarationFileBaseName));
  return [...new Set(params.exportNames)].filter((name) => !augmentationNames.has(name)).sort();
}

/**
 * Lists the names a declaration file exports at its top level.
 *
 * @param sourceText - The declaration file's text.
 * @returns The exported names, in declaration order, each once.
 */
export function getModuleExportNames(sourceText: string): string[] {
  const sourceFile = createSourceFile('module.d.ts', sourceText, ScriptTarget.Latest);
  const names = new Set<string>();

  for (const statement of sourceFile.statements) {
    for (const name of getStatementExportNames(statement)) {
      names.add(name);
    }
  }

  return [...names];
}

function getDeclarationFileBaseName(filePath: string): string {
  const baseName = filePath.split(/[\\/]/).at(-1) ?? filePath;
  return baseName.endsWith(DECLARATION_FILE_EXTENSION) ? baseName.slice(0, -DECLARATION_FILE_EXTENSION.length) : baseName;
}

function getStatementExportNames(statement: Statement): string[] {
  if (isExportDeclaration(statement)) {
    if (statement.moduleSpecifier || !statement.exportClause || !isNamedExports(statement.exportClause)) {
      return [];
    }
    return statement.exportClause.elements.map((element) => element.name.text);
  }

  if (!hasExportModifier(statement)) {
    return [];
  }

  if (isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap((declaration) => isIdentifier(declaration.name) ? [declaration.name.text] : []);
  }

  if (
    isClassDeclaration(statement)
    || isEnumDeclaration(statement)
    || isFunctionDeclaration(statement)
    || isInterfaceDeclaration(statement)
    || isModuleDeclaration(statement)
    || isTypeAliasDeclaration(statement)
  ) {
    return statement.name && isIdentifier(statement.name) ? [statement.name.text] : [];
  }

  return [];
}

function hasExportModifier(statement: Statement): boolean {
  if (!canHaveModifiers(statement)) {
    return false;
  }
  return getModifiers(statement)?.some((modifier) => modifier.kind === SyntaxKind.ExportKeyword) ?? false;
}
