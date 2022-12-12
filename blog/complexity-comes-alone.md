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
background: linear-gradient(90deg, rgba(139,33,212,1) 0%, rgba(244,179,53,1) 100%);
picture: /static/images/blog/complexity-comes-alone/og.jpg
---

When planning new features for a project, we tend to focus on the maximum flexibility we can give to users. Configuration files are the norm and many times you spend more time understanding them that actually coding your solution.

Flexibility is great, but it usually comes with complexity. If you are building something new and you don't have insights, it's complicated to predict is the complexity you are adding is worth the flexibility you provide. To balance it, I always ask myself the following question.

## Is a simpler option enough?

In other words: 

- Can I cover this use case with a simpler approach?
- Is there any convention outside that I can leverage?

When I want to add a new feature, it's natural to me to think on the options I want to give users. I would like to configure X and Y parameters, so users can do Z. However, coding a new configuration parameter comes with a hidden cost:

- Users cannot use that feature until they configure it
- In the worst case, it requires you to read the documentation

Let me illustrate this with a recent example.

## Adding support for static files to Wasm Workers Server

Here you have a real example from a project I'm working on. I wanted to support static files in the Wasm Workers Server (`wws`) project. `wws` is a server that runs applications based on the workers model with WebAssembly. Currently, it only supports “workers” or small functions that reply to a specific HTTP endpoint.

Most of modern applications come with a set of static files (CSS, JS and HTML) that are required. This information can be coded in a worker, but having to convert static files into a function is an unnecessary overhead. 

My first take was to add a new configuration parameter so you can add as many `static` folders as they want. This requires you to write a `toml` configuration to specify which folders contain static assets. This allow full flexibility.

**Can I cover this use case with a simpler approach?**

If we look to other projects, supporting static assets is pretty common for any web framework. This includes many different types of web frameworks and static site generators (SSG) like Ruby on Rails, NextJS, Eleventy or Astro.

Most of them uses a special folder to contain static assets (`static` or `public`). In that way, you don't need to configure it but the framework will automatically serve them for you. This is called “convention over configuration". 

No point at this time to make it configurable. Let's allow multiple `static` folders when running `wws`.

**Can I cover this use case with a simpler approach?**

When thinking about multiple `static` folders, I had to write down the routes that this structure will generate. The fact that I had to write it made me think why supporting multiple folders is even required. Most frameworks support only a single static folder as they usually host a single application. In addition to that, you can add multiple folders inside the `static` folder to split the content.

In the end, we decided to go for a simple `static` folder.

## From simple to complex

Having multiple `static` folders may be useful and even a key feature. Since we don't have enough insights yet to make this decision, I always go for the simplest approach. Going from simple to complex is more natural. You provide new features as the project grows and people start using it.

I found many projects going the opposite direction. Webpack, a JavaScript bundler was created with flexibility in mind. Everything is configurable, so for a simple project you need a configuration file composed by 5 or 6 options. Even though the options seems to be intuitive for developers, many people ended up copying and pasting webpack configuration files from Internet. 

Parcel, a different JavaScript bundler started simple. You can configure things, but by default we will assume many defaults options. For a simple project, you don't need to write a configuration file, just run the `parcel` CLI. This was a shift on the development of similar tools and even Webpack started to simplify their configuration files and CLI to reduce the entry barrier.

My only tip here is that any time you plan a new feature, focus on the value you want to provide your users. Then, ask yourself: can it be simpler?