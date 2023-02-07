---
layout: blog.njk
title: Side effects are unavoidable
description: When changing some code in a public project or API, side effects are unavoidable. The more users you have, the more hidden effects you will cause
type: article
tags:
  - post
  - dev
category: dev
date: 2023-02-07
updated: 2023-02-07
background: linear-gradient(90deg, rgb(186, 38, 28) 0%, rgb(232, 122, 19) 100%);
picture: /static/images/blog/side-effects-are-unavoidable/og.png
---

As developers, we use many different tools in our development workflow. Some of them state they are **opinionated**, and when you download, **they assume you accept these conditions**.

This category includes formatters, linters, and other tools that suggest ways to improve your code. We have great examples in every language, like Eslint, Prettier, Rubocop, and Clippy.

These tools are part of every developer toolchain. They help you homogenize your code base and ensure all developers write code the same way.

Everyone accepts the benefits of these tools, but **what happens when they become the norm?**

## Clippy and inlined arguments

Some weeks ago, Rust released a new version. For many developers, it's time to update their toolchain. Most of them use [rustup](https://rustup.rs/) to install and update their Rust environment.

When you run `rustup update`, you download multiple resources: rust compiler, docs, etc. It also includes clippy, the main linter for Rust. In the last update, the clippy team introduced [a new linting rule](https://github.com/rust-lang/rust-clippy/issues/9618) called `uninlined_format_args`.

This rule asks you to use inline arguments with macros like println! and format!:

```rust
// From
println!("Showing some data: {}", data);

// To
println!("Showing some data: {data}");
```

It seems a pretty small change, but the impact was huge due to several conditions:

* Projects use these macros heavily.
* Many people rely on rust-analyzer, a tool to get inline warnings in their editors. This tool does not support inline arguments at this point.
* Developers usually configure clippy to fail on warnings.

After one command (`rustup update`) or in your fresh CI worker, **your project starts to fail because of this new rule**. [Rust developers didn't expect this](https://github.com/rust-lang/rust-clippy/issues/10087).

## Opinions cause unexpected side effects

In this article, I wouldn't value if this change was reasonable. For me, the fact is that **the more users you have, the more hidden effects you will cause**. The clippy team may not expect the tool to become so popular and configuring warnings as failures is the norm.

Even if they expected it, the side effects are unavoidable. The only thing you can do is provide tools to minimize the impact. Some of the ideas I may think of are:

* Since it's a general-purpose tool, test new versions against diverse (small and big) projects so you can measure the impact on them.
* Provide an easy way to configure the tool for different use cases.

Every case is different, but these ideas may prevent and mitigate these errors. Just don't assume the way people use a tool. If you can, test it directly against a representative group of projects.

And remember, **side effects are unavoidable**.
