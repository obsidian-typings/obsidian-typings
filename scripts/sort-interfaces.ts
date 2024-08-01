/**
 * This script is very bad, verging on being completely broken.
 * Current problems:
 *   - Only keeps interfaces, types and classes inside modules
 *   - Sorting of interface properties and methods is quite slow
 *   - Probably improper re-setting of declaration structure for new ordering of properties and methods
 *   - End lines between methods/properties, types/interfaces is quite bodgy
 * PR's would be very welcome to improve this hot mess of a code
 */

import {
    existsSync,
    lstatSync,
    readdirSync,
    renameSync
} from "node:fs";
import {
    basename,
    extname
} from "node:path";
import {
    ClassDeclaration,
    ExportDeclaration,
    ImportDeclaration,
    InterfaceDeclaration,
    MethodDeclarationStructure,
    ModuleDeclaration,
    Node,
    Project,
    SourceFile
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
    if (lstatSync(args[0]).isDirectory()) {
        const files = readdirSync(args[0], { recursive: true, encoding: "utf-8" });
        for (const file of files) {
            if (file.endsWith(".d.ts")) {
                await parseFile(args[0] + file);
            }
        }
    } else {
        await parseFile(args[0], args[1]);
    }
}

function declarationsToText(declarationArray: Node[]): string {
    return declarationArray.map(declaration => declaration.getText(true)).join("\n\n");
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

    // Apparently I can't just add an endline to the end, nor use a writer to add an endline at the end, hence the comment
    if (typeDeclarations.length) {
        newModule.addStatements(declarationsToText(typeDeclarations) + " \n\n\n");
    }
    newModule.addStatements(declarationsToText(interfaceDeclarations));
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
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(file);

    const newFile = project.createSourceFile(file === output_file ? "temp.ts" : output_file, "", {
        overwrite: true
    });

    const exports = sourceFile.getExportDeclarations()
        .sort((a, b) => sortStarExports(a, b) || sortSpecifierName(a, b))
        .map(declaration => declaration.getText(true));
    const imports = sourceFile.getImportDeclarations()
        .map(declaration => fixImport(declaration, file))
        .sort((a, b) => sortFilesystemSpecifier(a, b) || sortSpecifierName(a, b))
        .map(declaration => declaration.getText(true));

    const default_export = sourceFile.getDefaultExportSymbol();
    newFile.addStatements(imports);
    newFile.addStatements(exports);

    if (default_export) {
        newFile.addStatements(default_export.getDeclarations().map(declaration => declaration.getText(true)));
    }

    if (exports.length && imports.length) {
        newFile.insertStatements(newFile.getExportDeclarations()[0].getChildIndex(), writer => writer.newLine());
    }
    if (default_export && (exports.length || imports.length)) {
        newFile.insertStatements(default_export.getDeclarations()[0].getChildIndex(), writer => writer.newLine());
    }

    const types = sourceFile.getTypeAliases()
        .sort(sortName)
        .map(type => type.getText(true));
    newFile.addStatements(types);
    if (types.length) {
        newFile.insertStatements(newFile.getTypeAliases()[0].getChildIndex(), writer => writer.newLine());
    }

    const interfaces = sourceFile.getInterfaces()
        .filter(inter => !inter.isDefaultExport())
        .sort(sortName)
        .map(inter => inter.getText(true));
    newFile.addStatements(interfaces);

    for (const module of sourceFile.getModules()) {
        await sortModule(module, newFile);
    }

    await newFile.save();

    if (file === output_file) {
        renameSync("temp.ts", file);
    }
}

function fixImport(declaration: ImportDeclaration, file: string): ImportDeclaration {
    let moduleSpecifier = declaration.getModuleSpecifierValue();
    if (!moduleSpecifier.startsWith(".")) {
        return declaration;
    }

    const fileExtension = getExtension(file);
    const isDeclarationFile = fileExtension === ".d.ts";
    const fileName = basename(file, fileExtension);

    if (isDeclarationFile) {
        moduleSpecifier = moduleSpecifier.replace("/(\.d)?\.ts$/", ".js");
    }

    const moduleExt = getExtension(moduleSpecifier);
    const moduleFileName = basename(moduleSpecifier, moduleExt);

    if (moduleFileName !== "index" && (fileName !== "index" || moduleSpecifier.startsWith(".."))) {
        moduleSpecifier = moduleSpecifier.replace(`${moduleFileName}${moduleExt}`, `index${moduleExt}`);
    }

    declaration.setModuleSpecifier(moduleSpecifier);
    return declaration;
}

function getExtension(file: string): string {
    if (file.endsWith(".d.ts")) {
        return ".d.ts";
    }

    return extname(file);
}

await main();
