function generateTypes(obj: unknown): string {
    const builtInPrototypeNameMap = new Map<object, string>();
    const obsidianPrototypeNameMap = new Map<object, string>();

    function main(): string {
        init();
        const customTypes: string[] = [];
        const rootType = inferType(obj, customTypes);
        return `declare const root: ${rootType};\n\n` + customTypes.join('\n\n');
    }

    function init(): void {
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

        for (const key of Object.getOwnPropertyNames(window).filter((key) =>
            key.match(/HTML.+Element/)
        )) {
            const htmlElementClass = (window as unknown as Record<string, unknown>)[key] as Function;
            builtInPrototypeNameMap.set(htmlElementClass.prototype, key);
        }
    }

    function sortedEntries(obj: object): [string, unknown][] {
        return entriesSafe(obj).sort(([key1, value1], [key2, value2]) => (Number(typeof value1 === 'function') - Number(typeof value2 === 'function')) || key1.localeCompare(key2));
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

    function inferType(
        obj: unknown,
        customTypes: string[],
        inArray = false,
        path = 'root',
        objectTypeMap = new Map<object, string>()
    ): string {
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
                type = inferArrayType(obj, customTypes, path, objectTypeMap);
            } else {
                type = inferObjectType(obj, customTypes, path, objectTypeMap);
            }
        } else if (typeof obj === 'function') {
            type = inferFunctionSignature(obj, path, inArray);
        } else {
            return typeof obj;
        }

        objectTypeMap.set(obj, type);
        return type;
    }

    function inferArrayType(arr: unknown[], customTypes: string[], path: string, objectTypeMap: Map<object, string>): string {
        if (arr.length === 0) {
            return 'unknown[]';
        }
        const arrayTypes = new Set(arr.map((item, index) => inferType(item, customTypes, true, `${path}[${index}]`, objectTypeMap)));
        const typesString = Array.from(arrayTypes).join(' | ');
        return arrayTypes.size > 1 ? `(${typesString})[]` : `${typesString}[]`;
    }

    function inferObjectType(obj: object, customTypes: string[], path: string, objectTypeMap: Map<object, string>): string {
        const builtInType = builtInPrototypeNameMap.get(obj) ?? '';
        if (builtInType) {
            return builtInType;
        }

        const proto = Object.getPrototypeOf(obj);

        const prefix = obsidianPrototypeNameMap.get(obj) ?? obsidianPrototypeNameMap.get(proto) ?? 'Type';
        const type = `${prefix}${customTypes.length}`;
        objectTypeMap.set(obj, type);
        const newTypeIndex = customTypes.length
        customTypes.push('TODO');
        const typeOfProto = inferType(proto, customTypes, false, `${path}.__proto__`, objectTypeMap);

        const objectFieldsStr = sortedEntries(obj)
            .map(([key, value]) => {
                const formattedKey = isValidIdentifier(key) ? key : `'${key}'`;
                const nextPath = isValidIdentifier(key) ? `${path}.${formattedKey}` : `${path}[${formattedKey}]`;
                const inferredType = inferType(
                    value,
                    customTypes,
                    false,
                    nextPath,
                    objectTypeMap
                );

                if (typeof value === 'undefined') {
                    return `    ${formattedKey}?: unknown;`;
                } else if (typeof value === 'function') {
                    return `    ${formattedKey}${inferredType};`;
                } else {
                    return `    ${formattedKey}: ${inferredType};`;
                }
            })
            .join('\n');

        if (objectFieldsStr) {
            const extendsStr = typeOfProto === 'Object' ? '' : ` extends ${typeOfProto}`;
            const str = `// ${path}\ninterface ${type}${extendsStr} {\n${objectFieldsStr}\n}`;
            customTypes[newTypeIndex] = str;
            return type;
        } else {
            objectTypeMap.set(obj, typeOfProto);
            customTypes.splice(newTypeIndex, 1)
            return typeOfProto;
        }
    }

    function inferFunctionSignature(fn: Function, path = 'root', inArray = false): string {
        console.debug(`Inferring function at path: ${path}`);
        const fnStr = fn.toString();
        const paramsMatch = fnStr.match(/\(([^)]*)\)/);
        const params = paramsMatch
            ? (paramsMatch[1] ?? '')
                .split(',')
                .map((p) => p.trim())
                .filter(Boolean)
            : [];

        const paramList =
            params.length > 0
                ? params.map((param) => param.startsWith('...') ? `${param}: unknown[]` : `${param}: unknown`).join(', ')
                : '';

        const isAsync = fnStr.includes(' v(this,void 0,') || fnStr.includes('await ');
        const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
        return inArray ? `(${paramList}) => ${returnType}` : `(${paramList}): ${returnType}`;
    }

    function isValidIdentifier(key: string): boolean {
        return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
    }

    return main();
}
