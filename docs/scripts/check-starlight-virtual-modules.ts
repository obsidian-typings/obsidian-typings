/**
 * @file
 *
 * Gate for `src/starlight-virtual-modules.d.ts`, the local declarations of the `virtual:starlight/*` modules
 * the three Starlight component overrides in `src/components/` import.
 *
 * Those declarations exist because Starlight 0.42 restructured the package into `dist/` and stopped shipping
 * `virtual.d.ts` and `virtual-internal.d.ts`, which used to type these modules for consumers; nothing under
 * `dist/` declares them, and the integration's own `injectTypes` call covers plugin translations alone.
 * Until then `tsconfig.json` loaded Starlight's own file out of `node_modules`, deliberately, so that an
 * upgrade moving it would fail the gate rather than leave a hand-copy stale in silence. It did fail, which
 * is the only reason the file is local now - so the property it bought has to be bought again some other
 * way, and this is that way.
 *
 * Half of it comes free. Every type in the declarations is REFERENCED from a public entry point rather than
 * copied - `StarlightConfig` from `@astrojs/starlight/types`, the component from the `./components/*`
 * subpath, `AstroConfig` and `ImageMetadata` from `astro` - so a rename or removal upstream is a
 * `npm run typecheck` failure here. What a type reference cannot see is the other half: a virtual module
 * being RENAMED or DROPPED leaves every referenced type intact and the declaration valid, and the first
 * report would be a Vite resolution failure in the Pages build, which needs ~21 GB and is not run casually.
 *
 * So this asserts, against the installed Starlight rather than against a remembered shape:
 *
 * 1. **Every declared specifier is one the plugin still serves.** The plugin builds its module table in
 *    `dist/integrations/vite-virtual-modules.js`; the non-component ids are string literals in it, while the
 *    component ones are interpolated per override (`virtual:starlight/components/${name}`), so those are
 *    asserted through the prefix plus the component file the declaration's type reference names.
 * 2. **The declared set is exactly the imported set.** A specifier imported but not declared is already a
 *    `ts(2307)`; one declared but imported nowhere is dead weight that outlives the override it was written
 *    for, and nothing else would ever say so.
 * 3. **Starlight is still not shipping the declarations itself.** The day it does, this file and the
 *    declarations it guards should both be deleted rather than maintained alongside them.
 * 4. **Every relative path into Starlight's package folder still resolves.** Not a virtual module, but the
 *    same failure with the same cause: `src/pages/sidebar.astro` imports `style/props.css` by relative path
 *    because the `exports` map publishes only `style/markdown.css`, so nothing resolves that path for it.
 *    0.42's move into `dist/` broke it, and the entire report was a 500 on the one page that is an iframe
 *    -- the typecheck was green and the home page rendered. It is checked here because it is found the same
 *    way and fixed in the same breath, and a second script for one import would just be one more thing to
 *    remember to run.
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync
} from 'node:fs';
import { join } from 'node:path/posix';
import process from 'node:process';

import {
  getRootFolder,
  toPosixPath
} from './helpers/root.ts';

/**
 * How the plugin names a component override's module: `virtual:starlight/components/${name}`.
 */
const COMPONENT_PREFIX = 'virtual:starlight/components/';

const DECLARATIONS_PATH = 'src/starlight-virtual-modules.d.ts';

/**
 * Every folder whose files may import a virtual module. `scripts/` runs in Node and never can.
 */
const IMPORT_SOURCE_FOLDERS = ['src'];

/**
 * Where the plugin builds the table of module ids it serves.
 */
const PLUGIN_SOURCE_PATH = 'node_modules/@astrojs/starlight/dist/integrations/vite-virtual-modules.js';

/*
 * The two files Starlight shipped at its package root up to 0.41.x. Their return means the local
 * declarations are redundant, not merely unnecessary - `virtual.d.ts` is pulled into a consumer's program by
 * Starlight's own triple-slash references, so a duplicate declaration of the same module would then be an
 * error rather than a no-op.
 */
const UPSTREAM_DECLARATION_PATHS = [
  'node_modules/@astrojs/starlight/virtual.d.ts',
  'node_modules/@astrojs/starlight/virtual-internal.d.ts'
];

const DECLARE_MODULE_PATTERN = /declare module '(?<specifier>virtual:starlight\/[\w/-]+)'/g;
const SPECIFIER_PATTERN = /virtual:starlight\/[\w/-]+/g;

/*
 * A relative reach into Starlight's package folder, as `src/pages/sidebar.astro` makes for `style/props.css`.
 * Anchored on the package folder rather than on the leading `../`, so it matches from any depth under `src/`.
 */
const PACKAGE_RELATIVE_PATH_PATTERN = /node_modules\/@astrojs\/starlight\/[\w./-]+/g;

/*
 * Every path above is written package-relative, so a message can quote it as the reader would type it.
 * `ROOT` is what makes them real, and reading it from the nearest `package.json` ancestor rather than from
 * `process.cwd()` keeps the check independent of where it was launched.
 */
const ROOT = getRootFolder() ?? toPosixPath(process.cwd());

const failures: string[] = [];

function assertPackageRelativePathsResolve(): void {
  for (const folder of IMPORT_SOURCE_FOLDERS) {
    for (const path of walk(folder)) {
      if (!isSourceFile(path)) {
        continue;
      }
      for (const match of readFileSync(fromRoot(path), 'utf-8').matchAll(PACKAGE_RELATIVE_PATH_PATTERN)) {
        const reached = match[0];
        if (!existsSync(fromRoot(reached))) {
          fail(`\`${path}\` reaches into \`${reached}\`, which does not exist. Starlight has moved it; nothing resolves a relative path into a package folder, so this is reported by nothing else until the page that imports it 500s.`);
        }
      }
    }
  }
}

function assertSetsMatch(declared: Set<string>, imported: Set<string>): void {
  for (const specifier of declared) {
    if (!imported.has(specifier)) {
      fail(`\`${specifier}\` is declared in \`${DECLARATIONS_PATH}\` but imported nowhere under \`src/\`. Delete the declaration with the override that used it.`);
    }
  }
  for (const specifier of imported) {
    if (!declared.has(specifier)) {
      fail(`\`${specifier}\` is imported under \`src/\` but not declared in \`${DECLARATIONS_PATH}\`, so it is typed by nothing.`);
    }
  }
}

function assertUpstreamStillServes(declared: Set<string>): void {
  if (!existsSync(fromRoot(PLUGIN_SOURCE_PATH))) {
    fail(`\`${PLUGIN_SOURCE_PATH}\` does not exist, so nothing here could be checked. Starlight has moved its virtual-module plugin; re-derive the specifiers from wherever it builds them now.`);
    return;
  }

  const pluginSource = readFileSync(fromRoot(PLUGIN_SOURCE_PATH), 'utf-8');

  for (const specifier of declared) {
    if (!specifier.startsWith(COMPONENT_PREFIX)) {
      if (!pluginSource.includes(`"${specifier}"`) && !pluginSource.includes(`'${specifier}'`)) {
        fail(`\`${specifier}\` is declared in \`${DECLARATIONS_PATH}\` but \`${PLUGIN_SOURCE_PATH}\` no longer serves a module by that name. The declaration still type-checks and the build will fail to resolve it.`);
      }
      continue;
    }

    if (!pluginSource.includes(COMPONENT_PREFIX)) {
      fail(`\`${PLUGIN_SOURCE_PATH}\` no longer builds component modules under \`${COMPONENT_PREFIX}\`, so \`${specifier}\` cannot resolve.`);
      continue;
    }

    const componentName = specifier.slice(COMPONENT_PREFIX.length);
    const componentPath = `node_modules/@astrojs/starlight/dist/components/${componentName}.astro`;
    if (!existsSync(fromRoot(componentPath))) {
      fail(`\`${specifier}\` is declared in \`${DECLARATIONS_PATH}\` but \`${componentPath}\` does not exist, so there is no component left to override.`);
    }
  }
}

function assertUpstreamStillWithholdsDeclarations(): void {
  for (const path of UPSTREAM_DECLARATION_PATHS) {
    if (existsSync(fromRoot(path))) {
      fail(`Starlight ships \`${path}\` again. Delete \`${DECLARATIONS_PATH}\` and this check, and load that file from \`tsconfig.json\`'s \`files\` instead - the local declarations would now duplicate it.`);
    }
  }
}

function fail(message: string): void {
  failures.push(message);
}

function fromRoot(path: string): string {
  return join(ROOT, path);
}

function isSourceFile(path: string): boolean {
  return path.endsWith('.astro') || path.endsWith('.ts');
}

function main(): void {
  const declared = readDeclaredSpecifiers();

  if (declared.size === 0) {
    fail(`\`${DECLARATIONS_PATH}\` declares no \`virtual:starlight/*\` module. Either it was emptied, or this check's pattern no longer matches how it declares them.`);
  }

  assertSetsMatch(declared, readImportedSpecifiers());
  assertUpstreamStillServes(declared);
  assertUpstreamStillWithholdsDeclarations();
  assertPackageRelativePathsResolve();

  if (failures.length > 0) {
    console.error(`check:starlight-virtual-modules found ${String(failures.length)} problem(s):`);
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`check:starlight-virtual-modules passed (${String(declared.size)} module(s)).`);
}

function readDeclaredSpecifiers(): Set<string> {
  const source = readFileSync(fromRoot(DECLARATIONS_PATH), 'utf-8');
  const specifiers = new Set<string>();
  for (const match of source.matchAll(DECLARE_MODULE_PATTERN)) {
    const specifier = match.groups?.['specifier'];
    if (specifier) {
      specifiers.add(specifier);
    }
  }
  return specifiers;
}

function readImportedSpecifiers(): Set<string> {
  const specifiers = new Set<string>();
  for (const folder of IMPORT_SOURCE_FOLDERS) {
    for (const path of walk(folder)) {
      if (path === DECLARATIONS_PATH || !isSourceFile(path)) {
        continue;
      }
      for (const match of readFileSync(fromRoot(path), 'utf-8').matchAll(SPECIFIER_PATTERN)) {
        specifiers.add(match[0]);
      }
    }
  }
  return specifiers;
}

/**
 * Yields package-relative paths, so a caller can both read them and name them in a message.
 */
function* walk(folder: string): Generator<string> {
  for (const entry of readdirSync(fromRoot(folder))) {
    const path = toPosixPath(join(folder, entry));
    if (statSync(fromRoot(path)).isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

main();
