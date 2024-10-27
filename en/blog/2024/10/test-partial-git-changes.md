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

This morning, I was coding a project I'm working on. After applying several changes to a file, I needed to test the changes in a single method. I wanted to isolate those changes, revert all the others temporarily, test them, and reapply all the other changes back.

I could do it with git, by combining just two commands: `add` and `stash`.

## Adding changes selectively

When adding changes to a git commit, we usually add entire files with `git add`. However, sometimes you might need to add just a few changes in a file and leave other for a different commit. 

For example, I modified several CSS rules in my blog. To select some specific changes interactively, I run `git add -p`:

```diff
❯ git add -p
diff --git a/static/css/mini.css b/static/css/mini.css
index d647a2b..154b9e6 100644
--- a/static/css/mini.css
+++ b/static/css/mini.css
@@ -17,7 +17,7 @@

 /* Header */
 header.top {
-  margin: 1rem auto 0;
+  margin: 2rem auto 0;
 }

 /* Building blocks*/
(1/3) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]?
```

The `-p` flag allows me to go chunk (or hunk) by chunk adding them to the current stash or skipping it. You can see all the different options if you pass the `?` value:

```plain
(1/3) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? ?
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
g - select a hunk to go to
/ - search for a hunk matching the given regex
e - manually edit the current hunk
? - print help
```

For now, you can focus on the `y` and `n` values, that adds or skips the current chunk. 

Going back to the purpose of this article, select all the chunks you want to keep / test. After you go through all the process, you would have staged certain portions of your file.

## Stash everything else

Once you have selected the chunks you want to keep or test, you only need to put apart all the other changes. If you run `git stash` directly, it will stash all the changes, including the one you selected. To stash only the other changes, you need to run it with the `--keep-index` flag:

```sh
git stash --keep-index
```

From the [git-scm.com](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---keep-index) site:

> -k
> --keep-index
> --no-keep-index
> This option is only valid for push and save commands.
>
> All changes already added to the index are left intact.

That's exactly what I needed! Once I'm done testing it, I can recover all the changes with `git stash pop` :)
