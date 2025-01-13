import type { TFile } from 'obsidian';
import type { PromiseWithResolvers } from '../PromiseWithResolvers.ts';
import type { Runnable } from '../Runnable.js';
import type { QueueItems } from './QueueItems.js';

/** @public */
export interface LinkResolverQueue {
    items: QueueItems<TFile | null>;
    promise: PromiseWithResolvers<TFile | null> | null;
    runnable: Runnable;

    add(item: TFile | null): void;
    addList(items: TFile[]): void;
    cancel(): void;
    clear(): void;
    generator(): AsyncGenerator<TFile | null>;
    notify(): void;
    remove(file: TFile): void;
}
