---
permSlug: '@hawapi/js-sdk'
title: '@hawapi/js-sdk'
description: 'HawAPI SDK for JavaScript/TypeScript designed to simplify the integration with the API.'
git: 'https://github.com/HawAPI/js-sdk'
url: 'https://npmjs.com/package/@hawapi/js-sdk'
tags:
  - 'Typescript'
  - 'API'
  - 'SDK'
  - 'HawAPI'
codeLanguage: 'Typescript'
language: 'en'
icon: 'simple-icons:typescript'
category: 'Project'
target:
  - 'Web'
  - 'SDK'
  - 'Library'
color: '#691313'
status: 'active'
isVisible: false
isIndexable: false
---

[HawAPI](/projects/hawapi/) SDK for **JavaScript/TypeScript** designed to simplify the integration with the **API**.

## Usage

### Installation

````codeset tabs=create-hawapi-client
```bash label=npm showLineNumbers=false
npm install @hawapi/js-sdk
```
:-:
```bash label=yarn showLineNumbers=false
yarn add @hawapi/js-sdk
```
:-:
```html label=cdn showLineNumbers=true
<script src="https://cdn.jsdelivr.net/npm/@hawapi/js-sdk/dist/index.umd.min.js"></script>
```
````

### Importing and Requesting

```ts
import { createClient } from '@hawapi/js-sdk';

const client = createClient();
const result = client
  .getAll('actors')
  .then((data) => data)
  .catch((err) => console.error(err));

console.log('HawAPI actors: ', result);
```

### Links

- [Website](https://npmjs.com/package/@hawapi/js-sdk)
- [Docs (TypeDoc)](https://hawapi.github.io/js-sdk/v1/)
- [API Docs](https://hawapi.theproject.id/docs/)
- [GitHub](https://github.com/HawAPI/js-sdk/)
