<center>

# Obsidian Typings

</center>

---

<div align="center">
    <a href="https://www.npmjs.com/package/obsidian-typings" style="text-decoration: none">
        <img alt="NPM downloads" src="https://img.shields.io/npm/v/obsidian-typings?color=red&label=Version%3A&logo=npm&logoColor=white&labelColor=red">
    </a>
    <a href="https://www.npmjs.com/package/obsidian-typings" style="text-decoration: none">
        <img alt="NPM downloads" src="https://img.shields.io/npm/dw/obsidian-typings?style=flat&label=Downloads">
    </a>
    <a href="https://github.com/Fevol/obsidian-typings/stargazers" style="text-decoration: none">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/fevol/obsidian-typings?color=yellow&label=Stargazers%3A&logo=OpenTelemetry&logoColor=yellow">
    </a><br>
    <a href="https://www.typescriptlang.org/" style="text-decoration: none">
        <img alt="Typescript" src="https://img.shields.io/badge/-Typescript-3178C6?logo=Typescript&logoColor=white&style=flat&">
    </a>
</div>

---

<div align="center">
<h4>
 <a href="https://fevol.github.io/obsidian-typings">DOCS</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/obsidian-typings/resources/obsidian-typings-changelog">CHANGELOG</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://www.npmjs.com/package/obsidian-typings">NPM</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/obsidian-typings/contributing">CONTRIBUTING</a>

</h4>
</div>

---


**Obsidian Typings** provides **TypeScript definitions** for Obsidian’s **undocumented and internal APIs**.

It extends the official [Obsidian API](https://github.com/obsidianmd/obsidian-api/) with:
- Additional type definitions for internal methods, properties, and plugins.
- Explanations and usage examples to make undocumented parts easier to understand.
- Helper utilities and interfaces for working with Obsidian’s internals in a safer, type-safe way.

This package is designed for plugin developers who want to access Obsidian's internal APIs in a type-safe manner,
while also keeping their code maintainable and less reliant on `@ts-ignore`'s.


### ⚠️ Important Notes
- This package is **not affiliated with, or endorsed by, the Obsidian team**.
- It does **not** cover every aspect of the Obsidian API.
- Typings are based on reverse engineering and may be **inaccurate or unstable**. They can change without notice in future releases.
- Always **test thoroughly** and **add fallbacks** when using internal APIs.

## Git branching

[Obsidian](https://obsidian.md) has two main release channels:

- `public` - stable versions available to all users.
- [`catalyst`](https://help.obsidian.md/catalyst)/`beta` - versions only available to users with a catalyst license, has early access to new features.

Since the internal API can be changed between these channels, and your plugin may need to support users on both channels, this package provides typings for both.


As the internal API can change between these two channels, this package also exposes typings for both channels for convenience.

Typings for each `Obsidian` version are kept in their own branches: namely `release/obsidian-public/*` and `release/obsidian-catalyst/*`:
- Latest **public** release: [`release/obsidian-public/1.8.10`](https://github.com/Fevol/obsidian-typings/tree/release/obsidian-public/1.8.10)
- Latest **catalyst** release: [`release/obsidian-catalyst/1.9.9`](https://github.com/Fevol/obsidian-typings/tree/release/obsidian-catalyst/1.9.9)

Older versions of the package are available, but support for them is limited.
For most cases, we recommend using the latest release.


## Set-up

1. **Install via npm**

    - Latest public release (recommended):
      - `npm install --save-dev obsidian-typings`
    - Explictly install latest **public** release:
      - `npm install --save-dev obsidian-typings@obsidian-public-latest`
    - Install the latest **catalyst** release (beta):
      - `npm install --save-dev obsidian-typings@obsidian-catalyst-latest`
    - Install a specific release (should match `minAppVersion` in your plugin’s `manifest.json`):
      - `npm install --save-dev obsidian-typings@obsidian-public-1.8.10`
      - `npm install --save-dev obsidian-typings@obsidian-catalyst-1.9.9`

2. Enable in tsconfig.json (recommended) <span id="add-types-setting-to-tsconfig-json"></span>
Add `obsidian-typings` to the `types` array of your `tsconfig.json` to make all extended typings available globally without explicit importing them:

    ```json
    {
        "compilerOptions": {
            "...": "...",
            "types": [
                "obsidian-typings"
            ]
        }
    }
    ```

> [!WARNING]
>
> If other `@types/*` packages stop being recognized after adding `obsidian-typings` to the `types`, you may need to re-add them to the `types` list.
> ```json
> {
>     "compilerOptions": {
>         "...": "...",
>         "types": [
>             "obsidian-typings",
>             "some-package-name"
>         ]
>     }
> }

3. **Importing explicitly** (alternative)

   Instead of adding `obsidian-typings` to your `types`, you can also import the package directly:

    ```ts
   import 'obsidian-typings';
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

### `obsidian-typings` additional interfaces

Additional interfaces added by this package (which do not exist in the official API), can be imported as:

```ts
import type { InternalPlugins } from 'obsidian-typings';

const internalPlugins: InternalPlugins = this.app.internalPlugins;
```

### `obsidian-typings/implementations`

Additional helper functions/types/... added by this package can be used by importing from `obsidian-typings/implementations`:

```ts
import { InternalPluginName } from 'obsidian-typings/implementations';

this.app.internalPlugins.getEnabledPluginById(InternalPluginName.FileExplorer);
```

(The list of all available implementations can be found in the implementations folder.)

### Extend with your own typings

If you need to extend the typings provided by this package, add the following to any `.d.ts` file in your project:

```ts
export {}; // This line is required. If you there aren't top-level `import/export` statements, your typings will work not as expected.
declare module 'obsidian-typings' {
    interface PluginsPluginsRecord {
        myPlugin: MyPlugin;
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

-   The methods are not fully defined, and will be changed or removed in the near-future
-   There is a high risk of the code behaving unexpectedly if used improperly
-   The function was never meant to be used

Please use the functions and variables provided by this package with caution.
Be prepared to update your code if the API changes, and only use the functions if you are confident that you understand what they will do.
Reference the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) first to see if your problem may be solved with a documented function, or search in the `#plugin-dev` channel of the Obsidian Discord server.
Some functions will also contain `@remark` TSDoc tags that provide alternatives or better solutions.

Furthermore, there is a very high chance that there are mistakes in the typings, despite best efforts.
All types had to be deduced from context, manually running the function, or from the minified app code.
Always verify that your code behaves as expected, both in terms of types and runtime behavior.

With these scary disclaimers out of the way, hopefully these typings will help you in removing 90% of the `@ts-ignore`s you have in your codebase, or discover solutions that didn't seem possible before.

## Tags

- `@remark` warnings, caveats, or suggested alternatives.
- `@tutorial` extra guidance and examples.
- `@official` comes from the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).
- `@unofficial` based on reverse engineering.

## Migration

If you were using a `1.x.x` version of this package, see the [Migration guide](https://github.com/Fevol/obsidian-typings/blob/main/MIGRATION.md) for upgrading to `2.0.0` or newer.


## Contributing

Feel free to start typing any part of the Obsidian API that is not yet typed, or fixing/adding additional descriptions to existing typings. If you are unsure about anything, don't hesitate to open an issue.

A brief tutorial is available on how you can get started with adding new typings, or fixing existing ones, see: [CONTRIBUTING.md](https://github.com/Fevol/obsidian-typings/blob/main/CONTRIBUTING.md).
