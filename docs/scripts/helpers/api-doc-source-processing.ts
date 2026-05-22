import type { SourceFile } from 'ts-morph';

import { createHash } from 'node:crypto';
import {
  globSync,
  readdirSync,
  readFileSync
} from 'node:fs';
import {
  basename,
  join,
  resolve
} from 'node:path';

import type { TypeInfo } from './api-doc-types.ts';

import { GENERIC_TYPE_PARAMS } from './api-doc-constants.ts';
import {
  checkIsOfficial,
  extractClassInfo,
  extractInterfaceInfo,
  getDescription,
  getExamples,
  getParamDescriptions,
  getRemarks,
  getReturnDescription,
  getSince
} from './api-doc-jsdoc.ts';
import { simplifyType } from './api-doc-text-utils.ts';
import {
  mergeClassIntoType,
  mergeInterfaceIntoType,
  updateNamespaceIfMoreSpecific
} from './api-doc-type-merging.ts';

export function collectFunctions(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  for (const fn of src.getFunctions()) {
    const name = fn.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(fn);
    const params = fn.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(fn.getReturnType().getText());
    const signature = `${name}(${paramStr})`;
    // Store function as a type with a single method representing the function call
    types.set(name, {
      baseTypes: [],
      description: getDescription(fn),
      examples: getExamples(fn),
      implementsTypes: [],
      isOfficial: checkIsOfficial(fn, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(fn),
        examples: getExamples(fn),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(fn, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(fn),
        returnDescription: getReturnDescription(fn),
        returnType,
        signature,
        since: getSince(fn),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(fn),
      typeParameters: fn.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/** Collect functions declared inside module declarations */
export function collectModuleFunctions(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const fn of mod.getFunctions()) {
    const name = fn.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(fn);
    const params = fn.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(fn.getReturnType().getText());
    const signature = `${name}(${paramStr})`;
    types.set(name, {
      baseTypes: [],
      description: getDescription(fn),
      examples: getExamples(fn),
      implementsTypes: [],
      isOfficial: checkIsOfficial(fn, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(fn),
        examples: getExamples(fn),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(fn, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(fn),
        returnDescription: getReturnDescription(fn),
        returnType,
        signature,
        since: getSince(fn),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(fn),
      typeParameters: fn.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/** Collect variable declarations (e.g., const Platform__, let apiVersion__) */
export function collectModuleVariables(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const varStmt of mod.getVariableStatements()) {
    const declKind = varStmt.getDeclarationKind();
    for (const decl of varStmt.getDeclarations()) {
      const rawName = decl.getName();
      const name = rawName.replace(/__$/, '');
      if (!name || types.has(name)) {
        continue;
      }
      const varType = simplifyType(decl.getType().getText());
      types.set(name, {
        baseTypes: [],
        description: getDescription(varStmt),
        examples: getExamples(varStmt),
        implementsTypes: [],
        isOfficial: checkIsOfficial(varStmt, isOfficial),
        kind: 'variable',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(varStmt),
        typeParameters: [],
        variableKeyword: declKind,
        variableType: varType
      });
    }
  }
}

/** Collect static functions from namespace declarations (e.g., namespace App { function getOverrideConfigDir(...) }) */
export function collectNamespaceStaticFunctions(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean
): void {
  for (const nestedNs of mod.getModules()) {
    const nsName = nestedNs.getName();
    const parentType = types.get(nsName);
    if (!parentType) {
      continue;
    }
    for (const fn of nestedNs.getFunctions()) {
      const fnName = fn.getName();
      if (!fnName) {
        continue;
      }
      const paramDescriptions = getParamDescriptions(fn);
      const params = fn.getParameters().map((p) => ({
        description: paramDescriptions.get(p.getName()) ?? '',
        name: p.getName(),
        type: simplifyType(p.getType().getText())
      }));
      const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
      const returnType = simplifyType(fn.getReturnType().getText());
      const signature = `${fnName}(${paramStr})`;
      const existing = parentType.methods.find((m) => m.name === fnName);
      if (!existing) {
        parentType.methods.push({
          description: getDescription(fn),
          examples: getExamples(fn),
          inheritedFrom: '',
          isOfficial: checkIsOfficial(fn, isOfficial),
          isStatic: true,
          name: fnName,
          overloadKey: fnName,
          parameters: params,
          remarks: getRemarks(fn),
          returnDescription: getReturnDescription(fn),
          returnType,
          signature: `static ${signature}`,
          since: getSince(fn),
          type: ''
        });
      }
    }
  }
}

/** Compute a hash of all source files + the generator script itself */
export function computeCacheHash(srcDir: string): string {
  const hash = createHash('sha256');

  // Hash the generator script itself
  const generatorPath = resolve(import.meta.dirname, '..', 'generate-api-docs.ts');
  hash.update(readFileSync(generatorPath, 'utf-8'));

  // Hash all helper modules
  const rootDir = resolve(import.meta.dirname, '..', '..', '..');
  const helperFiles = globSync('docs/scripts/helpers/api-doc-*.ts', { cwd: rootDir }).sort();
  for (const helperFile of helperFiles) {
    const fullPath = resolve(rootDir, helperFile);
    hash.update(fullPath);
    hash.update(readFileSync(fullPath, 'utf-8'));
  }

  // Hash all source .d.ts files
  const dtsFiles = findDtsFiles(srcDir).sort();
  for (const filePath of dtsFiles) {
    hash.update(filePath);
    hash.update(readFileSync(filePath, 'utf-8'));
  }

  return hash.digest('hex');
}

/** Recursively find all .d.ts and .ts source files under a directory */
export function findDtsFiles(dir: string): string[] {
  const results: string[] = [];
  const tsFiles: string[] = [];
  const dtsNames = new Set<string>();

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findDtsFiles(fullPath));
    } else if (entry.name.endsWith('.d.ts') && entry.name !== 'index.d.ts') {
      results.push(fullPath);
      dtsNames.add(entry.name.replace(/\.d\.ts$/, ''));
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') && entry.name !== 'index.ts') {
      tsFiles.push(fullPath);
    }
  }

  // Include .ts files only when no corresponding .d.ts exists (e.g., implementation files)
  for (const tsFile of tsFiles) {
    const baseName = basename(tsFile, '.ts');
    if (!dtsNames.has(baseName)) {
      results.push(tsFile);
    }
  }

  return results;
}

export function processModuleDeclaration(
  mod: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const alias of mod.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        examples: getExamples(alias),
        implementsTypes: [],
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(alias),
        typeParameters: alias.getTypeParameters().map((tp) => tp.getText())
      });
    }
  }

  for (const iface of mod.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractInterfaceInfo(iface, isOfficial, namespace));
    }
  }
  for (const cls of mod.getClasses()) {
    const name = cls.getName();
    if (!name) {
      continue;
    }
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeClassIntoType(existing, cls, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
    }
  }

  collectModuleFunctions(mod, types, isOfficial, namespace);
  collectNamespaceStaticFunctions(mod, types, isOfficial);
  collectModuleVariables(mod, types, isOfficial, namespace);
}

export function processSourceFile(src: SourceFile, types: Map<string, TypeInfo>, isOfficial: boolean, namespace: string): void {
  // Collect type aliases and enums for link resolution (they don't generate pages but need to be linkable)
  for (const alias of src.getTypeAliases()) {
    const name = alias.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(alias),
        examples: getExamples(alias),
        implementsTypes: [],
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(alias),
        typeParameters: alias.getTypeParameters().map((tp) => tp.getText())
      });
    }
  }
  for (const enumDecl of src.getEnums()) {
    const name = enumDecl.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(enumDecl),
        examples: getExamples(enumDecl),
        implementsTypes: [],
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(enumDecl),
        typeParameters: []
      });
    }
  }

  for (const iface of src.getInterfaces()) {
    const name = iface.getName();
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeInterfaceIntoType(existing, iface, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractInterfaceInfo(iface, isOfficial, namespace));
    }
  }

  for (const cls of src.getClasses()) {
    const name = cls.getName();
    if (!name) {
      continue;
    }
    if (types.has(name)) {
      const existing = types.get(name);
      if (existing) {
        mergeClassIntoType(existing, cls, isOfficial);
        updateNamespaceIfMoreSpecific(existing, namespace, isOfficial);
      }
    } else {
      types.set(name, extractClassInfo(cls, isOfficial, namespace));
    }
  }
}

/**
 * Register all type parameter names so renderTypeWithLinks won't hyperlink them.
 * Skip names that are also known types — those should still be linkable.
 */
export function registerGenericTypeParams(types: Map<string, TypeInfo>): void {
  for (const [_name, info] of types) {
    for (const tp of info.typeParameters) {
      // Strip constraints: "T extends Foo" → "T"
      const bareParam = tp.replace(/\s+extends\s+.*$/, '');
      if (!types.has(bareParam)) {
        GENERIC_TYPE_PARAMS.add(bareParam);
      }
    }
  }
}
