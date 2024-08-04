/**
 * This script is very bad, verging on being completely broken.
 * Current problems:
 *   - Only keeps interfaces, types and classes inside modules
 *   - Sorting of interface properties and methods is quite slow
 *   - Probably improper re-setting of declaration structure for new ordering of properties and methods
 *   - End lines between methods/properties, types/interfaces is quite bodgy
 * PR's would be very welcome to improve this hot mess of a code
 */

import { existsSync } from "node:fs";
import {
    lstat,
    readdir,
    rename
} from "node:fs/promises";
import {
    basename,
    extname
} from "node:path";
import {
    ClassDeclaration,
    ExportDeclaration,
    ExportGetableNode,
    ImportDeclaration,
    InterfaceDeclaration,
    MethodDeclarationStructure,
    ModuleDeclaration,
    Node,
    Project,
    RenameableNode,
    SourceFile,
    StatementedNode
} from "ts-morph";

interface Nameable {
    getName(): string | undefined;
}

async function main(): Promise<void> {
    // Get passed parameter
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Please provide a file to parse");
        process.exit(1);
    }

    // Check if file exists
    if (!existsSync(args[0])) {
        console.error("File does not exist");
        process.exit(1);
    }

    // Check if file is a directory
    if ((await lstat(args[0])).isDirectory()) {
        const files = (await readdir(args[0], { recursive: true, encoding: "utf-8" })).map(file =>
            file.replace(/\\/g, "/")
        );
        for (const file of files) {
            if (file.endsWith(".d.ts")) {
                await parseFile(args[0] + file);
            }
        }
    } else {
        await parseFile(args[0], args[1]);
    }
}

function sortName(a: Nameable, b: Nameable): number {
    return (a.getName() ?? "").localeCompare(b.getName() ?? "");
}

function sortSpecifierName(a: ImportDeclaration | ExportDeclaration, b: ImportDeclaration | ExportDeclaration): number {
    return (a.getModuleSpecifierValue() ?? "").localeCompare(b.getModuleSpecifierValue() ?? "");
}

function sortStarExports(a: ExportDeclaration, b: ExportDeclaration): number {
    return a.getText().includes("*") === b.getText().includes("*") ? 0 : a.getText().includes("*") ? -1 : 1;
}

function sortFilesystemSpecifier(a: ImportDeclaration, b: ImportDeclaration): number {
    return a.getModuleSpecifierValue().startsWith("./") === b.getModuleSpecifierValue().startsWith("./")
        ? 0
        : a.getModuleSpecifierValue().startsWith("./")
        ? 1
        : -1;
}

async function sortModule(module: ModuleDeclaration, file: SourceFile): Promise<void> {
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

    const newModule = file.addModule({
        name: module.getName(),
        declarationKind: module.getDeclarationKind(),
        hasDeclareKeyword: module.hasDeclareKeyword(),
        docs: module.getJsDocs().map((getJsDoc) => getJsDoc.getStructure())
    });

    addStatements(newModule, typeDeclarations, true, false);
    let addLeadingNewLine = typeDeclarations.length > 0;
    addStatements(newModule, interfaceDeclarations, true, addLeadingNewLine);
}

function sortClassDeclaration(declaration: ClassDeclaration): void {
    const structure = declaration.getStructure();
    structure.methods = declaration.getMethods().sort(sortName).map(method =>
        method.getStructure() as MethodDeclarationStructure
    );
    structure.properties = declaration.getProperties().sort(sortName).map(property => property.getStructure());
    declaration.set(structure);

    if (structure.methods!.length && structure.properties!.length) {
        declaration.insertText(declaration.getMethods()[0].getStart(true), " \n");
    }
}

function sortInterfaceDeclaration(declaration: InterfaceDeclaration): void {
    const structure = declaration.getStructure();
    structure.methods = declaration.getMethods().sort(sortName).map(method => method.getStructure());
    structure.properties = declaration.getProperties().sort(sortName).map(property => property.getStructure());
    declaration.set(structure);

    if (structure.methods!.length && structure.properties!.length) {
        declaration.insertText(declaration.getMethods()[0].getStart(true), " \n");
    }
}

async function parseFile(file: string, output_file: string = file): Promise<void> {
    console.log(`Parsing file: ${file}`);

    const fileName = basename(file, getExtension(file));
    if (fileName === "index") {
        return;
    }

    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(file);

    const newFile = project.createSourceFile(file === output_file ? "temp.ts" : output_file, "", {
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

    const types = sourceFile.getTypeAliases()
        .sort(sortName)
        .map(type => renameIfExported(type, fileName));
    addLeadingNewLine = addStatements(newFile, types, true, addLeadingNewLine);

    const variables = sourceFile.getVariableStatements()
        .map(variable => {
            for (const declaration of variable.getDeclarations()) {
                renameIfExported(declaration, fileName);
            }
            return variable;
        })
        .sort((a, b) => sortName(a.getDeclarations()[0], b.getDeclarations()[0]));

    addLeadingNewLine = addStatements(newFile, variables, true, addLeadingNewLine);

    const interfaces = sourceFile.getInterfaces()
        .filter(inter => !inter.isDefaultExport())
        .sort(sortName)
        .map(inter => renameIfExported(inter, fileName));
    addStatements(newFile, interfaces, true, addLeadingNewLine);

    for (const module of sourceFile.getModules()) {
        await sortModule(module, newFile);
    }

    await newFile.save();

    if (file === output_file) {
        await rename("temp.ts", file);
    }
}

function fixImport(declaration: ImportDeclaration, file: string): ImportDeclaration {
    let moduleSpecifier = declaration.getModuleSpecifierValue();
    if (!moduleSpecifier.startsWith(".")) {
        return declaration;
    }

    const fileExtension = getExtension(file);
    const isDeclarationFile = fileExtension === ".d.ts";

    if (isDeclarationFile) {
        moduleSpecifier = moduleSpecifier.replace("/(\.d)?\.ts$/", ".js");
    }

    if (declaration.getNamespaceImport()) {
        declaration.removeNamespaceImport();
        declaration.addNamedImports(
            declaration.getModuleSpecifierSourceFileOrThrow().getExportSymbols().map(symbol => symbol.getName())
        );
    }

    const moduleExt = getExtension(moduleSpecifier);
    const moduleFileName = basename(moduleSpecifier, moduleExt);

    if (moduleFileName === "index") {
        declaration.setModuleSpecifier(moduleSpecifier.replace("index.", "ERROR_INDEX_IS_NOT_ALLOWED."));
    }

    return declaration;
}

function getExtension(file: string): string {
    if (file.endsWith(".d.ts")) {
        return ".d.ts";
    }

    return extname(file);
}

function fixExport(declaration: ExportDeclaration, file: string): ExportDeclaration {
    const fileExtension = getExtension(file);
    const fileName = basename(file, fileExtension);
    const isStarExport = declaration.isNamespaceExport();

    if (isStarExport) {
        declaration.setModuleSpecifier("ERROR_STAR_EXPORT_IS_NOT_ALLOWED");
    } else {
        for (const namedExport of declaration.getNamedExports()) {
            namedExport.setName(fileName);
        }
    }

    return declaration;
}

function renameIfExported<T extends ExportGetableNode & RenameableNode>(declaration: T, fileName: string): T {
    if (declaration.isExported()) {
        declaration.rename(fileName);
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

    const statements = (addLeadingNewLine ? "\n" : "")
        + nodes.map(node => node.getText(true)).join(useNewLineBetweenNodes ? "\n\n" : "\n");
    statementedNode.addStatements(statements);
    return false;
}

await main();
