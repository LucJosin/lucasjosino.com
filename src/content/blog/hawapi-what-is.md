---
permSlug: 'hawapi-explore-the-world-of-stranger-things-using-this-api'
title: 'HawAPI: Explore the world of Stranger Things using this API'
description: "Let's explore the HawAPI - a Free and Open Source API for Stranger Things. Learn how to use it to access characters, episodes, locations, and more!"
image:
  src: 'https://repository-images.githubusercontent.com/566830817/1ee86716-d27f-4703-a003-977eca9aee8b'
  position: 'center'
  showInPost: true
tags:
  - 'api'
  - 'java'
  - 'what-is'
  - 'showcase'
  - 'i18n'
category: 'Showcase'
language: 'en'
shortlink: '/b/zBLtyQby'
isVisible: true
enableComments: true
color: '#691313'
publishedAt: '2024-11-06 17:00 UTC-3'
---

## Summary

## Introduction

While learning about Backend development with **Java** and **Spring Boot** I've decided to create a simple, but no so simpler, project.
The main idea was to create an API like [PokeAPI - The RESTful Pokémon API](https://pokeapi.co/) and [SWAPI - The Star Wars API](https://swapi.dev/).

In the time, the fourth season of Stranger Things was released and i couldn't find a good API about the series. I had a few key features to the project:

1. Be Open Source
2. Support multi languages
3. A Good filter support

## What is HawAPI

HawAPI is a **Free** and [Open Source](https://github.com/HawAPI/) API designed for [Stranger Things](https://www.netflix.com/title/80057281) TV show. It provides various information related to the show including actors, characters, episodes, games, locations and seasons through a **RESTful API** that allow users to access data about the series.

> All this information is available through a RESTful API implemented with Java (Spring Boot) + PostgreSQL and served via JSON and allows developers to create desktop, web and mobile applications using this data very easy - [HawAPI/docs](https://hawapi.theproject.id/docs/)

!!!note The **HawAPI** name comes from: \
\
\- **Haw**: Referring to **Hawkins**, the fictional rural town featured in **Stranger Things**. \
\- **API**: An abbreviation for **Application Programming Interface**.

### Internationalization (i18n)

First of all, the support of multiple languages was the MUST-HAVE feature of the project.

The current release of HawAPI only supports English (en-US) and Portuguese (pt-BR). Soon, after release of **1.3.0**, it will also support French (fr-BR) and Spanish (es-ES).

| Scope       | en-US | pt-BR |   fr-FR   |   es-ES   |
| :---------- | :---: | :---: | :-------: | :-------: |
| Actors      |  --   |  --   |    --     |    --     |
| Characters  |  --   |  --   |    --     |    --     |
| Episodes    |  Yes  |  Yes  | **Soon!** | **Soon!** |
| Games       |  Yes  |  Yes  | **Soon!** | **Soon!** |
| Locations   |  Yes  |  Yes  | **Soon!** | **Soon!** |
| Seasons     |  Yes  |  Yes  | **Soon!** | **Soon!** |
| Soundtracks |  --   |  --   |    --     |    --     |

Response examples

- [/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661?language=en-US](https://hawapi.theproject.id/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661?language=en-US)
- [/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661?language=pt-BR](https://hawapi.theproject.id/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661?language=pt-BR)

````codeset tabs=json-example
```json label=English ins={8-10}
{
    "uuid": "bce28964-fcfa-4a8c-9df0-413d4648d661",
    "href": "/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661",
    "sources": [
        "https://www.netflix.com/title/80057281"
    ],
    "thumbnail": "https://s6.imgcdn.dev/xtSpy.jpg",
    "title": "The Bathtub",
    "description": "Eleven struggles to reach Will, while Lucas warns that \"the bad men are coming.\" Nancy and Jonathan show the police what Jonathan caught on camera.",
    "language": "en-US",
    "duration": 2580000,
    "season": "/api/v1/seasons/3b980ad3-aef8-4663-a7a9-64cb4979500a",
    "created_at": "2023-07-23T20:19:29.908",
    "updated_at": "2023-07-23T20:19:29.908",
    "episode_num": 7,
    "next_episode": "/api/v1/episodes/cf90565d-c906-4e2c-a992-b190b5d117f8",
    "prev_episode": "/api/v1/episodes/b664d023-2f2e-4d11-8af7-00d21bd565dd"
}
```
:-:
```json label=Portuguese ins={8-10}
{
    "uuid": "bce28964-fcfa-4a8c-9df0-413d4648d661",
    "href": "/api/v1/episodes/bce28964-fcfa-4a8c-9df0-413d4648d661",
    "sources": [
        "https://www.netflix.com/title/80057281"
    ],
    "thumbnail": "https://s6.imgcdn.dev/xtSpy.jpg",
    "title": "A banheira",
    "description": "Onze tenta chegar a Will, mas Lucas dá o alerta de perigo. Nancy e Jonathan mostram à polícia as imagens capturadas pela câmera.",
    "language": "pt-BR",
    "duration": 2580000,
    "season": "/api/v1/seasons/3b980ad3-aef8-4663-a7a9-64cb4979500a",
    "created_at": "2023-07-23T20:19:29.908",
    "updated_at": "2023-07-23T20:19:29.908",
    "episode_num": 7,
    "next_episode": "/api/v1/episodes/cf90565d-c906-4e2c-a992-b190b5d117f8",
    "prev_episode": "/api/v1/episodes/b664d023-2f2e-4d11-8af7-00d21bd565dd"
}
```
````

!!!info By default English (en-US) will be used.

### Filters

Second, the ability to search/filter the data from API was essential for the project, but i wanted more than a simple search endpoint.

The base of the HawAPI search:

| Field    | Example                  | Default | Options                                                |
| :------- | :----------------------- | :------ | :----------------------------------------------------- |
| sort     | [..]?sort=first_name,ASC | —       | field, ASC or DESC                                     |
| page     | [..]?page=1              | 1       | 1..X                                                   |
| size     | [..]?size=12             | 10      | 1..20                                                  |
| language | [..]?language=en-US      | en-US   | [I18N](https://hawapi.theproject.id/docs/guides/i18n/) |

Now, let's see the complex HawAPI search where the request can be modified using the **modificaton symbols**.

| Modification         |   Type(s)    | Symbol |
| :------------------- | :----------: | :----: |
| LIKE                 |      \*      |   \*   |
| NOT_LIKE             |      \*      |  !\*   |
| BETWEEN              | Number, Date |   ::   |
| NOT_IN               |      \*      |   !:   |
| IN                   |      \*      |   :    |
| GREATER_OR_EQUALS_TO | Number, Date |   >=   |
| LESS_OR_EQUALS_TO    | Number, Date |   <=   |
| GREATER_THAN         | Number, Date |   >    |
| LESS_THAN            | Number, Date |   <    |
| NOT_EQUALS           |      \*      |   !    |
| EQUALS               |      \*      |        |

With this power, we can create robust and complex API searches like:

> All characters with **last name `like` Wheeler**, **gender `equals to` 1** and **birth date `greater or equals to` 1967-01-01**
>
> - [/api/v1/characters?**last_name=\*Wheeler&gender=1&birth_date=>=1967-01-01**](https://hawapi.theproject.id/api/v1/characters?last_name=*Wheeler&gender=1&birth_date=>=1967-01-01)

## How to use the API with JavaScript

In this section we'll see how to fetch information from **HawAPI** using both [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) API and the [@hawapi/js-sdk](https://npmjs.com/package/@hawapi/js-sdk) package:

### Fetch API

Here's how to use with the native **Fetch API**:

1. Using **then/catch**:

```js title="index.js"
fetch('https://hawapi.theproject.id/api/v1/characters/')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error));
```

2. Using **async/await**:

```js title="index.js"
async function fetchAndLogCharacters() {
  try {
    const response = await fetch(
      'https://hawapi.theproject.id/api/v1/characters/'
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndLogCharacters();
```

### HawAPI SDK

We can use the **HawaPI JavaScript SDK** to make the code better:

1. Install the SDK:

````codeset tabs=run-add
```bash label=npm showLineNumbers=false
npm install @hawapi/js-sdk
```
:-:
```bash label=yarn showLineNumbers=false
yarn add @hawapi/js-sdk
```
````

2. Create the instance and Make Requests:

```ts title="index.ts"
import { EpisodeModel, createClient } from '@hawapi/js-sdk';
// const { EpisodeModel, createClient } = require('@hawapi/js-sdk');

const client = createClient();

async function fetchAndLogCharacters() {
  const res = await client.getRandom<EpisodeModel>('episodes');
  console.log(res);
}

fetchAndLogCharacters();
```

!!!note This SDK can also be used in the browser with the \<script\> tag. \
See more in [HawAPI/js-sdk#examples/web](https://github.com/HawAPI/js-sdk/tree/main/examples/web)

## Hawbrary

The **Hawbrary** is a "library" to showcase all information provided from the HawAPI project, built with React (NextJs) + Typescript, hosted in GitHub Pages and using the official [@hawapi/js-sdk](https://npmjs.com/package/@hawapi/js-sdk).

[remark_slider showArrows=true showImageInde=true]
![Hawbrary - Image 3](/static/projects/hawbrary/hawbrary-3.png)
![Hawbrary - Image 1](/static/projects/hawbrary/hawbrary-1.png)
![Hawbrary - Image 2](/static/projects/hawbrary/hawbrary-2.png)
[/remark_slider]

See the live demo of [Hawbrary](https://hawbrary.theproject.id/) and the [GitHub repository](https://github.com/LucJosin/hawbrary)

## Conclusion

In this post we explore the history and features of the HawAPI project, including the Hawbrary project.

If you find the API useful, give the **GitHub repository** a star and take advantage of **#StrangerThingsDay** to create a new project!

!!!ref:repo HawAPI/HawAPI

## Resources and References

- https://github.com/HawAPI/
- https://hawapi.theproject.id
  - https://hawapi.theproject.id/docs/
  - https://hawapi.theproject.id/try-it/
- https://hawbrary.theproject.id
  - https://hawbrary.theproject.id/explorer/
