/**
 * Generate types for the given object.
 *
 * @param obj - The object to generate types for.
 * @param maxDepth - The maximum depth to generate types for (default: 1).
 * @returns The generated types as a string.
 */
export function generateTypes(obj: unknown, maxDepth = 1): string {
    if (maxDepth === 0) {
        maxDepth = Number.MAX_SAFE_INTEGER;
    }
    initBuiltInPrototypeNameMap();
    initObjectPathMap(obj, maxDepth);
    inferType({
        obj,
        inArray: false,
        path: 'root',
        depth: 1,
        maxDepth
    });
    return customTypes.toString();
}

interface Entry<T = unknown> {
    obj: T;
    inArray?: boolean | undefined;
    path: string;
    depth: number;
    maxDepth: number;
}

interface PathIndex {
    path: string;
    index: number;
}

class CustomTypes {
    private counter = 0;
    private typeDefinitionMap = new Map<string, string>();
    private definitionTypeMap = new Map<string, string>();

    public nextCounter() {
        this.counter++;
        return this.counter;
    }

    public toString(): string {
        let index = 0;
        const typePathIndexMap = new Map<string, PathIndex>();

        for (const [obj, path] of objectPathDepthMap.entries()) {
            const type = objectTypeMap.get(obj);
            if (!type) {
                continue;
            }
            typePathIndexMap.set(type, { path, index });
            index++;
        }

        return Array.from(this.typeDefinitionMap.entries())
            .sort(([type1], [type2]) =>
                (typePathIndexMap.get(type1)?.index ?? 0) - (typePathIndexMap.get(type2)?.index ?? 0)
            )
            .map(([type, definition]) => `// ${typePathIndexMap.get(type)?.path ?? ''}\ninterface ${type}${definition}`)
            .join('\n\n');
    }

    public set({
        type,
        definition
    }: {
        type: string;
        definition: string;
    }): void {
        this.typeDefinitionMap.set(type, definition);
        this.definitionTypeMap.set(definition, type);
    }

    public getByDefinition(definition: string): string | undefined {
        return this.definitionTypeMap.get(definition);
    }
}

let isInitialized = false;
const builtInPrototypeNameMap = new Map<object, string>();
const obsidianPrototypeNameMap = new Map<object, string>();
const DEPTH_LIMIT_REACHED_TYPE_NAME = 'DepthLimitReached';
let customTypes = new CustomTypes();
const objectTypeMap = new Map<object, string>();
const objectPathDepthMap = new Map<object, string>();
const functionObjectMap = new Map<Function, object>();
const fixDuplicatesMap = new Map<Function, object | null>();

function initBuiltInPrototypeNameMap(): void {
    if (isInitialized) {
        customTypes = new CustomTypes();
        objectTypeMap.clear();
        objectPathDepthMap.clear();
        functionObjectMap.clear();
        return;
    }

    isInitialized = true;

    let obsidian = window.require('obsidian') as typeof import('obsidian');

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
        const htmlElementClass = (window as unknown as Record<string, unknown>)[key] as Function;
        builtInPrototypeNameMap.set(htmlElementClass.prototype, key);
    }
}

function initObjectPathMap(obj: unknown, maxDepth: number): void {
    const queue: Entry[] = [];
    queue.push({
        obj,
        path: 'root',
        depth: 1,
        maxDepth
    });

    while (queue.length > 0) {
        const entry = queue.shift();
        if (!entry) {
            continue;
        }

        const { obj, path, depth } = entry;
        console.debug(`Preprocessing: ${path} (depth: ${depth})`);

        if (depth > maxDepth + 1) {
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
                        depth: depth + 1,
                        maxDepth
                    });
                }
            } else if (Object.getPrototypeOf(obj) === Map.prototype) {
                const map = obj as Map<unknown, unknown>;
                queue.push({
                    obj: Array.from(map.keys()),
                    path: `Array.from(${path}.keys())`,
                    depth: depth + 1,
                    maxDepth
                });
                queue.push({
                    obj: Array.from(map.values()),
                    path: `Array.from(${path}.values())`,
                    depth: depth + 1,
                    maxDepth
                });
            } else if (Object.getPrototypeOf(obj) === Set.prototype) {
                queue.push({
                    obj: Array.from(obj as Set<unknown>),
                    path,
                    depth,
                    maxDepth
                });
            } else {
                queue.push({
                    obj: Object.getPrototypeOf(obj),
                    path: `${path}.__proto__`,
                    depth: depth + 1,
                    maxDepth
                });

                for (const [key, value] of sortedEntries(obj)) {
                    queue.push({
                        obj: value,
                        path: isValidIdentifier(key) ? `${path}.${key}` : `${path}['${key}']`,
                        depth: depth + 1,
                        maxDepth
                    });
                }
            }
        } else {
            if (Object.keys(obj).length > 0) {
                const mappedObj = Object.assign({}, obj);
                functionObjectMap.set(obj, mappedObj);
                queue.push({
                    obj: mappedObj,
                    path,
                    depth,
                    maxDepth
                });
            }
        }
    }
}

function sortedEntries(obj: object): [string, unknown][] {
    return entriesSafe(obj).sort(([key1, value1], [key2, value2]) =>
        (Number(typeof value1 === 'function') - Number(typeof value2 === 'function')) || key1.localeCompare(key2)
    );
}

function entriesSafe(obj: object): [string, unknown][] {
    const record = obj as Record<string, unknown>;
    return Object.getOwnPropertyNames(record).map((key) => {
        try {
            return [key, record[key]];
        } catch (e) {
            return [key, undefined];
        }
    });
}

function inferType({
    obj,
    inArray,
    path,
    depth,
    maxDepth
}: Entry): string {
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
                obj,
                path,
                depth,
                maxDepth
            }) + '[]';
        } else if (Object.getPrototypeOf(obj) === Map.prototype) {
            const map = obj as Map<unknown, unknown>;
            const keysType = inferArrayItemType({
                obj: Array.from(map.keys()),
                path: `Array.from(${path}.keys())`,
                depth,
                maxDepth
            });
            const valuesType = inferArrayItemType({
                obj: Array.from(map.values()),
                path: `Array.from(${path}.values())`,
                depth,
                maxDepth
            });
            type = `Map<${keysType}, ${valuesType}>`;
        } else if (Object.getPrototypeOf(obj) === Set.prototype) {
            const itemsType = inferArrayItemType({
                obj: Array.from(obj as Set<unknown>),
                path: `Array.from(${path}.keys())`,
                depth,
                maxDepth
            });
            type = `Set<${itemsType}>`;
        } else {
            type = inferObjectType({
                obj,
                path,
                depth,
                maxDepth
            });
        }
    } else if (typeof obj === 'function') {
        type = inferFunctionSignature({
            obj,
            path,
            inArray,
            depth,
            maxDepth
        });
    } else {
        return typeof obj;
    }

    if (type !== DEPTH_LIMIT_REACHED_TYPE_NAME + maxDepth.toString()) {
        objectTypeMap.set(obj, type);

        if (hasAdditionalKeys(obj)) {
            const objType = inferObjectType({
                obj: functionObjectMap.get(obj as Function) ?? {},
                path,
                depth,
                maxDepth
            });

            type = `${type} & ${objType}`;
            objectTypeMap.set(obj, type);
        }
    }
    return type;
}

function inferArrayItemType({
    obj: arr,
    path,
    depth,
    maxDepth
}: Entry<unknown[]>): string {
    console.debug(`Inferring array type: ${path} (depth: ${depth})`);
    if (arr.length === 0) {
        return 'unknown';
    }
    const arrayTypes = new Set(arr.map((item, index) =>
        inferType({
            obj: item,
            inArray: true,
            path: `${path}[${index}]`,
            depth,
            maxDepth
        })
    ));
    const typesString = Array.from(arrayTypes).join(' | ');
    return arrayTypes.size > 1 ? `(${typesString})` : typesString;
}

function inferObjectType({
    obj,
    path,
    depth,
    maxDepth
}: Entry<object>): string {
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
        return DEPTH_LIMIT_REACHED_TYPE_NAME + maxDepth.toString();
    }

    const prefix = obsidianPrototypeNameMap.get(obj) ?? obsidianPrototypeNameMap.get(proto) ?? 'Type';
    const type = `${prefix}${customTypes.nextCounter()}`;
    objectTypeMap.set(obj, type);
    const typeOfProto = inferType({
        obj: proto,
        inArray: false,
        path: `${path}.__proto__`,
        depth: depth + 1,
        maxDepth
    });

    const objectFieldsStr = sortedEntries(obj)
        .map(([key, value]) => {
            let formattedKey = isValidIdentifier(key) ? key : `'${key}'`;

            const inferredType = inferType({
                obj: value,
                inArray: hasAdditionalKeys(value),
                path: isValidIdentifier(key) ? `${path}.${formattedKey}` : `${path}[${formattedKey}]`,
                depth: depth + 1,
                maxDepth
            });

            if (formattedKey === 'constructor') {
                formattedKey += type;
            }

            if (typeof value === 'undefined') {
                return `    ${formattedKey}?: unknown;`;
            } else if (typeof value === 'function' && !hasAdditionalKeys(value)) {
                return `    ${formattedKey}${inferredType};`;
            } else {
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
    } else {
        objectTypeMap.set(obj, typeOfProto);
        return typeOfProto;
    }
}

function inferFunctionSignature({
    obj: fn,
    path,
    inArray,
    depth
}: Entry<Function>): string {
    console.debug(`Inferring function type: ${path} (depth: ${depth})`);
    const fnStr = fn.toString();
    const paramList = Array(fn.length).fill(0).map((_, i) => `arg${i + 1}: unknown`).join(', ');
    const isAsync = fnStr.includes('(this,void 0,') || fnStr.includes('await ');
    const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
    return inArray ? `((${paramList}) => ${returnType})` : `(${paramList}): ${returnType}`;
}

function isValidIdentifier(key: string): boolean {
    return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
}

function hasAdditionalKeys(obj: unknown): boolean {
    return typeof obj !== 'object' && obj !== null && obj !== undefined && Object.keys(obj).length > 0;
}
