function generateTypes(obj: unknown, inferKnownRootType?: false): string {
    const funcToTypeNameMap = new Map<Function, string>();

    function main(): string {
        init();
        const repeatedMap = new Map<object, string>();
        detectRepeatedReferences(obj, new WeakSet(), repeatedMap);
        const type = inferType(obj, new WeakSet(), repeatedMap);
        return `declare var root: ${type};`;
    }

    function init(): void {
        if (funcToTypeNameMap.size > 0) {
            return;
        }

        const obsidian = window.require('obsidian');

        for (const [key, value] of allEntries(obsidian)) {
            if (typeof value === 'function') {
                funcToTypeNameMap.set(value, key);
            }
        }

        funcToTypeNameMap.set(window.constructor, 'Window');
        funcToTypeNameMap.set(document.constructor, 'Document');
        funcToTypeNameMap.set(Promise, 'Promise<unknown>');

        for (const key of Object.getOwnPropertyNames(window).filter((key) =>
            key.match(/HTML.+Element/)
        )) {
            const element = (window as unknown as Record<string, unknown>)[key] as Function;
            funcToTypeNameMap.set(element, key);
        }
    }

    function allEntries(obj: object): [string, unknown][] {
        const record = obj as Record<string, unknown>;
        const entries: [string, unknown][] = [];
        for (const key in record) {
            if (key === 'constructor') {
                continue;
            }
            entries.push([key, record[key]]);
        }

        return entries.sort(([key1, value1], [key2, value2]) => (Number(typeof value1 === 'function') - Number(typeof value2 === 'function')) || key1.localeCompare(key2));
    }

    function getKnownTypeName(obj: unknown): string | undefined {
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        return funcToTypeNameMap.get(obj?.constructor);
    }

    function detectRepeatedReferences(
        obj: unknown,
        visited = new WeakSet(),
        repeatedMap = new Map<object, string>(),
        path = 'root'
    ): void {
        console.debug(`Detecting path: ${path}`);

        if ((getKnownTypeName(obj) && (path !== 'root' || !inferKnownRootType)) || obj === null) {
            return;
        }

        if (typeof obj === 'object') {
            if (visited.has(obj)) {
                if (!repeatedMap.has(obj)) {
                    const referenceName = `RepeatedReference${repeatedMap.size}`;
                    repeatedMap.set(obj, referenceName);
                }
                return;
            }

            visited.add(obj);

            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                    detectRepeatedReferences(
                        obj[i],
                        visited,
                        repeatedMap,
                        `${path}[${i}]`
                    );
                }
            } else {
                for (const [key, value] of allEntries(obj)) {
                    detectRepeatedReferences(
                        value,
                        visited,
                        repeatedMap,
                        `${path}.${key}`
                    );
                }
            }
        }
    }

    function inferType(
        obj: unknown,
        visited = new WeakSet(),
        repeatedMap = new Map<object, string>(),
        depth = 0,
        inArray = false,
        path = 'root'
    ): string {
        console.debug(`Inferring path: ${path}`);
        const indent = '  '.repeat(depth);
        const nestedIndent = '  '.repeat(depth + 1);

        const knownTypeName = getKnownTypeName(obj);
        if (knownTypeName && (path !== 'root' || !inferKnownRootType)) {
            return knownTypeName;
        }

        if (obj === null) {
            return 'null';
        }

        if (typeof obj === 'object') {
            if (visited.has(obj)) {
                const repeatedReferenceName =
                    repeatedMap.get(obj) ?? 'RepeatedReferenceUnknown';
                return `'${repeatedReferenceName}' /* TODO */`;
            }

            visited.add(obj);

            if (Array.isArray(obj)) {
                if (obj.length === 0) {
                    return 'unknown[]';
                }
                const arrayTypes = new Set(
                    obj.map((item, index) =>
                        inferType(
                            item,
                            visited,
                            repeatedMap,
                            depth + 1,
                            true,
                            `${path}[${index}]`
                        )
                    )
                );
                const typesString = Array.from(arrayTypes).join(' | ');
                return `(${typesString})[]`;
            } else {
                const objectFields = allEntries(obj)
                    .map(([key, value]) => {
                        const formattedKey = isValidIdentifier(key) ? key : `'${key}'`;
                        const inferredType = inferType(
                            value,
                            visited,
                            repeatedMap,
                            depth + 1,
                            false,
                            `${path}.${key}`
                        );

                        if (typeof value === 'function') {
                            return `${nestedIndent}${formattedKey}${inferredType}`;
                        } else {
                            return `${nestedIndent}${formattedKey}: ${inferredType}`;
                        }
                    })
                    .join(';\n');

                const repeatedReferenceComment = repeatedMap.has(obj)
                    ? ` /* original ${repeatedMap.get(obj)} */`
                    : '';
                return `{\n${objectFields}\n${indent}}${repeatedReferenceComment}`;
            }
        } else if (typeof obj === 'function') {
            return inferFunctionSignature(obj, path, inArray);
        } else {
            return typeof obj;
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

        const isAsync = fnStr.includes(' v(this,void 0,');
        const returnType = isAsync ? 'Promise<unknown>' : 'unknown';
        return inArray ? `(${paramList}) => ${returnType}` : `(${paramList}): ${returnType}`;
    }

    function isValidIdentifier(key: string): boolean {
        return /^[A-Za-z_$][A-Za-z_$0-9]*$/.test(key);
    }

    return main();
}
