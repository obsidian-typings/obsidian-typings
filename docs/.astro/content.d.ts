declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			components: import('astro').MDXInstance<{}>['components'];
			Content: import('astro').MDXContent;
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export interface RenderedContent {
		html: string;
		metadata?: {
			[key: string]: unknown;
			imagePaths: string[];
		};
	}
	export interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}

	interface Render {
		'.md': Promise<RenderResult>;
	}
}

declare module 'astro:content' {
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type CollectionKey = keyof AnyEntryMap;
	export type ContentCollectionKey = keyof ContentEntryMap;

	export type ContentConfig = typeof import('./../src/content/config.js');
	export type DataCollectionKey = keyof DataEntryMap;

	export interface ReferenceContentEntry<
		C extends keyof ContentEntryMap,
		E extends ({} & string) | ValidContentEntrySlug<C> = string
	> {
		collection: C;
		slug: E;
	}
	export interface ReferenceDataEntry<
		C extends CollectionKey,
		E extends keyof DataEntryMap[C] = string
	> {
		collection: C;
		id: E;
	}

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	interface ContentEntryMap {

	}

	interface DataEntryMap {
		docs: Record<string, {
  body?: string;
  collection: 'docs';
  data: InferEntrySchema<'docs'>;
  filePath?: string;
  id: string;
  rendered?: RenderedContent;
}>;

	}

	type Flatten<T> = T extends Record<string, infer U> ? U : never;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];
	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;
	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: ReferenceContentEntry<C, ValidContentEntrySlug<C>>[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: ReferenceDataEntry<C, keyof DataEntryMap[C]>[]
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ({} & string) | ValidContentEntrySlug<C>
	>(
		entry: ReferenceContentEntry<C, E>
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends ({} & string) | keyof DataEntryMap[C]
	>(
		entry: ReferenceDataEntry<C, E>
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ({} & string) | ValidContentEntrySlug<C>
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends ({} & string) | keyof DataEntryMap[C]
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? string extends keyof DataEntryMap[C]
			? Promise<DataEntryMap[C][E]> | undefined
			: Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ({} & string) | ValidContentEntrySlug<C>
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? ReferenceContentEntry<C, ValidContentEntrySlug<C>>
			: ReferenceDataEntry<C, keyof DataEntryMap[C]>
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// If `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string]
	): Promise<RenderResult>;
}
