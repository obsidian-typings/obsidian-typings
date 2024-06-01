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

import {Project, Node, ModuleDeclaration, SourceFile} from "ts-morph";
import * as fs from "node:fs";

const project = new Project();
const declarationsToText = (declarationArray: Node[]) => declarationArray.map(declaration => declaration.getText(true)).join('\n\n');
const sortFn = (a: any, b: any) => a.getName().localeCompare(b.getName());


async function sortModule(module: ModuleDeclaration, file: SourceFile) {
    const typeDeclarations = module.getTypeAliases().sort(sortFn);
    const interfaceDeclarations = [...module.getClasses(), ...module.getInterfaces()].sort(sortFn);
    for (const declaration of interfaceDeclarations) {
        const structure = declaration.getStructure();
        // NOTE: This is pretty slow, not sure what the proper way to sort properties would be
        // @ts-ignore
        structure.methods = declaration.getMethods().sort(sortFn).map(method => method.getStructure());

        // @ts-ignore
        structure.properties = declaration.getProperties().sort(sortFn).map(property => property.getStructure());

        // @ts-ignore
        declaration.set(structure);
        if (structure.methods!.length && structure.properties!.length)
            declaration.insertText(declaration.getMethods()[0].getStart(true), '\n');
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

    const newFile = project.createSourceFile(file === output_file ? "temp.d.ts" : output_file, '', {overwrite: true});
    
    const imports = sourceFile.getImportDeclarations().map(declaration => declaration.getText());
    const exports = sourceFile.getExportDeclarations().map(declaration => declaration.getText());
    newFile.addStatements(imports);
    newFile.addStatements(exports);
    
    for (const module of sourceFile.getModules())
        await sortModule(module, newFile);
    
    await newFile.save()

    if (file === output_file)
        fs.renameSync("temp.d.ts", file);
}

// Get passed parameter
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide a file to parse');
    process.exit(1);
}

// Check if file exists
if (!fs.existsSync(args[0])) {
    console.error('File does not exist');
    process.exit(1);
}

parseFile(args[0], args[1]);
