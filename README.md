# pluggable-babel-eslint ![](https://flat.badgen.net/travis/g-plane/pluggable-babel-eslint) ![](https://flat.badgen.net/npm/v/pluggable-babel-eslint) ![](https://flat.badgen.net/npm/dm/pluggable-babel-eslint)

As we know, Babel is a parser which contains a plugin system. However, the [babel-eslint](https://github.com/babel/babel-eslint) doesn't let us customize which plugins can be loaded.

This module is NOT a fork of babel-eslint. It just provides some patches to `babel-eslint` and `@babel/parser` (aka. Babylon).

## Why?

Since Babel 7, the Babel parser can parse TypeScript code via enabling a Babel internal plugin `typescript`. But, as we said above, in `babel-eslint`, we can't enable that plugin. Using this module as an ESLint parser, we can let our TypeScript code be parsed in ESLint.

So why not use [typescript-eslint-parser](https://github.com/eslint/typescript-eslint-parser) directly? We tried it, but we found that there are some issues like it can't work well with an internal rule of ESLint `indent`. On the other hand, `babel-eslint` has been widely used by many projects and there are no obvious issues.

## How can I use it?

Install it first:

Using Yarn:

```
yarn add --dev pluggable-babel-eslint
```

Using npm:

```
npm i -D pluggable-babel-eslint
```

Then, configure your `.eslintrc`:

```json
{
  "parser": "pluggable-babel-eslint"
}
```

The parser options can be customized in `parserOptions` in `.eslintrc` file. All the options of `babel-eslint` are available and same as here, because `pluggable-babel-eslint` just provides some patches.

And there some options only available in `pluggable-babel-eslint`:

- `plugins`: This is an array which indicates which plugins of Babel will be enabled. Note that you don't need to enable the plugins for experimental ECMAScript features (such as dynamic import, big int, etc). You can add item `typescript` to tell Babel to parse TypeScript code, and the `flow` plugin will be disabled automatically.
- `excludePlugins`: This is an array which indicates which plugins of Babel will be disabled. One possible use case is that you may not want to use one or more experimental ECMAScript features accidentally in your project. And, if you are going to use angle-bracket-style type assertion in TypeScript, you can disable the `jsx` plugin by adding an item `jsx`. For TypeScript users, you don't need to disable `flow` plugin here.

Here is the configuration example (as an `.eslintrc` file):

```json
{
  "parser": "pluggable-babel-eslint",
  "parserOptions": {
    "plugins": ["typescript"],
    "excludePlugins": ["bigInt"]
  }
}
```

For the users of `vue-eslint-parser`, you should put the `parser` field into the `parserOptions` field.

## Are there any known issues?

Because of the limitation of Babel itself, not all TypeScript code can be parsed (such as `namespace`). And some rules of [eslint-plugin-typescript](https://github.com/nzakas/eslint-plugin-typescript) can't work.

- `typescript/no-namespace`: Babel doesn't support TypeScript's namesapce.
- `typescript/prefer-namespace-keyword`: Babel doesn't support TypeScript's namesapce.

Note that other rules which haven't been listed above also may not work well, so be cautious. And any contributions are welcome.

## How it works?

This module is not a fork of `babel-eslint` and it just hacks the module `@babel/parser` and `babel-eslint`.

This module will import `@babel/parser` first by calling `require()`. Once it is loaded, we just make a wrapper for the `parse` function of `@babel/parser`. Because the module system of Node.js will cache the loaded modules, so the next time, when any other modules like `babel-eslint` or JavaScript code imports `@babel/parser` by calling `require()`, they will get the wrapped version of `@babel/parser`. Through the wrapper, we can customize the plugins of Babel.

We also make some similar wrappers for `babel-eslint`. These wrappers are used to detect plugins enabled by users, decide which plugins should be enabled for `@babel/parser` and modify the AST for compatibility of `eslint-plugin-typescript`.

## License

MIT License (c) 2018-present Pig Fang
