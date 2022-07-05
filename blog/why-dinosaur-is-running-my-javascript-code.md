---
layout: blog.njk
title: Why a dinosaur is running my JavaScript code?
description: Deno is a simple, modern and secure runtime for JavaScript. They created a solid foundation and now have the tools to make a strong ecosystem around it
type: article
tags:
  - post
  - dev
  - javascript
category: dev
date: 2022-07-04
updated: 2022-07-04
background: linear-gradient(135deg, rgba(6,4,36,1) 0%, rgba(47,95,150,1) 35%, rgba(117,0,255,1) 100%);
picture: /static/images/blog/deno-header.webp
pictureBy: Deno
pictureUrl: https://deno.land
---

[Deno](https://deno.land/) is a simple, modern and secure runtime for JavaScript, [TypeScript](https://www.typescriptlang.org/), and [WebAssembly](https://webassembly.org/). In other words, it is a way to run JS, TS, and WASM code outside the browser. This concept may sound familiar to you due to the well-known [NodeJS](https://nodejs.org/).

So, why use a different runtime having NodeJS around?

# NodeJS, Deno, and V8

Before highlighting the differences, I want to talk first about the similarities. To demystify NodeJS and Deno, **they are a layer between your code, the operating system, and the [V8 JavaScript engine](https://v8.dev/)**.

![Deno and NodeJS diagram. It indicates how Deno and NodeJS provide system bindings to the V8 engine](/static/images/blog/deno-diagram.webp)

V8 is an OSS JavaScript and WebAssembly engine created by Google. **It is the actual piece of software running your code**. This engine is one of those technologies you do not usually hear of, but it is everywhere. V8 is used in Chrome, NodeJS, and Deno, among others.

On the other side, **NodeJS and Deno provide V8 all the methods to access and use system resources such as the filesystem (FS), sockets, etc**. In fact, V8 was designed this way so it can be extended to be used in different environments.

# The dinosaur

![The Deno logo. A cute dinosaur with in a black circle](/static/images/blog/deno-header.webp)

[Deno](https://deno.land/) starts from the same principle as NodeJS: **running JS code in the server**. Then, it introduces a new set of design decisions that make it a different and solid option.

Let me highlight some of them:

- `deno` is a **single binary**. Nothing more, nothing less
- Include TypeScript support out of the box
- The **security model is capability-based**. You need to grant access to system resources when running your application
- Focus on developer experience by including a set of tools for linting and formatting
- Uses ECMAScript Modules (import / export) by default
- **No package manager is required**. Dependencies points to remote or local files

If I had to choose just 1 item from the list, **it would be the capability-based security model**. And this moves us to the next section.

## Why Deno now?

It is not a secret that NodeJS ecosystem was the target of [many](https://medium.com/checkmarx-security/new-protestware-found-lurking-in-highly-popular-npm-package-d46f8ba67e36), [many](https://www.theregister.com/2022/05/12/npm-attacks-code-white-jfrog/), [many](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident.html), [many](https://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry.html) malware attacks last years. **NodeJS has a vast ecosystem with millions of packages**. Controlling all of them and their dependencies is an impossible task.

When there is a new security incident with a package, the focus is the same: removing the compromised version. This strategy takes case by case and applies an action to the individual items. However, the root cause is always the same: **any downloaded package gets direct access to many resources in your system**.

And this is where Deno shines for me. By default, an application will not be able to access resources unless [you explicitly enable it](https://deno.land/manual/getting_started/permissions). For example, the following application will be able to read only the `/tmp/my-folder/` folder in your system:

```bash
deno run \
  --allow-read=/tmp/my-folder \
  https://deno.land/std@0.146.0/examples/cat.ts \
  /tmp/my-folder/test.txt
```

If the `cat.ts` library gets compromised and tries to access your etc/passwd file, it will not be able to read it thanks to the granular permissions you granted. Said that all the packages that `cat.ts` runs will get the same permissions.

I do not want to go into details here as that will be a different article in the blog 😄

# A flourishing land

Deno is still in its early days. However, they created a **solid foundation and now have the tools to make a strong ecosystem around it**. Their current focus on developer experience, security and [frameworks](https://fresh.deno.dev/), make a perfect mix for me.

I am eager to see how it evolves, so expect more articles on this topic.

*And before finishing the article, here you have a plot twist: Deno and NodeJS were created by the [same person](https://en.wikipedia.org/wiki/Ryan_Dahl) 🤯*
