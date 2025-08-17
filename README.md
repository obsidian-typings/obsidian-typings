<center>

# Obsidian Extended Typings

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
 <a href="https://fevol.github.io/obsidian-typings">WEBSITE</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/obsidian-typings/resources/obsidian-typings-changelog">CHANGELOG</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://www.npmjs.com/package/obsidian-typings">NPM</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/obsidian-typings/contributing">CONTRIBUTING</a>

</h4>
</div>

---

This repository contains TypeScript typings for undocumented [Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) methods and variables, including additional descriptions and example uses.

Be aware that the typings currently only cover a subset of the full API: while most of the `App` interface and its sub-interfaces are covered, this package does not yet provide typings for views like `Graph`, `Canvas`, ... — contributions for these would be very welcome!

## Git branching

[Obsidian](https://obsidian.md) version comes in two channels:

- `Stable` - versions available for everyone.
- [`Catalyst`](https://help.obsidian.md/catalyst) - `beta` versions, available by subscription. It has early access to the newest features.

In `obsidian-typings` team we aim to provide typings for latest `stable` and latest `catalyst` builds. The support for older versions will be limited.

We keep typings for each `Obsidian` version in its own branch: `release/obsidian-stable/*` and `release/obsidian-catalyst/*`.

- Branch with the latest **stable** release typings: [`release/obsidian-stable/1.8.10`](https://github.com/Fevol/obsidian-typings/tree/release/obsidian-stable/1.8.10)
- Branch with the latest **catalyst** release typings: [`release/obsidian-catalyst/1.9.9`](https://github.com/Fevol/obsidian-typings/tree/release/obsidian-catalyst/1.9.9)

## Set-up

1. **Installation**

    - `npm install --save-dev obsidian-typings`
      - Installs package for the latest `stable` release.
      - Needed for most plugin developers.
      - Might not work properly for older versions matching `minAppVersion` in `manifest.json` of your plugin. In this case, you might need to use specific version. See below.
    - `npm install --save-dev obsidian-typings@obsidian-stable-latest`
      - Same as above, just explicit.
    - `npm install --save-dev obsidian-typings@obsidian-catalyst-latest`
      - Installs package for the latest `catalyst` release
      - Usually such plugin are published via `beta` plugin releases.
      - Might not work properly for older versions matching `minAppVersion` in `manifest.json` of your plugin. In this case, you might need to use specific version. See below.
    - `npm install --save-dev obsidian-typings@obsidian-stable-1.8.10`
      - Installs package for the specific `stable` release
      - Usually it has to match `minAppVersion` in `manifest.json` of your plugin.
    - `npm install --save-dev obsidian-typings@obsidian-catalyst-1.9.9`
      - Installs package for the specific `catalyst` release
      - Usually it has to match `minAppVersion` in `manifest.json` of your plugin.

2. **Add `obsidian-typings` to `types` in `tsconfig.json`** (_recommended_) <span id="add-types-setting-to-tsconfig-json"></span>

    If you want to have all overridden types of `obsidian-typings` available in your project without explicit imports, add the following to your `tsconfig.json`:

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
> If you added the `types` field to your `tsconfig.json`, and `@types/some-package-name` does not get recognized anymore, you may need to re-add it to `types`:
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

3. **Explicit type importing**

   If you prefer not to add `obsidian-typings` to your `types`, you can also add `import 'obsidian-typings';` to any project file.

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

Additional interfaces added by this package (which do not exist in the official API), can be imported using:

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

(The list of all available implementations can be found in the [implementations](https://github.com/Fevol/obsidian-typings/tree/main/src/obsidian/implementations) folder.)

### Extend with your own typings

If you need to extend the typings provided by this package, add the following to any `.d.ts` file in your project:

```ts
export {}; // This is a very essential line. If you don't have any other top-level `import/export` statements, those typings will work not as expected.
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

Please use the functions and variables provided with caution. Be prepared to update your code if the API changes, and only use the functions if you are confident that you understand what they will do. Reference the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) first to see if your problem may be solved with a documented function, or search in the #plugin-dev channel of the Obsidian Discord server. Some functions will also contain `@remark` TSDoc tags that provide alternatives or better solutions.

Furthermore, there is a very high chance that there are mistakes in the typings, despite best efforts. All types had to be deduced from either context, manually running the function, or from the minified app code. You _**should**_ verify that the code behaves as expected, both with regard to the expected (input/output)types, as well as what the function description promises.

With these scary disclaimers out of the way, hopefully these typings will help you in removing 90% of the `@ts-ignore`s you have in your codebase, or discover solutions that didn't seem possible before.

## Tags

- `@remark` tags give some warnings about the inputs/outputs of the function, or provide better alternatives.
- `@tutorial` gives additional information on how to use the function in your plugin.
- `@official` comes from the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).
- `@unofficial` comes from reverse-engineering.

## Migration

If you were using a `1.x.x` version of this package, you may need to follow the [Migration guide](https://github.com/Fevol/obsidian-typings/blob/main/MIGRATION.md) after updating to `2.0.0` or newer.


## Contributing

Feel free to start typing any part of the Obsidian API that is not yet typed, or fixing/adding additional descriptions to existing typings. If you are unsure about anything, don't hesitate to open an issue.

A brief tutorial is available on how you can get started with adding new typings, or fixing existing ones, see: [CONTRIBUTING.md](https://github.com/Fevol/obsidian-typings/blob/main/CONTRIBUTING.md).
