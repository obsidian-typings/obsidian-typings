import type { PDFWorker } from 'obsidian-typings';

declare const workerConstructor: typeof PDFWorker;
declare const port: Worker;

// Both an omitted options object and an existing port are accepted by the vendor factory.
const defaultWorker: PDFWorker = workerConstructor.create();
const namedWorker: PDFWorker = workerConstructor.create({ name: 'alpha', verbosity: 0 });
const portWorker: PDFWorker = workerConstructor.create({ port });
const legacyWorker: PDFWorker = workerConstructor.fromPort({ port });
const workerSource: string = workerConstructor.workerSrc;

// The removed method must not silently return to the published surface.
const hasLegacyGetter: 'getWorkerSrc' extends keyof typeof PDFWorker ? true : false = false;

void defaultWorker;
void namedWorker;
void portWorker;
void legacyWorker;
void workerSource;
void hasLegacyGetter;
