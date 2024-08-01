import type { CachedMetadata } from "obsidian";
import type { FileCacheEntry } from "../index.js";

export interface MetadataCacheFileCacheRecord extends Record<string, FileCacheEntry> {}
export interface MetadataCacheMetadataCacheRecord extends Record<string, CachedMetadata> {}
