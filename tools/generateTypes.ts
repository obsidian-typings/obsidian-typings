function generateTypes(obj: unknown, maxDepth = 1): string {
    if (maxDepth === 0) {
        maxDepth = Number.MAX_SAFE_INTEGER;
    }

    const builtInPrototypeNameMap = new Map<object, string>();
    const obsidianPrototypeNameMap = new Map<object, string>();
    const DEPTH_LIMIT_REACHED_TYPE_NAME = 'DepthLimitReached';

    function main(): string {
        init();
        const customTypes = new CustomTypes();
        inferType({
            obj,
            customTypes,
            inArray: false,
            path: 'root',
            objectTypeMap: new Map<object, string>(),
            depth: 1
        });
        return customTypes.toString();
    }

    interface CustomTypesEntry {
        path: string;
        definition: string;
        depth: number;
    }

    class CustomTypes {
        private counter = 0;
        private typeEntryMap = new Map<string, CustomTypesEntry>();
        private definitionTypeMap = new Map<string, string>();

        public nextCounter() {
            this.counter++;
            return this.counter;
        }

        public toString(): string {
            return Array.from(this.typeEntryMap.entries())
                .sort(([_1, entry1], [_2, entry2]) => this.compareEntries(entry1, entry2))
                .map(([type, entry]) => `// ${entry.path}\ninterface ${type}${entry.definition}`)
                .join('\n\n');
        }

        public set({
            type,
            path,
            definition,
            depth
        }: {
            type: string,
            path: string,
            definition: string,
            depth: number
        }): void {
            this.typeEntryMap.set(type, {
                path,
                definition,
                depth
            });
            this.definitionTypeMap.set(definition, type);
        }

        public update(type: string, path: string, depth: number) {
            const entry = this.typeEntryMap.get(type);
            if (!entry) {
                return;
            }

            const newEntry: CustomTypesEntry = {
                path,
                definition: entry.definition,
                depth
            };

            if (this.compareEntries(newEntry, entry) < 0) {
                this.typeEntryMap.set(type, newEntry);
            }
        }

        public getByDefinition(definition: string): string | undefined {
            return this.definitionTypeMap.get(definition);
        }

        private compareEntries(a: CustomTypesEntry, b: CustomTypesEntry): number {
            return (a.depth - b.depth) || this.toDotPath(a.path).localeCompare(this.toDotPath(b.path));
        }

        private toDotPath(path: string): string {
            return path.replace(/\['(.+?)'\]/, '.$1');
        }
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

    function inferType({
        obj,
        customTypes,
        inArray,
        path,
        objectTypeMap,
        depth
    }: {
        obj: unknown,
        customTypes: CustomTypes,
        inArray: boolean,
        path: string,
        objectTypeMap: Map<unknown, string>,
        depth: number
    }
    ): string {
        console.debug(`Inferring path: ${path}`);

        if (obj === null) {
            return 'null';
        }

        if (obj === undefined) {
            return 'undefined';
        }

        let type = objectTypeMap.get(obj) ?? '';
        if (type) {
            customTypes.update(type, path, depth);
            return type;
        }

        if (typeof obj === 'object') {
            if (Array.isArray(obj)) {
                type = inferArrayType({
                    arr: obj,
                    customTypes,
                    path,
                    objectTypeMap,
                    depth
                });
            } else {
                type = inferObjectType({
                    obj,
                    customTypes,
                    path,
                    objectTypeMap,
                    depth
                });
            }
        } else if (typeof obj === 'function') {
            type = inferFunctionSignature({
                fn: obj,
                path,
                inArray
            });
        } else {
            return typeof obj;
        }

        if (type !== DEPTH_LIMIT_REACHED_TYPE_NAME) {
            objectTypeMap.set(obj, type);

            if (hasAdditionalKeys(obj)) {
                const objType = inferObjectType({
                    obj: Object.assign({}, obj),
                    customTypes,
                    path,
                    objectTypeMap,
                    depth
                });

                type = `${type} & ${objType}`;
                objectTypeMap.set(obj, type);
            }
        }
        return type;
    }

    function inferArrayType({
        arr,
        customTypes,
        path,
        objectTypeMap,
        depth
    }: {
        arr: unknown[],
        customTypes: CustomTypes,
        path: string,
        objectTypeMap: Map<unknown, string>,
        depth: number,
    }): string {
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

    function inferObjectType({
        obj,
        customTypes,
        path,
        objectTypeMap,
        depth
    }: {
        obj: object,
        customTypes: CustomTypes,
        path: string,
        objectTypeMap: Map<unknown, string>,
        depth: number
    }): string {
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
                    inArray: hasAdditionalKeys(value),
                    path: isValidIdentifier(key) ? `${path}.${formattedKey}` : `${path}[${formattedKey}]`,
                    objectTypeMap,
                    depth: depth + 1
                });

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
            const extendsStr = typeOfProto === 'Object' ? '' : ` extends ${typeOfProto}`;
            const definition = `${extendsStr} {\n${objectFieldsStr}\n}`;
            const typeWithSameDefinition = customTypes.getByDefinition(definition);
            if (typeWithSameDefinition) {
                customTypes.update(typeWithSameDefinition, path, depth);
                return typeWithSameDefinition;
            }
            customTypes.set({
                type,
                path,
                definition,
                depth
            });
            return type;
        } else {
            objectTypeMap.set(obj, typeOfProto);
            return typeOfProto;
        }
    }

    function inferFunctionSignature({
        fn,
        path,
        inArray
    }: {
        fn: Function,
        path: string,
        inArray: boolean
    }): string {
        console.debug(`Inferring function at path: ${path}`);
        const fnStr = fn.toString();
        const paramList = Array(fn.length).fill(0).map((_, i) => `arg${i + 1}: unknown`).join(', ');
        const isAsync = fnStr.includes(' v(this,void 0,') || fnStr.includes('await ');
        const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
        return inArray ? `((${paramList}) => ${returnType})` : `(${paramList}): ${returnType}`;
    }

    function isValidIdentifier(key: string): boolean {
        return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
    }

    function hasAdditionalKeys(obj: unknown): boolean {
        return typeof obj !== 'object' && obj !== null && obj !== undefined && Object.keys(obj).length > 0;
    }

    return main();
}
