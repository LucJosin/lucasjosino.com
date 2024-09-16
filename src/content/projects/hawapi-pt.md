---
permSlug: 'hawapi'
thumbnail: 'https://repository-images.githubusercontent.com/566830817/1ee86716-d27f-4703-a003-977eca9aee8b'
images:
  - '/static/projects/hawapi/hawapi-1.png'
  - '/static/projects/hawapi/hawapi-2.png'
  - '/static/projects/hawapi/hawapi-3.png'
  - '/static/projects/hawapi/hawapi-4.png'
title: 'HawAPI'
description: 'Uma API de código aberto feita com Java (Spring Boot) e PostgreSQL sobre a série Stranger Things. Suporta múltiplas línguas (Inglês e Português) e um método de busca avançado.'
git: 'https://github.com/HawAPI/HawAPI'
url: 'https://hawapi.theproject.id/'
tags:
  - 'Java'
  - 'Spring Boot'
  - 'JUnit'
  - 'PostgreSQL'
  - 'SQL'
codeLanguage: 'Java'
language: 'pt'
icon: 'mdi:language-java'
category: 'Org'
org: 'https://github.com/HawAPI/'
target:
  - 'API'
  - 'Web'
color: '#691313'
status: 'active'
isVisible: true
isIndexable: true
subProjects:
  - 'hawapi-js-sdk'
  - 'hawapi-go-sdk'
---

Uma API **Gratuita e Open Source** para **Stranger Things** construída com **Java (Spring Boot)** e **PostgreSQL**, com suporte para múltiplos idiomas _(Inglês e Português)_. Todas essas informações estão disponíveis através de uma **API RESTful** e servidas via **JSON**.

### Funcionalidades

- **Informações**: Dados detalhados sobre **personagens**, **atores**, **episódios**, **temporadas** e **locações** da série.
- **Multilíngue**: Oferece suporte à internacionalização (_i18n_) para **Inglês** e **Português**.
- **Limites**: Desenvolvedores podem fazer um número específico de requisições **por segundo**, _dependendo do nível (role)_.
- **Autenticação**: Suporta tokens de autenticação **JWT** e múltiplos níveis (roles), incluindo **ANONYMOUS**, **BASIC**, **DEV**, and **ADMIN**.
- **Cache**: Utiliza cache para melhorar o desempenho e reduzir a carga no banco de dados, armazenando temporariamente dados acessados com frequência para requisições mais rápida.
- **Busca e Filtros**: A API permite que os usuários **filtrarem** dados com base em vários parâmetros, incluindo suporte a **paginação** e **modificação de url**.
- **Open Source**: Totalmente **Gratuita** e **Open Source**, permitindo que desenvolvedores contribuam para a API ou a utilizem como um recurso de aprendizado.

### Tecnologias

- **Java**: API RESTful construída com Spring Boot.
- **PostgreSQL**: Dados armazenados em um banco de dados SQL.
- **Docker**: Contêineres para facilitar a implantação (deployment).
- **Astro**: Front-end para a página inicial.
- **Swagger**: Front-end para a página "Try It".
- **Retype**: Front-end para a documentação.

### Links

- [Website](https://hawapi.theproject.id/)
- [Docs](https://hawapi.theproject.id/docs/)
- [API](https://hawapi.theproject.id/api/)
- [GitHub](https://hawapi.theproject.id/api/)
