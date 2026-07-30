# Obsidian Typings

[![NPM downloads](https://img.shields.io/npm/v/obsidian-typings?color=red&label=Version%3A&logo=npm&logoColor=white&labelColor=red)](https://www.npmjs.com/package/obsidian-typings)
[![NPM downloads](https://img.shields.io/npm/dw/obsidian-typings?style=flat&label=Downloads)](https://www.npmjs.com/package/obsidian-typings)
[![GitHub Repo stars](https://img.shields.io/github/stars/obsidian-typings/obsidian-typings?color=yellow&label=Stargazers%3A&logo=OpenTelemetry&logoColor=yellow)](https://github.com/obsidian-typings/obsidian-typings/stargazers)

**Obsidian Typings** provides **TypeScript definitions** for Obsidian’s **undocumented and internal APIs**.

It extends the official [Obsidian API](https://github.com/obsidianmd/obsidian-api/) with:

- Additional type definitions for internal methods, properties, and plugins.
- Explanations and usage examples to make undocumented parts easier to understand.
- Helper utilities and interfaces for working with Obsidian’s internals in a safer, type-safe way.

This package is designed for plugin developers who want to access Obsidian's internal APIs in a type-safe manner,
while also keeping their code maintainable and less reliant on `@ts-ignore`/`@ts-expect-error`.

> [!IMPORTANT]
>
> - This package is **not affiliated with, or endorsed by, the Obsidian team**.
> - It does **not** cover every aspect of the Obsidian API.
> - Typings are based on reverse engineering and may be **inaccurate or unstable**. They can change without notice in future releases.
> - Always **test thoroughly** and **add fallbacks** when using internal APIs.

## Versioning and Release Channels

[Obsidian](https://obsidian.md) has two main release channels:

- `public` - stable versions available to all users.
- [`catalyst`](https://help.obsidian.md/catalyst) (`beta`, `early access`) - versions only available to users with a catalyst license, has early access to new features.

If you use internal APIs, you may need to support users on both channels.
The availability or behavior of some APIs can differ between versions, which may lead to bugs or errors if these changes are not accounted for in your plugin.

To make it easier to adapt to these differences, this package provides typings for both channels.

Typings for each `Obsidian` version can be found in their own git branches: namely `release/obsidian-public/*` and `release/obsidian-catalyst/*`:

- Latest `public` release: [`release/obsidian-public/1.13.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.13.4) | [![npm](https://img.shields.io/npm/v/@obsidian-typings/obsidian-public-1.13.4?logo=npm&logoColor=white&label=%40obsidian-typings%2Fobsidian-public-1.13.4)](https://www.npmjs.com/package/@obsidian-typings/obsidian-public-1.13.4) | [![npm](https://img.shields.io/npm/v/@obsidian-typings/obsidian-public-latest?logo=npm&logoColor=white&label=%40obsidian-typings%2Fobsidian-public-latest)](https://www.npmjs.com/package/@obsidian-typings/obsidian-public-latest)
- Latest `catalyst` release: [`release/obsidian-catalyst/1.13.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.13.4) | [![npm](https://img.shields.io/npm/v/@obsidian-typings/obsidian-catalyst-1.13.4?logo=npm&logoColor=white&label=%40obsidian-typings%2Fobsidian-catalyst-1.13.4)](https://www.npmjs.com/package/@obsidian-typings/obsidian-catalyst-1.13.4) | [![npm](https://img.shields.io/npm/v/@obsidian-typings/obsidian-catalyst-latest?logo=npm&logoColor=white&label=%40obsidian-typings%2Fobsidian-catalyst-latest)](https://www.npmjs.com/package/@obsidian-typings/obsidian-catalyst-latest)

Older versions of the package are available, but support for them is limited.
In most cases, we recommend to always use the latest release.

## Set-up

### 1. Install via `npm`

- Latest `public` release (recommended):
  - `npm install --save-dev @obsidian-typings/obsidian-public-latest`
- Latest `catalyst` (`beta`) release:
  - `npm install --save-dev @obsidian-typings/obsidian-catalyst-latest`
- Specific Obsidian version (should match `minAppVersion` in your plugin's `manifest.json`):
  - `npm install --save-dev @obsidian-typings/obsidian-public-1.12.7`
  - `npm install --save-dev @obsidian-typings/obsidian-catalyst-1.12.6`
- Legacy package name (alias for `@obsidian-typings/obsidian-public-latest`):
  - `npm install --save-dev obsidian-typings`

<!-- markdownlint-disable MD033 -->

### 2. Enable in `tsconfig.json` (recommended) <span id="add-types-setting-to-tsconfig-json"></span>

<!-- markdownlint-enable MD033 -->

Add the package to the `types` array of your `tsconfig.json` to make all extended typings available globally without explicit importing them:

```json
{
    "compilerOptions": {
        "...": "...",
        "types": [
            "@obsidian-typings/obsidian-public-latest"
        ]
    }
}
```

> [!WARNING]
>
> If other `@types/*` packages stop being recognized after adding the typings to the `types`, you may need to re-add them to the `types` list.
>
> ```json
> {
>     "compilerOptions": {
>         "...": "...",
>         "types": [
>             "@obsidian-typings/obsidian-public-latest",
>             "some-package-name"
>         ]
>     }
> }

### 3. Importing explicitly (alternative)

Instead of adding the package to your `types`, you can also import it directly:

```ts
import type {} from '@obsidian-typings/obsidian-public-latest';
```

## Usage

### `obsidian` module internals

To access types from the `obsidian` module, the import syntax does not change:

```ts
import type { App } from 'obsidian';

function printInternalPlugins(app: App): void {
  console.log(app.internalPlugins);
}
```

### Additional interfaces

Additional interfaces added by this package (which do not exist in the official API), can be imported as:

```ts
import type { InternalPlugins } from '@obsidian-typings/obsidian-public-latest';

function getInternalPlugins(app: App): InternalPlugins {
  return app.internalPlugins;
}
```

### Implementations

Additional helper functions/types/... added by this package can be used by importing from the `/implementations` subpath:

```ts
import { InternalPluginName } from '@obsidian-typings/obsidian-public-latest/implementations';

// If you forget the `/implementations` part:
// import { InternalPluginName } from '@obsidian-typings/obsidian-public-latest';
// You will not be able to use the runtime values and the code below will not compile.

this.app.internalPlugins.getEnabledPluginById(InternalPluginName.FileExplorer);
```

The list of all available implementations can be found in the `src/obsidian/implementations` folder in the corresponding release branch ([example for `1.9.10 public`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.9.10/src/obsidian/implementations)).

### Extend with your own typings

If you need to extend the typings provided by this package, add the following to any `.d.ts` file in your project:

```ts
export {}; // This line is required. If there are no top-level `import/export` statements, your typings will work not as expected.
declare module '@obsidian-typings/obsidian-public-latest' {
    interface PluginsPluginsRecord {
        ['my-plugin-id']: MyPlugin;
    }
}
```

## Disclaimer

> [!WARNING]
>
> Make sure to read below section in detail before using these typings.
>
> Use at your own risk, verify that the code behaves as expected, and be prepared to update your code if the API changes.

Please be aware that there is a good reason why (some of) the functions and types defined here are not included with the official API definitions:

- The methods are not fully defined, and will be changed or removed in the near-future
- There is a high risk of the code behaving unexpectedly if used improperly
- The function was never meant to be used

Please use the functions and variables provided by this package with caution.
Be prepared to update your code if the API changes, and only use the functions if you are confident that you understand what they will do.
Reference the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) first to see if your problem may be solved with a documented function, or search in the `#plugin-dev` channel of the Obsidian Discord server.
Some functions will also contain `@remark` TSDoc tags that provide alternatives or better solutions.

Furthermore, there is a very high chance that there are mistakes in the typings, despite best efforts.
All types had to be deduced from context, manually running the function, or from the minified app code.
Always verify that your code behaves as expected, both in terms of types and runtime behavior.

> [!WARNING]
>
> While the typings themselves were hand-written by the package maintainers and contributors, the majority of the `@tsdoc` documentation has been minimally completed using generative AI and may be inaccurate.

&nbsp;

> [!TIP]
>
> If you find any issues with the typings or documentation, please feel free to [open an issue](https://github.com/obsidian-typings/obsidian-typings/issues) or submit a pull request.

With these scary disclaimers out of the way, hopefully these typings will help you in removing 90% of the `@ts-ignore`/`@ts-expect-error` you have in your codebase, or discover solutions that didn't seem possible before.

## Tags

- `@remark` warnings, caveats, or suggested alternatives.
- `@tutorial` extra guidance and examples.
- `@official` comes from the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).
- `@unofficial` based on reverse engineering.

## Migration

If you were using a `1.x.x` version of this package, see the [Migration guide](https://github.com/obsidian-typings/obsidian-typings/blob/main/MIGRATION.md) for upgrading to `2.0.0` or newer.

## Contributing

Feel free to start typing any part of the Obsidian API that is not yet typed, or fixing/adding additional descriptions to existing typings. If you are unsure about anything, don't hesitate to open an issue.

A brief tutorial is available on how you can get started with adding new typings, or fixing existing ones, see: [CONTRIBUTING.md](https://github.com/obsidian-typings/obsidian-typings/blob/main/CONTRIBUTING.md).
