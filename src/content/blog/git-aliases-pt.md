---
permSlug: 'git-aliases-typing-less-doing-more-my-favorite-shortcuts'
title: 'Git Aliases: Digitando rápido e eficiente — Meu modo de usar'
description: 'Aprenda a melhorar o uso do Git com aliases, criando atalhos para reduzir a repetição e conheça alguns dos meus atalhos favoritos de comandos Git.'
image:
  src: 'https://rawcdn.githack.com/lucjosin/lucasjosino.com/main/public/static/blog/wOAJxF4A/git-aliases-pt.png'
  position: 'center'
  showInPost: true
tags:
  - 'git'
  - 'aliases'
  - 'dicas'
  - 'truques'
  - 'terminal'
  - 'bash'
category: 'Dicas & Truques'
language: 'pt'
shortlink: '/pt/b/wOAJxF4A'
color: '#bb745a'
isVisible: true
isIndexable: true
enableComments: true
easyShare: true
publishedAt: '2025-03-26 11:00 UTC-3'
---

## Sumário

## Introdução

Em um roadmap de desenvolvedor/T.I., o **Git** é uma das primeiras (e mais essenciais) ferramentas a ser aprendida. Ele ajuda os desenvolvedores a **controlar alterações nos arquivos** e **manter um histórico de cada modificação**. Mas quando você se vê digitando os mesmos comandos várias vezes ao dia ou tentando lembrar um comando longo, começa a ficar :highlight[entediante]{effect="sketch"}.

Neste post rápido, vou compartilhar alguns dos meus **Git Aliases** favoritos que uso diariamente. Com aliases, você pode criar atalhos que economizam seu ~teclado~ tempo.

### Por que usar Git aliases?

1. **Economiza tempo** ao reduzir a digitação repetitiva.
2. **Simplifica comandos complexos** em atalhos.
3. **Personaliza o Git** para atender às suas necessidades.

Mas, calma lá. Precisamos falar sobre algo importante: `Por que não usar Git aliases?`

### Por que não usar Git aliases?

Bem, usar esses aliases pode gerar alguns comportamentos indesejados:

1. **Pode dificultar** o trabalho em sistemas onde esses aliases não são usados.
2. **Pode fazer os comandos Git parecerem mágica**, o que nem sempre é bom.
3. Usar aliases adiciona uma pequena **curva de aprendizado inicial**.

Claro, sempre podemos verificar o comando por trás do atalho, mas isso pode ser irritante às vezes.

## Configurando aliases

Primeiro, vamos ver como configurar aliases usando o **Git**:

Você pode definir com o seguinte comando:

```sh
git config --global alias.co checkout
```

Ou editar manualmente o seu arquivo `~/.gitconfig`:

```ini
[alias]
    co = checkout
    ss = status
    cmm = commit -m
```

:::alert{type="tip"}
No Linux, você pode encontrar o arquivo `.gitconfig` em `~/`, enquanto no Windows, o Git procura nele no diretório `$HOME` (_normalmente C:\Users\$USER_).
:::

## Meus favoritos

Ao longo dos anos usando **Git aliases**, criei meus próprios **atalhos**, curtos e simples (bem, na maioria das vezes) de lembrar:

|  Alias   | Comando                               | Descrição                                          |
| :------: | ------------------------------------- | -------------------------------------------------- |
|  **c**   | clone                                 | Clonar um repositório                              |
| **cnf**  | config --list                         | Mostrar a configuração atual do Git                |
|  **dd**  | diff                                  | Mostrar alterações entre commits ou estado         |
|  **dl**  | diff HEAD~                            | Mostrar alterações do último commit                |
|  **ll**  | log                                   | Ver histórico de commits                           |
|  **lt**  | log -1 HEAD                           | Mostrar o último commit                            |
| **llg**  | log --graph                           | Exibir histórico de commits como gráfico           |
|  **ss**  | status                                | Mostrar o status da árvore de trabalho             |
|  **aa**  | add .                                 | Adicionar todas as mudanças                        |
|  **aA**  | add -A                                | Adicionar todas as mudanças, incluindo deleções    |
|  **pl**  | pull                                  | Buscar e mesclar mudanças de um repositório remoto |
| **pls**  | submodule update --recursive --remote | Atualizar todos os submódulos recursivamente       |
|  **ph**  | push                                  | Enviar alterações para o repositório remoto        |
| **pho**  | "!f(){ git push -u origin ${1}; };f"  | Enviar para um novo branch remoto                  |
|  **cm**  | commit                                | Salvar mudanças no repositório                     |
| **cmm**  | commit -m                             | Commitar com uma mensagem                          |
| **cme**  | commit --allow-empty -m               | Commitar uma mudança vazia com uma mensagem        |
| **cma**  | commit --amend -m                     | Modificar a mensagem do último commit              |
|  **br**  | branch                                | Listar, criar ou deletar branches                  |
| **brd**  | branch -d                             | Deletar um branch local                            |
| **brr**  | branch -m                             | Renomear um branch                                 |
|  **co**  | checkout                              | Trocar de branches ou restaurar arquivos           |
| **cob**  | checkout -b                           | Criar e mudar para um novo branch                  |
|  **ft**  | fetch                                 | Baixar mudanças de um repositório remoto           |
| **ftp**  | fetch --prune                         | Buscar e remover branches deletados remotamente    |
| **res**  | restore                               | Descartar mudanças no diretório de trabalho        |
| **ress** | restore --staged                      | Desfazer mudanças staged sem descartá-las          |
| **rtH**  | reset HEAD~                           | Desfazer o último commit                           |
|  **sh**  | stash                                 | Salvar mudanças não commitadas para depois         |
| **sha**  | stash apply                           | Aplicar as últimas mudanças salvas no stash        |
|  **sw**  | switch                                | Mudar entre branches                               |
|  **mm**  | merge                                 | Mesclar branches                                   |

É uma lista beeeem grande, e ela pode crescer ainda mais com o tempo. Mas com prática, você pode combinar comandos e reduzir ainda a digitação.

### Caso de uso

Imagine isso:

> Esqueci de fazer o commit das minhas mudanças e acabei começando uma nova funcionalidade. Agora, preciso mover todas as mudanças para uma nova branch e commitar/puxar para o repositório remoto.

Neste caso, podemos usar esse "combo":

1. **git sh**: Salva todas as mudanças não commitadas
2. **git cob feat/x**: Cria e muda para uma nova branch
3. **git sha**: Aplica as mudanças na nova branch
4. **git aa**: Adiciona todas as mudanças
5. **git cmm "wip: iniciar a funcionalidade X"**: Commita com uma mensagem
6. **git pho feat/x**: Envia a nova branch para o repositório remoto

## Encurtando ainda mais

Para digitar ainda mais rápido (ou preguiça), você pode criar um alias do próprio `git` para `g`. No seu `~/.bash_profile`, adicione o seguinte **alias**:

```sh
alias g='git'
```

Exemplo de uso:

```sh
g cmm "feat: minha nova funcionalidade"
```

## Conclusão

Agora que você aprendeu a criar aliases, comece a experimentar seus próprios atalhos de acordo com às suas necessidades.

Tem algum atalho de comando **Git** legal para compartilhar? Deixe nos [#comentários](#comments) :)

## Recursos e Referências

- [git-scm.com#Git-Basics-Git-Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)
