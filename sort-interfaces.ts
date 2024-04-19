import {Project, Node} from "ts-morph";
import * as fs from "node:fs";

const project = new Project();
const declarationsToText = (declarationArray: Node[]) => declarationArray.map(declaration => declaration.getText()).join('\n\n');
const sortFn = (a: any, b: any) => a.getName().localeCompare(b.getName());

async function parseFile(file: string, output_file: string = file) {
    const sourceFile = project.addSourceFileAtPath(file);
    const obsidianDeclaration = sourceFile.getModules()[0];

    const typeDeclarations = obsidianDeclaration.getTypeAliases().sort(sortFn);
    const interfaceDeclarations = [...obsidianDeclaration.getClasses(), ...obsidianDeclaration.getInterfaces()].sort(sortFn);
    for (const declaration of interfaceDeclarations) {
        const structure = declaration.getStructure();
        // NOTE: This is pretty slow, not sure what the proper way to sort properties would be
        // @ts-ignore
        structure.methods = declaration.getMethods().sort(sortFn).map(method => method.getStructure());

        // @ts-ignore
        structure.properties = declaration.getProperties().sort(sortFn).map(property => property.getStructure());

        // @ts-ignore
        declaration.set(structure);
        if (structure.methods!.length && structure.properties!.length) {
            const firstMethod = declaration.getMethods()[0];
            declaration.insertText((firstMethod.getJsDocs()[0] || firstMethod).getStart(), '\n');
        }
    }

    const newFile = project.createSourceFile(file === output_file ? "temp.d.ts" : output_file, '', {overwrite: true});

    const nodesBeforeModule = obsidianDeclaration.getPreviousSiblings().reverse();
    nodesBeforeModule.forEach(node => newFile.addStatements(node.getText()));

    const docs = obsidianDeclaration.getJsDocs().map(jsDoc => jsDoc.getText()).join('\n');
    newFile.addStatements(docs);

    const newModule = newFile.addModule({ name: obsidianDeclaration.getName() });

    newModule.addStatements(declarationsToText(typeDeclarations));
    newModule.addStatements('');
    newModule.addStatements(declarationsToText(interfaceDeclarations));

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
