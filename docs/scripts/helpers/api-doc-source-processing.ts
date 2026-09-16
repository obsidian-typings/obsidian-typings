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
  for (const function_ of src.getFunctions()) {
    const name = function_.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(function_);
    const params = function_.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramString = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(function_.getReturnType().getText());
    const signature = `${name}(${paramString})`;
    // Store function as a type with a single method representing the function call
    types.set(name, {
      baseTypes: [],
      description: getDescription(function_),
      examples: getExamples(function_),
      implementsTypes: [],
      isOfficial: checkIsOfficial(function_, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(function_),
        examples: getExamples(function_),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(function_, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(function_),
        returnDescription: getReturnDescription(function_),
        returnType,
        signature,
        since: getSince(function_),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(function_),
      typeParameters: function_.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/**
Collect functions declared inside module declarations
*/
export function collectModuleFunctions(
  module_: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const function_ of module_.getFunctions()) {
    const name = function_.getName();
    if (!name || types.has(name)) {
      continue;
    }
    const paramDescriptions = getParamDescriptions(function_);
    const params = function_.getParameters().map((p) => ({
      description: paramDescriptions.get(p.getName()) ?? '',
      name: p.getName(),
      type: simplifyType(p.getType().getText())
    }));
    const paramString = params.map((p) => `${p.name}: ${p.type}`).join(', ');
    const returnType = simplifyType(function_.getReturnType().getText());
    const signature = `${name}(${paramString})`;
    types.set(name, {
      baseTypes: [],
      description: getDescription(function_),
      examples: getExamples(function_),
      implementsTypes: [],
      isOfficial: checkIsOfficial(function_, isOfficial),
      kind: 'function',
      methods: [{
        description: getDescription(function_),
        examples: getExamples(function_),
        inheritedFrom: '',
        isOfficial: checkIsOfficial(function_, isOfficial),
        isStatic: false,
        name,
        overloadKey: name,
        parameters: params,
        remarks: getRemarks(function_),
        returnDescription: getReturnDescription(function_),
        returnType,
        signature,
        since: getSince(function_),
        type: ''
      }],
      name,
      namespace,
      properties: [],
      remarks: getRemarks(function_),
      typeParameters: function_.getTypeParameters().map((tp) => tp.getText())
    });
  }
}

/**
Collect variable declarations (e.g., const Platform__, let apiVersion__)
*/
export function collectModuleVariables(
  module_: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const variableStatement of module_.getVariableStatements()) {
    const declarationKind = variableStatement.getDeclarationKind();
    for (const declaration of variableStatement.getDeclarations()) {
      const rawName = declaration.getName();
      const name = rawName.replace(/__$/, '');
      if (!name || types.has(name)) {
        continue;
      }
      const variableType = simplifyType(declaration.getType().getText());
      types.set(name, {
        baseTypes: [],
        description: getDescription(variableStatement),
        examples: getExamples(variableStatement),
        implementsTypes: [],
        isOfficial: checkIsOfficial(variableStatement, isOfficial),
        kind: 'variable',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(variableStatement),
        typeParameters: [],
        variableKeyword: declarationKind,
        variableType
      });
    }
  }
}

/**
Collect static functions from namespace declarations (e.g., namespace App { function getOverrideConfigDir(...) })
*/
export function collectNamespaceStaticFunctions(
  module_: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean
): void {
  for (const nestedNs of module_.getModules()) {
    const nsName = nestedNs.getName();
    const parentType = types.get(nsName);
    if (!parentType) {
      continue;
    }
    for (const function_ of nestedNs.getFunctions()) {
      const functionName = function_.getName();
      if (!functionName) {
        continue;
      }
      const paramDescriptions = getParamDescriptions(function_);
      const params = function_.getParameters().map((p) => ({
        description: paramDescriptions.get(p.getName()) ?? '',
        name: p.getName(),
        type: simplifyType(p.getType().getText())
      }));
      const paramString = params.map((p) => `${p.name}: ${p.type}`).join(', ');
      const returnType = simplifyType(function_.getReturnType().getText());
      const signature = `${functionName}(${paramString})`;
      const hasExisting = parentType.methods.some((m) => m.name === functionName);
      if (!hasExisting) {
        parentType.methods.push({
          description: getDescription(function_),
          examples: getExamples(function_),
          inheritedFrom: '',
          isOfficial: checkIsOfficial(function_, isOfficial),
          isStatic: true,
          name: functionName,
          overloadKey: functionName,
          parameters: params,
          remarks: getRemarks(function_),
          returnDescription: getReturnDescription(function_),
          returnType,
          signature: `static ${signature}`,
          since: getSince(function_),
          type: ''
        });
      }
    }
  }
}

/**
Compute a hash of all source files + the generator script itself
*/
export function computeCacheHash(srcDirectory: string): string {
  const hash = createHash('sha256');

  // Hash the generator script itself
  const generatorPath = resolve(import.meta.dirname, '..', 'generate-api-docs.ts');
  hash.update(readFileSync(generatorPath, 'utf-8'));

  // Hash all helper modules
  const rootDirectory = resolve(import.meta.dirname, '..', '..', '..');
  const helperFiles = globSync('docs/scripts/helpers/api-doc-*.ts', { cwd: rootDirectory }).sort();
  for (const helperFile of helperFiles) {
    const fullPath = resolve(rootDirectory, helperFile);
    hash.update(fullPath);
    hash.update(readFileSync(fullPath, 'utf-8'));
  }

  // Hash all source .d.ts files
  const dtsFiles = findDtsFiles(srcDirectory).sort();
  for (const filePath of dtsFiles) {
    hash.update(filePath);
    hash.update(readFileSync(filePath, 'utf-8'));
  }

  return hash.digest('hex');
}

/**
Recursively find all .d.ts and .ts source files under a directory
*/
export function findDtsFiles(directory: string): string[] {
  const results: string[] = [];
  const tsFiles: string[] = [];
  const dtsNames = new Set<string>();

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
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
  module_: ReturnType<SourceFile['getModules']>[number],
  types: Map<string, TypeInfo>,
  isOfficial: boolean,
  namespace: string
): void {
  for (const alias of module_.getTypeAliases()) {
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

  for (const iface of module_.getInterfaces()) {
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
  for (const cls of module_.getClasses()) {
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

  collectModuleFunctions(module_, types, isOfficial, namespace);
  collectNamespaceStaticFunctions(module_, types, isOfficial);
  collectModuleVariables(module_, types, isOfficial, namespace);
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
  for (const enumDeclaration of src.getEnums()) {
    const name = enumDeclaration.getName();
    if (!types.has(name)) {
      types.set(name, {
        baseTypes: [],
        description: getDescription(enumDeclaration),
        examples: getExamples(enumDeclaration),
        implementsTypes: [],
        isOfficial,
        kind: 'interface',
        methods: [],
        name,
        namespace,
        properties: [],
        remarks: getRemarks(enumDeclaration),
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
