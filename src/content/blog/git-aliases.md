---
permSlug: 'git-aliases-typing-less-doing-more-my-favorite-shortcuts'
title: 'Git Aliases: Typing less, doing more — My favorite shortcuts'
description: 'Learn how to speed up your Git usage with aliases, creating shortcuts to reduce repetitive typing, and explore some of my favorite Git command shortcuts.'
image:
  src: 'https://rawcdn.githack.com/lucjosin/lucasjosino.com/main/public/static/blog/wOAJxF4A/git-aliases.png'
  position: 'center'
  showInPost: true
tags:
  - 'git'
  - 'aliases'
  - 'tips'
  - 'tricks'
  - 'terminal'
  - 'bash'
category: 'Tips & Tricks'
language: 'en'
shortlink: '/b/wOAJxF4A'
color: '#bb745a'
isVisible: true
isIndexable: true
enableComments: true
easyShare: true
publishedAt: '2025-03-26 11:00 UTC-3'
---

## Summary

## Introduction

In a developer/I.T. roadmap, **Git** is one of the first (and most essential) tools to learn. It helps developers **track file changes** and **maintain a history of every modification**. But when you find yourself typing the same commands multiple times a day or struggling to remember a long one, it quickly becomes :highlight[boring]{effect="sketch"}.

So, in this short post, I'll share some of my favorite :mention[Git Aliases]{url="https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases"} that I use daily. With aliases, you can create shortcuts that save your ~keyboard~ time.

### Why use Git aliases?

1. **Save time** by reducing repetitive typing.
2. **Simplify complex commands** into shortcuts.
3. **Customize Git** to fit your needs.

But, wait. We need to talk about something important: `Why don't use Git aliases?`

### Why don't use Git aliases?

Well, using this aliases can produce some unwanted behaviors:

1. **Can make it harder** to work on systems where those aliases aren't used.
2. **Can make Git commands feel like magic**, which isn’t always a good thing.
3. Using aliases adds a small **initial learning curve**.

Sure, we can always verify the command behind the shortcut, but it can be annoying sometimes.

## Setting up aliases

First of all, let's see how we can set up aliases using **Git**:

You can define using the following command:

```sh
git config --global alias.co checkout
```

Or edit your `~/.gitconfig` file manually:

```ini
[alias]
    co = checkout
    ss = status
    cmm = commit -m
```

:::alert{type="tip"}
On Linux, you can find your `.gitconfig` file in `~/`, while on Windows, Git looks for it in the `$HOME` directory (_typically C:\Users\\$USER_).
:::

## My favorite ones

Over the years of using **Git aliases**, I’ve created my own **shortcuts**, short and simple (well, most of the time) to remember:

|  Alias   | Command                               | Description                                   |
| :------: | ------------------------------------- | --------------------------------------------- |
|  **c**   | clone                                 | Clone a repository                            |
| **cnf**  | config --list                         | Show current Git configuration                |
|  **dd**  | diff                                  | Show changes between commits or working state |
|  **dl**  | diff HEAD~                            | Show changes from the last commit             |
|  **ll**  | log                                   | View commit history                           |
|  **lt**  | log -1 HEAD                           | Show the latest commit                        |
| **llg**  | log --graph                           | Display commit history as a graph             |
|  **ss**  | status                                | Show the working tree status                  |
|  **aa**  | add .                                 | Stage all changes                             |
|  **aA**  | add -A                                | Stage all changes, including deletions        |
|  **pl**  | pull                                  | Fetch and merge changes from a remote repo    |
| **pls**  | submodule update --recursive --remote | Update all submodules recursively             |
|  **ph**  | push                                  | Push changes to the remote repository         |
| **pho**  | "!f(){ git push -u origin ${1}; };f"  | Push to a new remote branch                   |
|  **cm**  | commit                                | Save changes to the repository                |
| **cmm**  | commit -m                             | Commit with a message                         |
| **cme**  | commit --allow-empty -m               | Commit an empty change with a message         |
| **cma**  | commit --amend -m                     | Modify the last commit message                |
|  **br**  | branch                                | List, create, or delete branches              |
| **brd**  | branch -d                             | Delete a local branch                         |
| **brr**  | branch -m                             | Rename a branch                               |
|  **co**  | checkout                              | Switch branches or restore files              |
| **cob**  | checkout -b                           | Create and switch to a new branch             |
|  **ft**  | fetch                                 | Download changes from a remote repository     |
| **ftp**  | fetch --prune                         | Fetch and remove deleted remote branches      |
| **res**  | restore                               | Discard changes in the working directory      |
| **ress** | restore --staged                      | Unstage changes without discarding them       |
| **rtH**  | reset HEAD~                           | Undo the last commit                          |
|  **sh**  | stash                                 | Save uncommitted changes for later            |
| **sha**  | stash apply                           | Apply the latest stashed changes              |
|  **sw**  | switch                                | Switch between branches                       |
|  **mm**  | merge                                 | Merge branches                                |

That's a really looong list, and can contains more shortcuts over time. But with time and practice you can combine commands and reduce the typing.

### Use case

Imagine this:

> I forgot to commit my changes and ended up starting a new feature. Now, I need to move all the changes to a new branch and commit/push them to the remote repository.

In this case, we can use this "command combo":

1. **git sh**: Stash all uncommitted changes
2. **git cob feat/x**: Create and switch to a new branch
3. **git sha**: Apply the stashed changes to the new branch
4. **git aa**: Stage all changes
5. **git cmm "wip: start feature X"**: Commit with a message
6. **git pho feat/x**: Push new branch to remote

## Shortening even more

For even faster typing (or laziness), you can alias `git` itself to `g`. In your `~/.bash_profile`, add the following **alias**:

```sh
alias g='git'
```

Usage example:

```sh
g cmm "feat: my new feature"
```

## Conclusion

Now that you know how to create aliases, start experimenting with your own shortcuts to fit your needs.

Got any good **Git** command shortcuts to share? Leave it in the [#comments](#comments) section :)

## Resources and References

- [git-scm.com#Git-Basics-Git-Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)
