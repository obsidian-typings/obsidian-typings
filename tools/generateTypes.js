"use strict";
function generateTypes(obj, maxDepth = 1) {
    class CustomTypes {
        counter = 0;
        typeDefinitionMap = new Map();
        definitionTypeMap = new Map();
        nextCounter() {
            this.counter++;
            return this.counter;
        }
        toString() {
            let index = 0;
            const typePathIndexMap = new Map();
            for (const [obj, path] of objectPathDepthMap.entries()) {
                const type = objectTypeMap.get(obj);
                if (!type) {
                    continue;
                }
                typePathIndexMap.set(type, { path, index });
                index++;
            }
            return Array.from(this.typeDefinitionMap.entries())
                .sort(([type1], [type2]) => (typePathIndexMap.get(type1)?.index ?? 0) - (typePathIndexMap.get(type2)?.index ?? 0))
                .map(([type, definition]) => `// ${typePathIndexMap.get(type)?.path ?? ''}\ninterface ${type}${definition}`)
                .join('\n\n');
        }
        set({ type, definition }) {
            this.typeDefinitionMap.set(type, definition);
            this.definitionTypeMap.set(definition, type);
        }
        getByDefinition(definition) {
            return this.definitionTypeMap.get(definition);
        }
    }
    const builtInPrototypeNameMap = new Map();
    const obsidianPrototypeNameMap = new Map();
    const DEPTH_LIMIT_REACHED_TYPE_NAME = 'DepthLimitReached';
    const customTypes = new CustomTypes();
    const objectTypeMap = new Map();
    const objectPathDepthMap = new Map();
    const functionObjectMap = new Map();
    const fixDuplicatesMap = new Map();
    function main() {
        if (maxDepth === 0) {
            maxDepth = Number.MAX_SAFE_INTEGER;
        }
        initBuiltInPrototypeNameMap();
        initObjectPathMap();
        inferType({
            obj,
            inArray: false,
            path: 'root',
            depth: 1
        });
        return customTypes.toString();
    }
    function initBuiltInPrototypeNameMap() {
        const obsidian = window.require('obsidian');
        for (const [key, value] of entriesSafe(obsidian)) {
            if (typeof value === 'function') {
                obsidianPrototypeNameMap.set(value.prototype, key);
            }
        }
        fixDuplicatesMap.set(obsidian.TFile, null);
        fixDuplicatesMap.set(obsidian.TFolder, null);
        builtInPrototypeNameMap.set(window, 'Window');
        builtInPrototypeNameMap.set(document, 'Document');
        builtInPrototypeNameMap.set(Promise.prototype, 'Promise<unknown>');
        builtInPrototypeNameMap.set(Object.prototype, 'Object');
        builtInPrototypeNameMap.set(Symbol.prototype, 'Symbol');
        builtInPrototypeNameMap.set(WeakMap.prototype, 'WeakMap<object, unknown>');
        builtInPrototypeNameMap.set(WeakSet.prototype, 'WeakSet<object>');
        builtInPrototypeNameMap.set(BigInt.prototype, 'BigInt');
        builtInPrototypeNameMap.set(Node.prototype, 'Node');
        builtInPrototypeNameMap.set(Event.prototype, 'Event');
        builtInPrototypeNameMap.set(HTMLElement.prototype, 'HTMLElement');
        builtInPrototypeNameMap.set(SVGElement.prototype, 'SVGElement');
        builtInPrototypeNameMap.set(DocumentFragment.prototype, 'DocumentFragment');
        builtInPrototypeNameMap.set(ArrayBuffer.prototype, 'ArrayBuffer');
        builtInPrototypeNameMap.set(Int8Array.prototype, 'Int8Array');
        builtInPrototypeNameMap.set(Uint8Array.prototype, 'Uint8Array');
        builtInPrototypeNameMap.set(Float32Array.prototype, 'Float32Array');
        builtInPrototypeNameMap.set(Float64Array.prototype, 'Float64Array');
        builtInPrototypeNameMap.set(Error.prototype, 'Error');
        builtInPrototypeNameMap.set(TypeError.prototype, 'TypeError');
        builtInPrototypeNameMap.set(ReferenceError.prototype, 'ReferenceError');
        builtInPrototypeNameMap.set(SyntaxError.prototype, 'SyntaxError');
        for (const key of Object.getOwnPropertyNames(window).filter((key) => key.match(/HTML.+Element/))) {
            const htmlElementClass = window[key];
            builtInPrototypeNameMap.set(htmlElementClass.prototype, key);
        }
    }
    function initObjectPathMap() {
        const queue = [];
        queue.push({
            obj,
            path: 'root',
            depth: 1
        });
        while (queue.length > 0) {
            const entry = queue.shift();
            if (!entry) {
                continue;
            }
            const { obj, path, depth } = entry;
            console.debug(`Preprocessing: ${path} (depth: ${depth})`);
            if (depth > maxDepth) {
                continue;
            }
            if (obj === null || obj === undefined) {
                continue;
            }
            if (typeof obj !== 'object' && typeof obj !== 'function') {
                continue;
            }
            if (objectPathDepthMap.has(obj)) {
                continue;
            }
            if (builtInPrototypeNameMap.has(obj)) {
                continue;
            }
            let isDuplicate = false;
            for (const [fn, sampleObj] of fixDuplicatesMap.entries()) {
                if (obj instanceof fn) {
                    if (sampleObj) {
                        isDuplicate = true;
                        break;
                    }
                    fixDuplicatesMap.set(fn, obj);
                }
            }
            if (isDuplicate) {
                continue;
            }
            objectPathDepthMap.set(obj, path);
            if (typeof obj === 'object') {
                if (Array.isArray(obj)) {
                    for (let index = 0; index < obj.length; index++) {
                        queue.push({
                            obj: obj[index],
                            path: `${path}[${index}]`,
                            depth: depth + 1
                        });
                    }
                }
                else if (Object.getPrototypeOf(obj) === Map.prototype) {
                    const map = obj;
                    queue.push({
                        obj: Array.from(map.keys()),
                        path: `Array.from(${path}.keys())`,
                        depth
                    });
                    queue.push({
                        obj: Array.from(map.values()),
                        path: `Array.from(${path}.values())`,
                        depth
                    });
                }
                else if (Object.getPrototypeOf(obj) === Set.prototype) {
                    queue.push({
                        obj: Array.from(obj),
                        path,
                        depth
                    });
                }
                else {
                    queue.push({
                        obj: Object.getPrototypeOf(obj),
                        path: `${path}.__proto__`,
                        depth: depth + 1
                    });
                    for (const [key, value] of sortedEntries(obj)) {
                        queue.push({
                            obj: value,
                            path: isValidIdentifier(key) ? `${path}.${key}` : `${path}['${key}']`,
                            depth: depth + 1
                        });
                    }
                }
            }
            else {
                if (Object.keys(obj).length > 0) {
                    const mappedObj = Object.assign({}, obj);
                    functionObjectMap.set(obj, mappedObj);
                    queue.push({
                        obj: mappedObj,
                        path,
                        depth
                    });
                }
            }
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
    function inferType({ obj, inArray, path, depth }) {
        console.debug(`Inferring type: ${path} (depth: ${depth})`);
        for (const [fn, sampleObj] of fixDuplicatesMap.entries()) {
            if (obj instanceof fn) {
                obj = sampleObj;
            }
        }
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        let type = objectTypeMap.get(obj) ?? '';
        if (type) {
            return type;
        }
        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                type = inferArrayItemType({
                    arr: obj,
                    path,
                    depth
                }) + '[]';
            }
            else if (Object.getPrototypeOf(obj) === Map.prototype) {
                const map = obj;
                const keysType = inferArrayItemType({
                    arr: Array.from(map.keys()),
                    path: `Array.from(${path}.keys())`,
                    depth
                });
                const valuesType = inferArrayItemType({
                    arr: Array.from(map.values()),
                    path: `Array.from(${path}.values())`,
                    depth
                });
                type = `Map<${keysType}, ${valuesType}>`;
            }
            else if (Object.getPrototypeOf(obj) === Set.prototype) {
                const itemsType = inferArrayItemType({
                    arr: Array.from(obj),
                    path: `Array.from(${path}.keys())`,
                    depth
                });
                type = `Set<${itemsType}>`;
            }
            else {
                type = inferObjectType({
                    obj,
                    path,
                    depth
                });
            }
        }
        else if (typeof obj === 'function') {
            type = inferFunctionSignature({
                fn: obj,
                path,
                inArray,
                depth
            });
        }
        else {
            return typeof obj;
        }
        if (type !== DEPTH_LIMIT_REACHED_TYPE_NAME) {
            objectTypeMap.set(obj, type);
            if (hasAdditionalKeys(obj)) {
                const objType = inferObjectType({
                    obj: functionObjectMap.get(obj) ?? {},
                    path,
                    depth
                });
                type = `${type} & ${objType}`;
                objectTypeMap.set(obj, type);
            }
        }
        return type;
    }
    function inferArrayItemType({ arr, path, depth }) {
        console.debug(`Inferring array type: ${path} (depth: ${depth})`);
        if (arr.length === 0) {
            return 'unknown';
        }
        const arrayTypes = new Set(arr.map((item, index) => inferType({
            obj: item,
            inArray: true,
            path: `${path}[${index}]`,
            depth
        })));
        const typesString = Array.from(arrayTypes).join(' | ');
        return arrayTypes.size > 1 ? `(${typesString})` : typesString;
    }
    function inferObjectType({ obj, path, depth }) {
        console.debug(`Inferring object type: ${path} (depth: ${depth})`);
        const proto = Object.getPrototypeOf(obj);
        let builtInType = builtInPrototypeNameMap.get(obj) ?? '';
        if (builtInType) {
            return builtInType;
        }
        builtInType = builtInPrototypeNameMap.get(proto) ?? '';
        if (builtInType && builtInType !== 'Object') {
            return builtInType;
        }
        if (depth > maxDepth) {
            return DEPTH_LIMIT_REACHED_TYPE_NAME;
        }
        const prefix = obsidianPrototypeNameMap.get(obj) ?? obsidianPrototypeNameMap.get(proto) ?? 'Type';
        const type = `${prefix}${customTypes.nextCounter()}`;
        objectTypeMap.set(obj, type);
        const typeOfProto = inferType({
            obj: proto,
            inArray: false,
            path: `${path}.__proto__`,
            depth: depth + 1
        });
        const objectFieldsStr = sortedEntries(obj)
            .map(([key, value]) => {
            let formattedKey = isValidIdentifier(key) ? key : `'${key}'`;
            const inferredType = inferType({
                obj: value,
                inArray: hasAdditionalKeys(value),
                path: isValidIdentifier(key) ? `${path}.${formattedKey}` : `${path}[${formattedKey}]`,
                depth: depth + 1
            });
            if (formattedKey === 'constructor') {
                formattedKey += type;
            }
            if (typeof value === 'undefined') {
                return `    ${formattedKey}?: unknown;`;
            }
            else if (typeof value === 'function' && !hasAdditionalKeys(value)) {
                return `    ${formattedKey}${inferredType};`;
            }
            else {
                return `    ${formattedKey}: ${inferredType};`;
            }
        })
            .join('\n');
        if (objectFieldsStr) {
            const extendsStr = typeOfProto === 'Object' || typeOfProto === 'null' ? '' : ` extends ${typeOfProto}`;
            const definition = `${extendsStr} {\n${objectFieldsStr}\n}`;
            const typeWithSameDefinition = customTypes.getByDefinition(definition);
            if (typeWithSameDefinition) {
                return typeWithSameDefinition;
            }
            customTypes.set({
                type,
                definition
            });
            return type;
        }
        else {
            objectTypeMap.set(obj, typeOfProto);
            return typeOfProto;
        }
    }
    function inferFunctionSignature({ fn, path, inArray, depth }) {
        console.debug(`Inferring function type: ${path} (depth: ${depth})`);
        const fnStr = fn.toString();
        const paramList = Array(fn.length).fill(0).map((_, i) => `arg${i + 1}: unknown`).join(', ');
        const isAsync = fnStr.includes('(this,void 0,') || fnStr.includes('await ');
        const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
        return inArray ? `((${paramList}) => ${returnType})` : `(${paramList}): ${returnType}`;
    }
    function isValidIdentifier(key) {
        return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
    }
    function hasAdditionalKeys(obj) {
        return typeof obj !== 'object' && obj !== null && obj !== undefined && Object.keys(obj).length > 0;
    }
    return main();
}
