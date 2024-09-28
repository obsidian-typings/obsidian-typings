"use strict";
function generateTypes(obj, maxDepth = 1) {
    if (maxDepth === 0) {
        maxDepth = Number.MAX_SAFE_INTEGER;
    }
    const builtInPrototypeNameMap = new Map();
    const obsidianPrototypeNameMap = new Map();
    const DEPTH_LIMIT_REACHED_TYPE_NAME = 'DepthLimitReached';
    function main() {
        init();
        const customTypes = new CustomTypes();
        inferType({
            obj,
            customTypes,
            inArray: false,
            path: 'root',
            objectTypeMap: new Map(),
            depth: 1
        });
        return customTypes.toString();
    }
    class CustomTypes {
        counter = 0;
        typeEntryMap = new Map();
        definitionTypeMap = new Map();
        nextCounter() {
            this.counter++;
            return this.counter;
        }
        toString() {
            return Array.from(this.typeEntryMap.entries())
                .sort(([_1, { path: path1 }], [_2, { path: path2 }]) => path1.localeCompare(path2))
                .map(([type, { path, definition }]) => `// ${path}\ninterface ${type}${definition}`)
                .join('\n\n');
        }
        set(type, path, definition) {
            this.typeEntryMap.set(type, { path, definition });
            this.definitionTypeMap.set(definition, type);
        }
        getByDefinition(definition) {
            return this.definitionTypeMap.get(definition);
        }
    }
    function init() {
        if (builtInPrototypeNameMap.size > 0) {
            return;
        }
        const obsidian = window.require('obsidian');
        for (const [key, value] of entriesSafe(obsidian)) {
            if (typeof value === 'function') {
                obsidianPrototypeNameMap.set(value.prototype, key);
            }
        }
        builtInPrototypeNameMap.set(window, 'Window');
        builtInPrototypeNameMap.set(document, 'Document');
        builtInPrototypeNameMap.set(Promise.prototype, 'Promise<unknown>');
        builtInPrototypeNameMap.set(Object.prototype, 'Object');
        for (const key of Object.getOwnPropertyNames(window).filter((key) => key.match(/HTML.+Element/))) {
            const htmlElementClass = window[key];
            builtInPrototypeNameMap.set(htmlElementClass.prototype, key);
        }
    }
    function sortedEntries(obj) {
        return entriesSafe(obj).sort(([key1, value1], [key2, value2]) => (Number(typeof value1 === 'function') - Number(typeof value2 === 'function')) || key1.localeCompare(key2));
    }
    function entriesSafe(obj) {
        const record = obj;
        return Object.getOwnPropertyNames(record).map((key) => {
            try {
                return [key, record[key]];
            }
            catch (e) {
                return [key, undefined];
            }
        });
    }
    function inferType({ obj, customTypes, inArray, path, objectTypeMap, depth }) {
        console.debug(`Inferring path: ${path}`);
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        if (obj === null) {
            return 'null';
        }
        let type = '';
        if (typeof obj === 'object') {
            type = objectTypeMap.get(obj) ?? '';
            if (type) {
                return type;
            }
            if (Array.isArray(obj)) {
                type = inferArrayType({
                    arr: obj,
                    customTypes,
                    path,
                    objectTypeMap,
                    depth
                });
            }
            else {
                type = inferObjectType({
                    obj,
                    customTypes,
                    path,
                    objectTypeMap,
                    depth
                });
            }
        }
        else if (typeof obj === 'function') {
            type = inferFunctionSignature({
                fn: obj,
                path,
                inArray
            });
        }
        else {
            return typeof obj;
        }
        if (type !== DEPTH_LIMIT_REACHED_TYPE_NAME) {
            objectTypeMap.set(obj, type);
        }
        return type;
    }
    function inferArrayType({ arr, customTypes, path, objectTypeMap, depth }) {
        if (arr.length === 0) {
            return 'unknown[]';
        }
        const arrayTypes = new Set(arr.map((item, index) => inferType({
            obj: item,
            customTypes,
            inArray: true,
            path: `${path}[${index}]`,
            objectTypeMap,
            depth
        })));
        const typesString = Array.from(arrayTypes).join(' | ');
        return arrayTypes.size > 1 ? `(${typesString})[]` : `${typesString}[]`;
    }
    function inferObjectType({ obj, customTypes, path, objectTypeMap, depth }) {
        const builtInType = builtInPrototypeNameMap.get(obj) ?? '';
        if (builtInType) {
            return builtInType;
        }
        if (depth > maxDepth) {
            return DEPTH_LIMIT_REACHED_TYPE_NAME;
        }
        const proto = Object.getPrototypeOf(obj);
        const prefix = obsidianPrototypeNameMap.get(obj) ?? obsidianPrototypeNameMap.get(proto) ?? 'Type';
        const type = `${prefix}${customTypes.nextCounter()}`;
        objectTypeMap.set(obj, type);
        const typeOfProto = inferType({
            obj: proto,
            customTypes,
            inArray: false,
            path: `${path}.__proto__`,
            objectTypeMap,
            depth: depth + 1
        });
        const objectFieldsStr = sortedEntries(obj)
            .map(([key, value]) => {
            const formattedKey = isValidIdentifier(key) ? key : `'${key}'`;
            const inferredType = inferType({
                obj: value,
                customTypes,
                inArray: false,
                path: isValidIdentifier(key) ? `${path}.${formattedKey}` : `${path}[${formattedKey}]`,
                objectTypeMap,
                depth: depth + 1
            });
            if (typeof value === 'undefined') {
                return `    ${formattedKey}?: unknown;`;
            }
            else if (typeof value === 'function') {
                return `    ${formattedKey}${inferredType};`;
            }
            else {
                return `    ${formattedKey}: ${inferredType};`;
            }
        })
            .join('\n');
        if (objectFieldsStr) {
            const extendsStr = typeOfProto === 'Object' ? '' : ` extends ${typeOfProto}`;
            const definition = `${extendsStr} {\n${objectFieldsStr}\n}`;
            const typeWithSameDefinition = customTypes.getByDefinition(definition);
            if (typeWithSameDefinition) {
                return typeWithSameDefinition;
            }
            customTypes.set(type, path, definition);
            return type;
        }
        else {
            objectTypeMap.set(obj, typeOfProto);
            return typeOfProto;
        }
    }
    function inferFunctionSignature({ fn, path, inArray }) {
        console.debug(`Inferring function at path: ${path}`);
        const fnStr = fn.toString();
        const paramList = Array(fn.length).fill(0).map((_, i) => `arg${i + 1}: unknown`).join(', ');
        const isAsync = fnStr.includes(' v(this,void 0,') || fnStr.includes('await ');
        const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
        return inArray ? `((${paramList}) => ${returnType})` : `(${paramList}): ${returnType}`;
    }
    function isValidIdentifier(key) {
        return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
    }
    return main();
}
