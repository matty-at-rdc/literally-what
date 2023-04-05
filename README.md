# Literally What 🤨

## What is this?

This is an example of how Babel's ecosystem using loose versioning and Yarn's Lockfile can bite you in the tooshy!

## How it works

- We require `@babel/eslint-parser @ 7.19.1`
- `@babel/eslint-parser @ 7.19.1` requires `@babel/core @ >= 7.11.0`
- `@babel/core @ 7.11.0` requires `@babel/parser @ ^7.11.0`
- `@babel/eslint-parser @ 7.17.0` introduced a requirement of an identifer (`doubleAt`) only avaialble at `@babel/parser @ 7.17.0` 
- Note, that apart from my resolutions being a bit pushy (due to an _inadeqaucy_ (this isn't the __perfect__ word, but it's not ideal!) in `@babel/eslint-parser`'s package) this is fully valid and possible for a properly managed project to get into this state

## How to make it 💥 and then ✅

In the inital state run:

- `yarn install`
- `yarn eslint --config ./.eslintrc.js main.js`
- See the boom 💥

Next "try" to fix the project by:

- Removing the `resolutions` field from the _package.json_
- Removing the _node_modules_ folder `rm -rf node_modules` -- Ol' reliable
- Running another `yarn install`
- yarn eslint --config ./.eslintrc.js main.js
- Again, see the boom 💥

Next actually fix the project by:

- Bumping @babel/core by a single patch version `7.11.1`
- Running `yarn install`
- Running `yarn eslint --config ./.eslintrc.js main.js`
- See that lovely ✅

## Why does this work! Explain yourself 👊

Due to the resolutions being gone and yarn needing to re-fetch dependencies and thus reassess transitive dependencies we allow the `^` to do its unholy work and fetch for us `@babel/parser @ >= 7.17.0` which means that we are no longer comparing the template string's `undefined` `label` property (the monkey patched version doesn't have this property and it should since the objects should be similiar enough to avoid this uncertainty __imnsho__) to `@babel/parser @ < 7.17.0`'s `undefined` `doubleAt` type which means we don't the following comparsion `label === tl.doubleAt` where `label` is `undefined` and `tl.doubleAt` is `undefined` thus dropping us into the handler for an unexpected scenario wherein the default value returned is `Punctuator` for a scenario that should return `Template`.
