
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
 <a href="https://github.com/Fevol/obsidian-typings/blob/main/CHANGELOG.md">CHANGELOG</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://www.npmjs.com/package/obsidian-typings">NPM</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://github.com/Fevol/obsidian-typings/blob/main/CONTRIBUTING.md">CONTRIBUTING</a>

</h4>
</div>


---


This repository contains TypeScript typings for undocumented [Obsidian](https://obsidian.md/) API functions and variables and additional descriptions, 
essentially extending the official [Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).

Be aware that the typings currently only cover a subset of all methods: most of the `App` interface and its sub-interfaces
are covered, but typings for views like `Graph`, `Canvas`, ... are still missing -- contributions for these would be very welcome!

## Installation

There are three options for installing this package:
1. **Explicit type importing** <br> Each typing has to be imported explicitly from `obsidian-typings` instead of `obsidian`, e.g. `import {App, MarkdownView} from "obsidian-typings"`. <br> _Install via:_ `npm install --save-dev  obsidian-typings`

2. **Automatic type extending** (recommended) <br> The typings are automatically added to the existing `obsidian` module, so you can use them without any changes to your code. <br> _Install via:_ `npm install --save-dev @types/obsidian-typings@npm:obsidian-typings`.

3. **Add extended typings as submodule** <br> Your IDE will likely pick up the typings automatically when the project is added as a submodule for your plugin, this also makes it simpler to test and submit features to the repository. <br> _Install via:_ `git submodule add https://github.com/Fevol/obsidian-typings.git typings` (or any other folder)


> [!WARNING]
> If your IDE or TS compiler is not able to pick up the types from `obsidian-typings` but they were installed properly, you will need to adapt your `tsconfig.json` as follows:
> ```json
> {
>     "compilerOptions": {
>         ...
>         "types": [
>             "obsidian-typings"
>         ]
>     }
> }
> ```
> (Add `"obsidian-typings"` to the `types` array for `compilerOptions`)

## Disclaimer

> [!WARNING]
> Make sure to read below section in detail before using these typings.

Please be aware that there is a good reason why (some of) the functions and types defined here are not included with the official API definitions:
- The methods are not fully defined, and will be changed or removed in the near-future
- There is a high risk of the code behaving unexpectedly if used improperly
- The function was never meant to be used

Please use the functions and variables provided with caution. Be prepared to update your code if the API changes,
and only use the functions if you are confident that you understand what they will do. Reference the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) 
first to see if your problem may be solved with a documented function, or search
in the #plugin-dev channel of the Obsidian Discord server. Some functions will also contain `@remark` TSDoc tags that provide
alternatives or better solutions.

Methods marked `@internal` are especially risky to use: these are either not fully typed yet, or are solely intended
to be used internally by the Obsidian app.

Furthermore, there is a very high chance that there are mistakes in the typings, despite best efforts.
All types had to be deduced from either context, manually running the function, or from the minified app code. 
You _**should**_ verify that the code behaves as expected, both with regard to the expected (input/output)types, as well as what 
the function description promises.

With these scary disclaimers out of the way, hopefully these typings will help you in removing 90% of the `@ts-ignore`s
you have in your codebase, or discover solutions that didn't seem possible before.


> [!NOTE] 
> **TL;DR:** Use at your own risk, verify that the code behaves as expected, and be prepared to update your code if the API changes.
> 
> `@internal` methods are especially risky to use.
> 
> `@remark` tags give some warnings about the inputs/outputs of the function, or provide better alternatives.
> 
> `@tutorial` gives additional information on how to use the function in your plugin.


## Contributing

Feel free to start typing any part of the Obsidian API that is not yet typed, or fixing/adding additional descriptions to existing typings.
If you are unsure about anything, don't hesitate to open an issue.

A brief tutorial is available on how you can get started with adding new typings, or fixing existing ones, see: [CONTRIBUTING.md](CONTRIBUTING.md).
