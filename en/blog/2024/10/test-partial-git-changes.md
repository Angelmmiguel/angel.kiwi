---
layout: blog.njk
title: How to test partial git changes with stash
description: TBD
type: article
tags:
  - post
  - dev
date: 2024-10-20
updated: 2024-10-20
background: linear-gradient(90deg, rgb(80, 23, 44) 0%, rgb(188, 12, 70) 100%);
---

This morning, I was coding a project I'm working on. After applying multiple changes to a file, I needed to test the changes in a single method. In other words, I wanted to isolate a change, revert all the others temporarily, test it, and reapply all my changes back.

I could do it with just two git commands: `add` and `stash`.
