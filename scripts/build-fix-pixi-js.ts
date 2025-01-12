// WORKAROUND for https://github.com/pixijs/pixijs/pull/11195

import {
    readFile,
    writeFile
} from 'node:fs/promises';

const ABSTRACT_BITMAP_FONT_PATH = 'node_modules/pixi.js/lib/scene/text-bitmap/AbstractBitmapFont.d.ts';
const DISTANCE_FIELD_DEFINITION = `    distanceField?: {
        /** Type of distance field */
        type: 'sdf' | 'msdf' | 'none';
        /** Range of the distance field in pixels */
        range: number;
    }`;
const ORIGINAL_DISTANCE_FIELD_DEFINITION = `${DISTANCE_FIELD_DEFINITION};`;
const FIXED_DISTANCE_FIELD_DEFINITION = `${DISTANCE_FIELD_DEFINITION} | undefined;`;

const content = await readFile(ABSTRACT_BITMAP_FONT_PATH, 'utf-8');
const newContent = content.replace(ORIGINAL_DISTANCE_FIELD_DEFINITION, FIXED_DISTANCE_FIELD_DEFINITION);
await writeFile(ABSTRACT_BITMAP_FONT_PATH, newContent, 'utf-8');
