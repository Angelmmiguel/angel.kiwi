---
layout: blog.njk
title: Complexity comes alone
description: TBD
type: article
tags:
  - post
  - dev
category: dev
date: 2022-12-14
updated: 2022-12-14
background: linear-gradient(90deg, rgb(249, 216, 138) 0%, rgb(76, 196, 59) 100%);
picture: /static/images/blog/complexity-comes-alone/og.png
---

When planning new features, **I may tend to focus on providing maximum flexibility to users**. Configuration files are the norm, and you often spend more time understanding them than coding your solution or using a project.

**Flexibility is great, but it usually comes with complexity**. It's a balance. If you are building something new and don't have insights, it is difficult to predict if the extra complexity is worth the flexibility it provides.

Before start coding new features, I always ask myself the following question.

## Is simpler enough?

In other words: 

- Can I cover this use case with a simpler approach?
- Is there any convention outside that I can leverage?

Let me illustrate this with a recent example.

## Adding support for static files to Wasm Workers Server

I wanted to [add support for static files](https://github.com/vmware-labs/wasm-workers-server/pull/29) in the [Wasm Workers Server](https://github.com/vmware-labs/wasm-workers-server/) (`wws`) project. `wws` is a server that runs applications based on the workers model with WebAssembly. Currently, it only supports “workers” or small functions that reply to a specific HTTP endpoint.

Most modern applications come with a set of static files (CSS, JS, and HTML) that are required. This information can be coded in a worker, but **converting static files into a function is an unnecessary overhead**. 

My initial take was to add a new configuration parameter so you can add different `static` folders in your project. That requires you to write a `TOML` configuration to specify which folders contain static assets.

### Can I cover this use case with a simpler approach?

Looking at other projects, **supporting static assets is a common feature of web frameworks**. That includes different types of web frameworks and [Static Site Generators (SSG)](https://en.wikipedia.org/wiki/Static_site_generator) like [Ruby on Rails](https://rubyonrails.org/), [NextJS](https://nextjs.org/), [Eleventy](https://www.11ty.dev/), or [Astro](https://astro.build).

Most of them use a specific folder that contains static assets (`static` or `public`). In that way, **you don't need to configure it and the framework will automatically serve any file inside it as static**. This approach is called [“convention over configuration"](https://en.wikipedia.org/wiki/Convention_over_configuration). 

There's no reason to make it configurable. Let's allow multiple `static` folders in `wws`.

### Can I cover this use case with a simpler approach?

**Having multiple static folders may be confusing**. I had issues when the static file was in a different folder. **That made me think if supporting multiple folders is even required**. Most frameworks support only a single static folder as they usually host a single application. Also, you can add folders inside the `static` one to structure the content.

Finally, **I decided to go for a single `static` folder**.

## From simple to complex

Configuring `static` folders may be convenient and even a key feature. However, I don't have enough insights, so I developed the simplest approach. **Going from simple to complex is more natural**. You provide new configuration capabilities as the project grows and people start using it.

> Going from simple to complex is more natural. You provide new configuration capabilities as the project grows and people start using it.

Flexibility and configuration are huge advantages. I would define them as the way software adapts to different needs. However, they come with a hidden cost:

- Users cannot use that feature until they configure it
- In the worst case, it requires them to read the documentation

I found many projects focusing on configuration, like the [Webpack](https://webpack.js.org/) JavaScript bundler. Everything is configurable, so **a simple project needs a configuration file composed of 5 or 6 options**. Even though the options seem intuitive for developers, **many people had to copy and paste Webpack configuration files from StackOverflow**. 

[Parcel](https://parceljs.org/), a different JavaScript bundler follows the opposite approach. You can configure things, but it will assume many default options. **For a simple project, you don't need to write a configuration file**. Just run the `parcel` CLI. This was a shift for this kind of tool. Even Webpack started to simplify its configuration files and CLI to reduce the entry barrier.

My advice is to **focus on the value you want to provide your users when planning a new feature**. Then, ask yourself: **can it be simpler?**

> Focus on the value you want to provide your users when planning a new feature. Then, ask yourself: can it be simpler?
