---
image: 'https://astro.build/og/social.jpg'
publishedAt: '2023-10-14 18:00 UTC'
title: 'How to hash class names in Astro using astro-rename integration'
description: 'Learn how to use the astro-rename integration to hash all CSS class names from your Astro project'
tags:
  - 'astro'
  - 'integration'
  - 'postcss'
  - 'css'
category: 'How to'
language: 'en'
shortlink: '/b/pNCgOiQi'
isVisible: true
enableComments: true
---

## Table of Contents

## Introduction

In this post you'll learn how to use the [astro-rename](https://github.com/RodrigoTomeES/astro-rename) astro integration to hash all CSS class names from your astro project.

## What is astro-rename

The package **astro-rename** is an [Astro](https://astro.build) integration that uses [postcss-rename](https://github.com/google/postcss-rename) to rename all CSS class names. This integration will also rename all JS/HTML files.

By default the **postcss-rename** only supports `none`, `debug` and `minimal` strategies.
So, we'll use the `strategy` option with a custom hash generator.

## Create a new Astro project

Let's get started creating a new Astro project:

```bash
# create a new project with npm
npm create astro@latest

# create a new project with pnpm
pnpm create astro@latest

# create a new project with yarn
yarn create astro
```

All you have to do is follow the step-by-step instructions.

### Running the Astro project

Once you have created your Astro project, you can start the dev server using:

```bash
# run dev server with npm
npm run dev

# run dev server with pnpm
pnpm run dev

# run dev server with yarn
yarn run dev
```

Now, the Astro project is running on localhost using the default port `:4321`:

```bash
http://localhost:4321
```

![Astro default template running on localhost](https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/pNCgOiQi/astro-rename-example-default-project.png)

Let's take a look at the DevTools from this default project:

![Devtools from default Astro project](https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/pNCgOiQi/devtools-from-default-astro-project.png)

As you can see, all CSS class names are "exposed".

## Installing dependencies

First of all, let's install the [astro-rename](https://github.com/RodrigoTomeES/astro-rename) dependency:

```bash
# install 'astro-rename' dependency with npm
npm install astro-rename --save-dev

# install 'astro-rename' dependency with pnpm
pnpm install astro-rename --dev

# install 'astro-rename' dependency with yarn
yarn add astro-rename --dev
```

!!!note The **astro-rename** package require `node >= 18.18`. You don't actually need this version and can use the `--ignore-engines` flag to bypass this error.

### Set up astro integration

After installing the package, let's import and include the integration:

Import dependency:

```js title="astro.config.mjs"
import rename from 'astro-rename';
```

Add to integrations option:

```js title="astro.config.mjs" {3, 7-8}
import { defineConfig } from 'astro/config';

import rename from 'astro-rename';
// import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    rename(),
    // compress()
  ],
});
```

!!!warning The integration will only work when **output** is set to **static**

!!!tip If you are using other integration like [astro-compress](https://github.com/astro-community/AstroCompress), include the **astro-rename** before this integration

### Testing with default options

At this point, you already can build the project using:

```bash
# run build with npm
npm run build

# run build with pnpm
pnpm run build

# run build with yarn
yarn run build
```

Now, run the output file using the [VSCode Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and take a look at the DevTools:

![Devtools from default astro-rename strategy](https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/pNCgOiQi/devtools-from-default-astro-rename-strategy.png)

Note that all class names have been **replaced with letters**, by default the integration will use the minimal[^minimal-strategy] strategy.

[^minimal-strategy]: Use the shortest possible names, in order of appearance: the first class is renamed to .a, the second to .b, and so on.

The next step is to create our custom hash generator.

## Generating hash names

We can take a look at the [minimal renamer](https://github.com/google/postcss-rename/blob/master/src/minimal-renamer.ts) method from **postcss-rename** plugin and uses as template for creating our custom hash generator.

First, create a new file named `hash-renamer.ts`, with a `HashRenamer` class:

```ts title="src/lib/hash-renamer.ts"
/**
 * Creates a new hash generator class.
 */
export default class HashRenamer {
  /** The max size of the generated hash name */
  private maxSize = 8;

  /** A map from original CSS names to their renamed equivalents. */
  renames = new Map<string, string>();

  /** A lists containing all hashed names */
  values: string[] = [];

  rename(key: string): string {
    let value = this.renames.get(key);

    // The key will be invalid when a hashed name is used as key
    const isInvalid = this.values.includes(key);

    if (isInvalid) return key;
    if (value) return value;

    value = getHash(this.maxSize);

    this.renames.set(key, value);
    this.values.push(value);

    return value;
  }
}
```

- The `maxSize` will define the max length of the hashed name;
- The `renames` will hold our old and new class names;
- The `values` will hold **ONLY** the new class names;

!!!note{no-context} The **postcss-rename** plugin will not keep the files context so, if the output has multiple CSS files, it will rename all renamed class names. That's the reason we use the `values` array to validate if some **hashed name is used as key**. \
\
See more: [Support multiple CSS files](https://github.com/google/postcss-rename/issues/63)

### Hash method

Now, let's create the `getHash` method. This function will loop from `0` to `maxSize` and take a random letter from `CHARS` constant.

```ts title="src/lib/hash-renamer.ts" {1, 3-16}
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

/**
 * Generate a hash name
 * @param maxSize The max size of hash
 * @returns A string with the hash name
 */
function getHash(maxSize: number): string {
  let result = '';

  for (let i = 0; i < maxSize; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return result;
}

/**
 * Creates a new hash generator class.
 */
export default class HashRenamer {
  /** The max size of the generated hash name */
  private maxSize = 8;

  /** A map from original CSS names to their renamed equivalents. */
  renames = new Map<string, string>();

  /** A lists containing all hashed names */
  values: string[] = [];

  rename(key: string): string {
    let value = this.renames.get(key);

    // The key will be invalid when a hashed name is used as key
    const isInvalid = this.values.includes(key);

    if (isInvalid) return key;
    if (value) return value;

    value = getHash(this.maxSize);

    this.renames.set(key, value);
    this.values.push(value);

    return value;
  }
}
```

## Set up custom strategy

Open the `astro.config.cjs` file and add the custom strategy:

```js title="astro.config.mjs" {5, 7, 13-17}
import { defineConfig } from 'astro/config';

import rename from 'astro-rename';

import HashRenamer from './src/lib/hash-renamer';

const renamer = new HashRenamer();

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    rename({
      rename: {
        strategy: (key) => renamer.rename(key),
      },
    }),
  ],
});
```

!!!warning When using this custom strategy, the **prefix** option from **astro-rename** will not work properly. \
\
See [my hash-renamer.ts file](https://github.com/LucJosin/lucasjosino.com/tree/main/src/lib/hash-renamer.ts) to understand how i implemented CSS prefix on this website.

### Testing with custom strategy option

Build the project:

```bash
# run build with npm
npm run build

# run build with pnpm
pnpm run build

# run build with yarn
yarn run build
```

Run the output file using the [VSCode Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and take a look at the DevTools:

![Devtools from custom astro-rename strategy](https://raw.githubusercontent.com/lucjosin/lucasjosino.com/main/public/static/blog/pNCgOiQi/devtools-from-custom-astro-rename-strategy.png)

All class names have been replaced with hash names.

!!!note Two notes before using this astro-rename integration: \
\
1 - **Avoid** naming your classes with html tags. E.g: body, title, link, img, etc... \
2 - **Avoid** repeating class names on differents pages/components. \
\
Using any method above will replace and/or confuse the replacement of the names since the plugin don't save the [CSS context](#no-context)

## Conclusion

There you have it. A quick and simple integration to hash all CSS class names from your final Astro website.

Here's the final project repository:

!!!ref:repo LucJosin/astro-rename-example

## Resources and References

- [github.com/astro-rename](https://github.com/RodrigoTomeES/astro-rename)
- [github.com/postcss-rename](https://github.com/google/postcss-rename)
- [docs.astro.build/getting-started](https://docs.astro.build/en/getting-started/)
- [github.com/astro-rename-example](https://github.com/LucJosin/astro-rename-example)
