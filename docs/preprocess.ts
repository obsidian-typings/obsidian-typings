import { readdir } from 'node:fs/promises';
import {
    basename,
    dirname,
    join,
    relative
} from 'node:path/posix';

import { Project } from 'ts-morph';

const project = new Project();

const augmentations = new Map<string, string>();
const imports = new Map<string, Set<string>>();
const indexDirectories = ['obsidian'];

async function convertRecursive(dir: string): Promise<void> {
    for (const dirent of await readdir(dir, { withFileTypes: true })) {
        if (dirent.isDirectory()) {
            await convertRecursive(`${dir}/${dirent.name}`);
        } else if (dirent.name.endsWith('.d.ts')) {
            const filePath = `${dir}/${dirent.name}`;
            if (!filePath.includes('augmentations')) {
                continue;
            }
            const augmentationsDirName = basename(dirname(dir));

            console.log(`Processing ${filePath}`);
            const sourceFile = project.addSourceFileAtPath(filePath);
            for (const importDeclaration of sourceFile.getImportDeclarations()) {
                let moduleSpecifier = importDeclaration.getModuleSpecifierValue();
                if (moduleSpecifier.startsWith('.')) {
                    const moduleSourceFile = importDeclaration.getModuleSpecifierSourceFileOrThrow();
                    const relativePath = relative(srcDir, moduleSourceFile.getFilePath());
                    let indexDirectory = indexDirectories.find(indexDirectory =>
                        relativePath.startsWith(indexDirectory)
                    );
                    if (indexDirectory) {
                        moduleSpecifier = `./${indexDirectory}/index.js`;
                    } else {
                        moduleSpecifier = './' + relativePath.replace(/(\.d)?\.ts$/, '.js');
                    }
                }
                const importedNames = importDeclaration.getNamedImports().map(namedImport => namedImport.getName());
                if (!imports.has(moduleSpecifier)) {
                    imports.set(moduleSpecifier, new Set());
                }
                for (const importedName of importedNames) {
                    imports.get(moduleSpecifier)!.add(importedName);
                }
            }

            for (let module of sourceFile.getModules()) {
                const path = sourceFile.getFilePath().slice(srcDir.length - 20);
                for (let declaration of module.getFunctions()) {
                    declaration.insertJsDoc(0, {
                        tags: [{
                            tagName: 'source',
                            text: path
                        }]
                    });
                }
                for (let declaration of module.getInterfaces()) {
                    declaration.addJsDoc({
                        tags: [{
                            tagName: 'source',
                            text: path
                        }]
                    });
                }
                for (let declaration of module.getClasses()) {
                    declaration.addJsDoc({
                        tags: [{
                            tagName: 'source',
                            text: path
                        }]
                    });
                }

                augmentations.set(
                    augmentationsDirName,
                    (augmentations.get(augmentationsDirName) ?? '') + module.getBodyText() + '\n'
                );
            }
        }
    }
}

const srcDir = join(process.cwd().replaceAll('\\', '/'), '../src');
await convertRecursive(srcDir);

// Start creating the final output file starting with the augmentations types as a base
const typesSourceFile = project.addSourceFileAtPath('../src/obsidian/augmentations/index.d.ts');

// Import all required imports into the types source file
for (const [moduleSpecifier, importedNames] of imports) {
    if (importedNames.size === 1 && importedNames.has('default')) {

    } else {
        typesSourceFile.addImportDeclaration({
            moduleSpecifier: moduleSpecifier,
            namedImports: Array.from(importedNames).map(importedName => ({
                name: importedName
            }))
        });
    }
}

// Remove existing exports from the types file (only allow exporting via namespaces)
for (const exportDeclaration of typesSourceFile.getExportDeclarations()) {
    exportDeclaration.remove();
}

// Join augmentations into obsidian namespace (because otherwise types are duplicated in both)
const obsidianNamespace = augmentations.get('obsidian');
const augmentationsNamespace = augmentations.get('augmentations');
augmentations.set('obsidian', obsidianNamespace + augmentationsNamespace);
augmentations.delete('augmentations');

for (let [augmentationsDirName, augmentation] of augmentations) {
    const namespaceName = '_' + augmentationsDirName.replace(/[^a-zA-Z0-9]/g, '_');
    if (augmentationsDirName === 'obsidian') {
        augmentation = 'export * from \'obsidian\';\n' + augmentation;
        typesSourceFile.addModule({
            name: namespaceName,
            isExported: true,
            statements: augmentation,
            docs: [{
                tags: [{
                    tagName: 'source',
                    text: `node_modules/obsidian/obsidian.d.ts`
                }]
            }]
        });
    } else {
        typesSourceFile.addModule({
            name: namespaceName,
            isExported: true,
            statements: augmentation
        });
    }
}

typesSourceFile.addModule({
    name: '_internals',
    isExported: true,
    statements: 'export * from \'./obsidian/index.js\';'
});

const canvasSourceFile = project.addSourceFileAtPath('../node_modules/obsidian/canvas.d.ts');
typesSourceFile.addModule({
    name: '_canvas',
    isExported: true,
    statements: canvasSourceFile.getFullText(),
    docs: [{
        tags: [{
            tagName: 'source',
            text: `node_modules/obsidian/canvas.d.ts#` + (typesSourceFile.getEndLineNumber() + 3)
        }]
    }]
});

const publishSourceFile = project.addSourceFileAtPath('../node_modules/obsidian/publish.d.ts');
typesSourceFile.addModule({
    name: '_publish',
    isExported: true,
    statements: publishSourceFile.getFullText(),
    docs: [{
        tags: [{
            tagName: 'source',
            text: `node_modules/obsidian/publish.d.ts#` + (typesSourceFile.getEndLineNumber() + 3)
        }]
    }]
});

typesSourceFile.insertText(0, '/** THIS IS A GENERATED FILE BY BUILD SCRIPT */\n');

await typesSourceFile.copy('../../full-types.d.ts', { overwrite: true }).save();
