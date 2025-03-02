---
permSlug: 'hawapi-explore-the-world-of-stranger-things-using-this-api'
title: 'HawAPI: Explore o mundo de Stranger Things usando essa API'
description: 'Vamos explorar a HawAPI – uma API gratuita e de código aberto para Stranger Things. Aprenda a usá-la para acessar personagens, episódios, locais e muito mais!'
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
language: 'pt'
shortlink: '/pt/b/zBLtyQby'
isVisible: true
enableComments: true
color: '#691313'
publishedAt: '2024-11-06 17:00 UTC-3'
---

## Sumário

## Introdução

Enquanto aprendia sobre desenvolvimento Backend com **Java** e **Spring Boot**, decidi criar um projeto simples, mas não tão simples. A ideia principal era desenvolver uma API parecida com [PokeAPI - Uma API de Pokémon](https://pokeapi.co/) e [SWAPI - Uma API de Star Wars](https://swapi.dev/).

Na época, a quarta temporada de Stranger Things havia sido lançada, e eu não encontrei uma API interessante sobre a série. Defini algumas características essenciais para o projeto:

1. Ser Open Source
2. Suportar múltiplos idiomas
3. Ter um bom suporte a filtros

## O que é HawAPI

HawAPI é uma API **Gratuita** e [Open Source](https://github.com/HawAPI/) projetada para a série [Stranger Things](https://www.netflix.com/title/80057281). Ela oferece várias informações sobre a série, incluindo atores, personagens, episódios, jogos, localizações e temporadas, por meio de uma **API RESTful** que permite acesso a esses dados.

> Todas essas informações estão disponíveis via uma API RESTful implementada com Java (Spring Boot) + PostgreSQL e servida em JSON, facilitando a criação de aplicativos desktop, web e mobile - [HawAPI/docs](https://hawapi.theproject.id/docs/)

!!!note O nome **HawAPI** vem de: \
\
\- **Haw**: Referindo-se a **Hawkins**, a cidade rural fictícia apresentada em **Stranger Things**. \
\- **API**: Uma abreviação para **Application Programming Interface** _(Interface de Programação de Aplicações, em português)_.

### Internacionalização (i18n)

O suporte a múltiplos idiomas era uma característica fundamental do projeto desde o início.

A versão atual do projeto suporta apenas Inglês (en-US) e Português (pt-BR). Em breve, com o lançamento da versão **1.3.0**, ela também oferecerá suporte para Francês (fr-FR) e Espanhol (es-ES).

| Escopo      | en-US | pt-BR |     fr-FR     |     es-ES     |
| :---------- | :---: | :---: | :-----------: | :-----------: |
| Atores      |  --   |  --   |      --       |      --       |
| Personagens |  --   |  --   |      --       |      --       |
| Episódios   |  Sim  |  Sim  | **Em breve!** | **Em breve!** |
| Jogos       |  Sim  |  Sim  | **Em breve!** | **Em breve!** |
| Locais      |  Sim  |  Sim  | **Em breve!** | **Em breve!** |
| Temporadas  |  Sim  |  Sim  | **Em breve!** | **Em breve!** |
| Trilhas     |  --   |  --   |      --       |      --       |

Exemplos de respostas:

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

!!!info Por padrão, o idioma inglês (en-US) será usado.

### Filtros

A capacidade de realizar buscas e filtros foi essencial, mas eu queria mais do que um endpoint básico de busca.

Base da busca da HawAPI:

| Campo    | Exemplo                  | Padrão | Opções                                                 |
| :------- | :----------------------- | :----- | :----------------------------------------------------- |
| sort     | [..]?sort=first_name,ASC | —      | campo, ASC ou DESC                                     |
| page     | [..]?page=1              | 1      | 1..X                                                   |
| size     | [..]?size=12             | 10     | 1..20                                                  |
| language | [..]?language=en-US      | en-US  | [I18N](https://hawapi.theproject.id/docs/guides/i18n/) |

Exemplo avançado de busca usando **símbolos de modificação**:

| Modification         |   Type(s)    | Symbol |
| :------------------- | :----------: | :----: |
| LIKE                 |      \*      |   \*   |
| NOT_LIKE             |      \*      |  !\*   |
| BETWEEN              | Número, Data |   ::   |
| NOT_IN               |      \*      |   !:   |
| IN                   |      \*      |   :    |
| GREATER_OR_EQUALS_TO | Número, Data |   >=   |
| LESS_OR_EQUALS_TO    | Número, Data |   <=   |
| GREATER_THAN         | Número, Data |   >    |
| LESS_THAN            | Número, Data |   <    |
| NOT_EQUALS           |      \*      |   !    |
| EQUALS               |      \*      |        |

Com esse poder, podemos criar pesquisas de API robustas e complexas como:

> Todos os personagens com **sobrenome `parecido com` Wheeler**, **gênero `igual a` 1** e **data de nascimento `maior ou igual a` 1967-01-01**
>
> - [/api/v1/characters?**last_name=\*Wheeler&gender=1&birth_date=>=1967-01-01**](https://hawapi.theproject.id/api/v1/characters?last_name=*Wheeler&gender=1&birth_date=>=1967-01-01)

## Como usar a API com JavaScript

Nesta seção, veremos como buscar informações do **HawAPI** usando a API [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) e o pacote [@hawapi/js-sdk](https://npmjs.com/package/@hawapi/js-sdk):

### Fetch API

Veja como usar com a API nativa **Fetch**:

1. Usando **then/catch**:

```js title="index.js"
fetch('https://hawapi.theproject.id/api/v1/characters/')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error));
```

2. Usando **async/await**:

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

Podemos usar o **SDK do HawAPI em JavaScript** para melhorar o código:

1. Instale o SDK:

````codeset tabs=run-add
```bash label=npm showLineNumbers=false
npm install @hawapi/js-sdk
```
:-:
```bash label=yarn showLineNumbers=false
yarn add @hawapi/js-sdk
```
````

2. Crie a instância e faça solicitações:

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

!!!note O SDK também pode ser usado no navegador com a tag \<script\>. \
Veja mais em [HawAPI/js-sdk#examples/web](https://github.com/HawAPI/js-sdk/tree/main/examples/web)

## Hawbrary

A **Hawbrary** é uma "biblioteca" que exibe todas as informações fornecidas pela HawAPI. Foi desenvolvida com React (NextJs) + Typescript, hospedada no GitHub Pages e utiliza o SDK oficial [@hawapi/js-sdk](https://npmjs.com/package/@hawapi/js-sdk).

[remark_slider showArrows=true showImageInde=true]
![Hawbrary - Image 3](/static/projects/hawbrary/hawbrary-3.png)
![Hawbrary - Image 1](/static/projects/hawbrary/hawbrary-1.png)
![Hawbrary - Image 2](/static/projects/hawbrary/hawbrary-2.png)
[/remark_slider]

Veja a demo [Hawbrary](https://hawbrary.theproject.id/) e o [repositório no GitHub](https://github.com/LucJosin/hawbrary)

## Conclusão

Nesta publicação, exploramos o histórico e os recursos do projeto HawAPI, incluindo o projeto Hawbrary.

Se você achar a API útil, dê uma estrela ao **repositório GitHub** e aproveite o **#StrangerThingsDay** para criar um projeto novo!

https://github.com/HawAPI/HawAPI

## Recursos e Referências

- https://github.com/HawAPI/
- https://hawapi.theproject.id
  - https://hawapi.theproject.id/docs/
  - https://hawapi.theproject.id/try-it/
- https://hawbrary.theproject.id
  - https://hawbrary.theproject.id/explorer/
