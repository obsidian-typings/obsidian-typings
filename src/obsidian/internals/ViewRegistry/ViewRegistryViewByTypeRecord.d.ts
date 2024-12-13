import type {
    ViewCreator,
} from 'obsidian';

/** @public */
export interface ViewRegistryViewByTypeRecord extends Record<string, ViewCreator> {}
