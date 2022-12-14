---
layout: blog.njk
title: Complexity comes alone
description: TBD
type: article
tags:
  - post
  - dev
category: dev
date: 2022-12-20
updated: 2022-12-20
background: linear-gradient(90deg, rgb(249, 216, 138) 0%, rgb(76, 196, 59) 100%);
picture: /static/images/blog/complexity-comes-alone/og.jpg
---

When planning new features, I may tend to focus on providing the maximum flexibility to users. Configuration files are the norm and many times you spend more time understanding them that actually coding your solution or using a project.

Flexibility is great, but it usually comes with complexity. It's a complex balance. If you are building something new and you don't have insights, it's difficult to predict if the complexity you are adding is worth the flexibility you provide. 

Before start coding new features, I always ask myself the following question.

## Is a simpler option enough?

In other words: 

- Can I cover this use case with a simpler approach?
- Is there any convention outside that I can leverage?

Let me illustrate this with a recent example.

## Adding support for static files to Wasm Workers Server

I wanted to support static files in the [Wasm Workers Server](https://github.com/vmware-labs/wasm-workers-server/) (`wws`) project. `wws` is a server that runs applications based on the workers model with WebAssembly. Currently, it only supports “workers” or small functions that reply to a specific HTTP endpoint.

Most of modern applications come with a set of static files (CSS, JS and HTML) that are required. This information can be coded in a worker, but having to convert static files into a function is an unnecessary overhead. 

My first take was to add a new configuration parameter so you can add different `static` folders. This requires you to write a `toml` configuration to specify which folders contain static assets. This allow full flexibility.

**Can I cover this use case with a simpler approach?**

If we look to other projects, supporting static assets is common for any web framework. This includes many different types of web frameworks and [Static Site Generators (SSG)](https://en.wikipedia.org/wiki/Static_site_generator) like [Ruby on Rails](https://rubyonrails.org/), [NextJS](https://nextjs.org/), [Eleventy](https://www.11ty.dev/) or [Astro](https://astro.build).

Most of them uses a special folder that contains the static assets (`static` or `public`). In that way, you don't need to configure it but the framework will automatically serve them for you. This approach is called [“convention over configuration"](https://en.wikipedia.org/wiki/Convention_over_configuration). 

No point at this time to make it configurable. Let's allow multiple `static` folders when running `wws`.

**Can I cover this use case with a simpler approach?**

When thinking about multiple `static` folders, I had to write down the routes that this structure will generate. The fact that I had to write it made me think why supporting multiple folders is even required. Most frameworks support only a single static folder as they usually host a single application. In addition to that, you can add multiple folders inside the `static` folder to split the content.

In the end, we decided to go for a single `static` folder.

## The cost of configuration

## From simple to complex

Having multiple `static` folders may be useful and even a key feature. Since I don't have enough insights to make this decision, I always go for the simplest approach. Going from simple to complex is more natural. You provide new features as the project grows and people start using it.

> Going from simple to complex is more natural. You provide new features as the project grows and people start using it

Flexibility is a huge advantage in software. I would define it as the way software adapts to different needs. However, providing flexibility comes with a hidden cost:

- Users cannot use that feature until they configure it
- In the worst case, it requires them to read the documentation

I found many projects focusing on full flexibility. The [Webpack](https://webpack.js.org/) JavaScript bundler was created with flexibility in mind. Everything is configurable, so for a simple project you need a configuration file composed by at least 5 or 6 options. Even though the options seems to be intuitive for developers, many people ended up copying and pasting webpack configuration files from Internet. 

[Parcel](https://parceljs.org/), a different JavaScript bundler started simple. You can configure things, but it will assume many defaults options. For a simple project, you don't need to write a configuration file, just run the `parcel` CLI. This was a shift for these kind of tools and even Webpack started to simplify their configuration files and CLI to reduce the entry barrier.

My only tip here is that any time you plan a new feature, focus on the value you want to provide your users. Then, ask yourself: can it be simpler?

> Focus on the value you want to provide your users. Then, ask yourself: can it be simpler?
