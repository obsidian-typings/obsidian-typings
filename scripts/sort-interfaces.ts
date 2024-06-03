/**
 * This script is very bad, verging on being completely broken.
 * Current problems:
 *   - Only keeps interfaces, types and classes inside modules
 *   - Sorting of interface properties and methods is quite slow
 *   - Probably improper re-setting of declaration structure for new ordering of properties and methods
 *   - Endlines between methods/properties, types/interfaces is quite bodgy
 * PR's would be very welcome to improve this hot mess of a code
 */
// @ts-nocheck (Prevent compilation errors for people use the package as a submodule)

import { Project, Node, ModuleDeclaration, SourceFile } from "ts-morph";
import * as fs from "node:fs";

const project = new Project();
const declarationsToText = (declarationArray: Node[]) =>
    declarationArray.map(declaration => declaration.getText(true)).join("\n\n");
const sortName = (a: any, b: any) => a.getName().localeCompare(b.getName());
const sortSpecifierName = (a: any, b: any) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue());
const sortStarExports = (a: any, b: any) =>
    a.getText().includes("*") === b.getText().includes("*") ? 0 : a.getText().includes("*") ? -1 : 1;
const sortFilesystemSpecifier = (a: any, b: any) =>
    a.getModuleSpecifierValue().startsWith("./") === b.getModuleSpecifierValue().startsWith("./")
        ? 0
        : a.getModuleSpecifierValue().startsWith("./")
        ? 1
        : -1;

async function sortModule(module: ModuleDeclaration, file: SourceFile) {
    const typeDeclarations = module.getTypeAliases().sort(sortName);
    const interfaceDeclarations = [...module.getClasses(), ...module.getInterfaces()].sort(sortName);
    for (const declaration of interfaceDeclarations) {
        const structure = declaration.getStructure();
        // NOTE: This is pretty slow, not sure what the proper way to sort properties would be
        // @ts-ignore
        structure.methods = declaration.getMethods().sort(sortName).map(method => method.getStructure());

        // @ts-ignore
        structure.properties = declaration.getProperties().sort(sortName).map(property => property.getStructure());

        // @ts-ignore
        declaration.set(structure);
        if (structure.methods!.length && structure.properties!.length)
            declaration.insertText(declaration.getMethods()[0].getStart(true), " \n");
    }

    const newModule = file.addModule({
        name: module.getName(),
        kind: module.getDeclarationKind(),
        docs: module.getJsDocs().map((getJsDoc) => getJsDoc.getStructure())
    });

    // Apparently I can't just add an endline to the end, nor use a writer to add an endline at the end, hence the comment
    if (typeDeclarations.length)
        newModule.addStatements(declarationsToText(typeDeclarations) + " \n\n\n");
    newModule.addStatements(declarationsToText(interfaceDeclarations));
}

async function parseFile(file: string, output_file: string = file) {
    const sourceFile = project.addSourceFileAtPath(file);

    const newFile = project.createSourceFile(file === output_file ? "temp.ts" : output_file, "", {
        overwrite: true
    });

    const exports = sourceFile.getExportDeclarations()
        .sort((a, b) => sortStarExports(a, b) || sortSpecifierName(a, b))
        .map(declaration => declaration.getText(true));
    const imports = sourceFile.getImportDeclarations()
        .sort((a, b) => sortFilesystemSpecifier(a, b) || sortSpecifierName(a, b))
        .map(declaration => declaration.getText(true));

    const default_export = sourceFile.getDefaultExportSymbol();
    newFile.addStatements(imports);
    newFile.addStatements(exports);

    if (default_export)
        newFile.addStatements(default_export.getDeclarations().map(declaration => declaration.getText(true)));

    if (exports.length && imports.length)
        newFile.insertStatements(newFile.getExportDeclarations()[0].getChildIndex(), writer => writer.newLine());
    if (default_export && (exports.length || imports.length))
        newFile.insertStatements(default_export.getDeclarations()[0].getChildIndex(), writer => writer.newLine());

    const types = sourceFile.getTypeAliases()
        .sort(sortName)
        .map(type => type.getText(true));
    newFile.addStatements(types);
    if (types.length)
        newFile.insertStatements(newFile.getTypeAliases()[0].getChildIndex(), writer => writer.newLine());

    const interfaces = sourceFile.getInterfaces()
        .filter(inter => !inter.isDefaultExport())
        .sort(sortName)
        .map(inter => inter.getText(true));
    newFile.addStatements(interfaces);

    for (const module of sourceFile.getModules())
        await sortModule(module, newFile);

    await newFile.save();

    if (file === output_file)
        fs.renameSync("temp.ts", file);
}

// Get passed parameter
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Please provide a file to parse");
    process.exit(1);
}

// Check if file exists
if (!fs.existsSync(args[0])) {
    console.error("File does not exist");
    process.exit(1);
}

// Check if file is a directory
if (fs.lstatSync(args[0]).isDirectory()) {
    const files = fs.readdirSync(args[0], { recursive: true });
    for (const file of files) {
        if (file.endsWith("d.ts"))
            await parseFile(args[0] + file);
    }
} else {
    await parseFile(args[0], args[1]);
}
