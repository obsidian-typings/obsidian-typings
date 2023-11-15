This mini-repository contains TypeScript typings for undocumented [Obsidian](https://obsidian.md/) API functions.
You can add the code as a submodule to your project - or as an NPM package via `npm install --save-dev https://github.com/Fevol/obsidian-typings`.

If you prefer to have automatic types discovery without needing to explicitly `import` current package, use `npm install --save-dev @types/obsidian-typings@https://github.com/Fevol/obsidian-typings`

These typings contain _almost_ all of the undocumented API methods and variables, excluding those that 
seem to be intended solely for internal use and will not be relevant for plugin development.

Please be aware that there is a good reason why the functions and types defined here are not included with the official
API definitions:
- The methods are not fully defined, and will be changed or removed in the near-future
- There is a high risk of the code behaving unexpectedly if used improperly
- The function was never meant to be used

So, please use the functions and variables provided with caution. Be prepared to update your code if the API changes,
and only use the functions if you are confident that you understand what they do. Reference the [official API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) 
first to see if your problem may be solved with a documented function, or search
in the #plugin-dev channel of the Obsidian Discord server.

Furthermore, there is a very high chance that I made a mistake in the typings, despite my best efforts.
All the types had to be deduced from either context, manually running the function, or the minified app code. 
You will have to verify if the code behaves as expected, both with regard to the expected types, as well as what 
the function description says.

With all the scary disclaimers out of the way, hopefully these typings will help in removing 90% of the `@ts-ignore`s
you have in your codebase, or let you discover solutions that didn't seem possible before.

PR's and issue reports are welcome for missing, deprecated or incorrectly defined typings.
