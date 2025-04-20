/**
 * This script is very bad, verging on being completely broken.
 * Current problems:
 *   - Only keeps interfaces, types and classes inside modules
 *   - Sorting of interface properties and methods is quite slow
 *   - Probably improper re-setting of declaration structure for new ordering of properties and methods
 *   - End lines between methods/properties, types/interfaces is quite bodgy
 * PR's would be very welcome to improve this hot mess of a code
 */

import { existsSync } from 'node:fs';
import {
    lstat,
    readdir,
    rename
} from 'node:fs/promises';
import {
    basename,
    extname
} from 'node:path/posix';
import {
    ClassDeclaration,
    ExportDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    MethodDeclaration,
    type MethodDeclarationStructure,
    MethodSignature,
    ModuleDeclaration,
    Node,
    Project,
    SourceFile,
    StatementedNode
} from 'ts-morph';

interface Nameable {
    getName(): string | undefined;
}

async function main(): Promise<void> {
    // Get passed parameter
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Please provide a file to parse');
        process.exit(1);
    }

    const filePath = args[0] ?? '';

    // Check if file exists
    if (!existsSync(filePath)) {
        console.error('File does not exist');
        process.exit(1);
    }

    // Check if file is a directory
    if ((await lstat(filePath)).isDirectory()) {
        const files = (await readdir(filePath, { recursive: true, encoding: 'utf-8' })).map(file =>
            file.replace(/\\/g, '/')
        );
        files.sort((a, b) => a.localeCompare(b));
        for (const file of files) {
            if (file.endsWith('.d.ts')) {
                await parseFile(filePath + file);
            }
        }
    } else {
        await parseFile(filePath, args[1]);
    }
}

function sortName(a: Nameable | undefined, b: Nameable | undefined): number {
    return (a?.getName() ?? '').localeCompare(b?.getName() ?? '');
}

function sortSpecifierName(a: ImportDeclaration | ExportDeclaration, b: ImportDeclaration | ExportDeclaration): number {
    return (a.getModuleSpecifierValue() ?? '').localeCompare(b.getModuleSpecifierValue() ?? '');
}

function sortStarExports(a: ExportDeclaration, b: ExportDeclaration): number {
    return a.getText().includes('*') === b.getText().includes('*') ? 0 : a.getText().includes('*') ? -1 : 1;
}

function sortFilesystemSpecifier(a: ImportDeclaration, b: ImportDeclaration): number {
    return a.getModuleSpecifierValue().startsWith('./') === b.getModuleSpecifierValue().startsWith('./')
        ? 0
        : a.getModuleSpecifierValue().startsWith('./')
        ? 1
        : -1;
}

function sortMethodSignature(a: MethodDeclaration | MethodSignature, b: MethodDeclaration | MethodSignature): number {
    return a.getText().replace(/\s/g, '').localeCompare(b.getText().replace(/\s/g, ''));
}

async function sortModule(
    module: ModuleDeclaration | SourceFile,
    parentModule: ModuleDeclaration | SourceFile,
    addLeadingNewLine: boolean
): Promise<void> {
    const variables = module.getVariableStatements()
        .sort((a, b) => sortName(a.getDeclarations()[0], b.getDeclarations()[0]));

    const functions = module.getFunctions()
        .sort((a, b) => a.getText().localeCompare(b.getText()));

    const typeDeclarations = module.getTypeAliases().sort(sortName);
    const interfaceDeclarations = [...module.getClasses(), ...module.getInterfaces()].sort(sortName);

    // NOTE: This is pretty slow, not sure what the proper way to sort properties would be
    for (const declaration of interfaceDeclarations) {
        if (declaration instanceof ClassDeclaration) {
            sortClassDeclaration(declaration);
        } else if (declaration instanceof InterfaceDeclaration) {
            sortInterfaceDeclaration(declaration);
        }
    }

    const newModule = module instanceof ModuleDeclaration
        ? parentModule.addModule({
            name: module.getName(),
            declarationKind: module.getDeclarationKind(),
            hasDeclareKeyword: module.hasDeclareKeyword(),
            docs: module.getJsDocs().map((getJsDoc) => getJsDoc.getStructure())
        })
        : parentModule;

    addLeadingNewLine = addStatements(newModule, variables, true, addLeadingNewLine);
    addStatements(newModule, functions, true, addLeadingNewLine);
    addLeadingNewLine = addStatements(newModule, typeDeclarations, true, addLeadingNewLine);
    addStatements(newModule, interfaceDeclarations, true, addLeadingNewLine);

    const moduleDeclarations = module.getModules();
    for (const submodule of moduleDeclarations) {
        await sortModule(submodule, newModule, false);
    }
}

function sortClassDeclaration(declaration: ClassDeclaration): void {
    const structure = declaration.getStructure();
    structure.methods = declaration.getMethods().sort(sortMethodSignature).map(method =>
        method.getStructure() as MethodDeclarationStructure
    );
    structure.properties = declaration.getProperties().sort(sortName).map(property => property.getStructure());
    declaration.set(structure);

    processClassInterfaceDeclaration(declaration);
}

function processClassInterfaceDeclaration(declaration: ClassDeclaration | InterfaceDeclaration): void {
    const filePath = declaration.getSourceFile().getFilePath();
    const isAugmentation = filePath.includes('augmentations');

    for (const member of declaration.getMembers()) {
        let jsDoc = member.getJsDocs()[0];
        if (!jsDoc) {
            jsDoc = member.addJsDoc({
                tags: [
                    {
                        tagName: 'todo',
                        text: 'Documentation incomplete.',
                        leadingTrivia: '\n'
                    }
                ]
            });
        }

        if (
            isAugmentation
            && !jsDoc.getTags().some(tag => tag.getTagName() === 'unofficial' || tag.getTagName() === 'official')
        ) {
            jsDoc.addTag({
                tagName: 'unofficial',
                text: 'ERROR: Missing `@unofficial` or `@official` tag',
                leadingTrivia: '\n'
            });
        }
    }

    const starts = declaration.getMembers().map(node => node.getStartLinePos(true));

    for (let i = starts.length - 1; i >= 1; i--) {
        declaration.insertText(starts[i] ?? 0, '\n');
    }
}

function sortInterfaceDeclaration(declaration: InterfaceDeclaration): void {
    const structure = declaration.getStructure();
    structure.methods = declaration.getMethods().sort(sortMethodSignature).map(method => method.getStructure());
    structure.properties = declaration.getProperties().sort(sortName).map(property => property.getStructure());
    declaration.set(structure);

    processClassInterfaceDeclaration(declaration);
}

async function parseFile(file: string, output_file: string = file): Promise<void> {
    console.log(`Parsing file: ${file}`);

    const fileName = basename(file, getExtension(file));
    if (fileName === 'index') {
        return;
    }

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(file);

    const newFile = project.createSourceFile(file === output_file ? 'temp.ts' : output_file, '', {
        overwrite: true
    });

    const exports = sourceFile.getExportDeclarations()
        .map(declaration => fixExport(declaration, file))
        .sort((a, b) => sortStarExports(a, b) || sortSpecifierName(a, b));
    const imports = sourceFile.getImportDeclarations()
        .map(declaration => fixImport(declaration, file))
        .sort((a, b) => sortFilesystemSpecifier(a, b) || sortSpecifierName(a, b));

    addStatements(newFile, imports, false, false);
    let addLeadingNewLine = imports.length > 0;
    addLeadingNewLine = addStatements(newFile, exports, false, addLeadingNewLine);

    sortModule(sourceFile, newFile, addLeadingNewLine);

    await newFile.save();

    if (file === output_file) {
        await rename('temp.ts', file);
    }
}

function fixImport(declaration: ImportDeclaration, file: string): ImportDeclaration {
    let moduleSpecifier = declaration.getModuleSpecifierValue();
    if (!moduleSpecifier.startsWith('.')) {
        return declaration;
    }

    const fileExtension = getExtension(file);
    const isDeclarationFile = fileExtension === '.d.ts';

    if (isDeclarationFile) {
        moduleSpecifier = moduleSpecifier.replace('/(\.d)?\.ts$/', '.js');
    }

    if (declaration.getNamespaceImport()) {
        declaration.removeNamespaceImport();
        declaration.addNamedImports(
            declaration.getModuleSpecifierSourceFileOrThrow().getExportSymbols().map(symbol => symbol.getName())
        );
    }

    const moduleExt = getExtension(moduleSpecifier);
    const moduleFileName = basename(moduleSpecifier, moduleExt);

    if (moduleFileName === 'index') {
        declaration.setModuleSpecifier(moduleSpecifier.replace('index.', 'ERROR_INDEX_IS_NOT_ALLOWED.'));
    }

    return declaration;
}

function getExtension(file: string): string {
    if (file.endsWith('.d.ts')) {
        return '.d.ts';
    }

    return extname(file);
}

function fixExport(declaration: ExportDeclaration, file: string): ExportDeclaration {
    const fileExtension = getExtension(file);
    const fileName = basename(file, fileExtension);
    const isStarExport = declaration.isNamespaceExport();

    if (isStarExport) {
        declaration.setModuleSpecifier(
            'ERROR_STAR_EXPORT_IS_NOT_ALLOWED__' + (declaration.getModuleSpecifierValue() ?? '')
        );
    } else {
        for (const namedExport of declaration.getNamedExports()) {
            if (namedExport.getName() !== fileName && fileName !== 'apiExtractorHack') {
                namedExport.setName('ERROR_NAMED_EXPORT_NAME_DOES_NOT_MATCH_FILE_NAME__' + namedExport.getName());
            }
        }
    }

    return declaration;
}

function addStatements(
    statementedNode: StatementedNode,
    nodes: Node[],
    useNewLineBetweenNodes: boolean,
    addLeadingNewLine: boolean
): boolean {
    if (nodes.length === 0) {
        return addLeadingNewLine;
    }

    const statements = (addLeadingNewLine ? '\n' : '')
        + nodes.map(node => node.getText(true)).join(useNewLineBetweenNodes ? '\n\n' : '\n');
    statementedNode.addStatements(statements);
    return false;
}

await main();
