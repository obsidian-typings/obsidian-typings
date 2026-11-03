import type { PDFWorker } from 'obsidian-typings';

declare const workerConstructor: typeof PDFWorker;
declare const port: Worker;

const defaultWorker: PDFWorker = workerConstructor.create();
const portWorker: PDFWorker = workerConstructor.create({ port });
const legacyWorker: PDFWorker = workerConstructor.fromPort({ port });
const workerSource: string = workerConstructor.workerSrc;
const hasLegacyGetter: 'getWorkerSrc' extends keyof typeof PDFWorker ? true : false = false;

void defaultWorker;
void portWorker;
void legacyWorker;
void workerSource;
void hasLegacyGetter;
