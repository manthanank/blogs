---
author: Manthan Ankolekar
pubDatetime: 2023-06-24T10:44:00Z
title: Set up SSH key for GitLab on Windows.
postSlug: set-up-ssh-key-for-gitLab-on-windows
featured: true
draft: false
tags:
  - git
  - gitlab
  - windows
ogImage: ""
description: Set up SSH key for GitLab on Windows..
---

**Installing Git from** [https://git-scm.com/](https://git-scm.com/)

Checking git version :

```bash
git --version
```

### Configuring Git

```bash
git config --global user.name "First name Last name"
git config --global user.email “you@example.com”
```

Example :

```bash
git config --global user.name "Manthan Ank"
git config --global user.email "manthan.ank@gmail.com"
```

### Generating an SSH key

```bash
ssh-keygen
```

Get contents from file

```bash
cat C:/Users/manth/.ssh/id_rsa.pub
```

Copy content(key) from it and paste it in [https://gitlab.com/-/profile/keys](https://gitlab.com/-/profile/keys) and add key
