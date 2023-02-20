---
layout: blog.njk
title: Tokio (Rust) needs to exit your program safely
description: Rust binaries that uses Tokio as runtime will fail if you exit the program manually. Tokio needs to exit your program safely
type: article
tags:
  - til
  - rust
date: 2023-02-20
updated: 2023-02-20
background: linear-gradient(90deg, rgb(247, 96, 96) 0%, rgb(130, 114, 239) 100%);
---

When using the famous [Tokio](https://tokio.rs/) Rust async runtime library, suddenly your Rust main method becomes asynchronous. That also applies to any other library that uses Tokio under the hood, like [actix-web](https://actix.rs/).

```rust
#[tokio::main]
async fn main() -> Result<()> {
    // Async code ...
    Ok(())
}
```

It seems magic, although Tokio spawns and entire runtime to manage asynchronous code and ensure your program exits successfully. Tokio requires to control the entire lifecycle of your application and any halt in the middle may cause your application to panik.

This is exactly the issue [I fixed today in Wasm Workers Server](https://github.com/vmware-labs/wasm-workers-server/issues/96). The `wws` binary was panicking after any errored command:

```rust
thread '<unnamed>' panicked at 'cannot access a Thread Local Storage value during or after destruction: AccessError', /rustc/fc594f15669680fa70d255faec3ca3fb507c3405/library/std/src/thread/local.rs:422:26
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
fatal runtime error: failed to initiate panic, error 5
```

The issue was located at the way I managed the errors. When a command failed, I tried to early finish the program by calling the [`exit()` method](https://doc.rust-lang.org/std/process/fn.exit.html). Tokio was not able to finish the process safely, so the entire application panicked.

I'm still digging into the main reason, although that will require a deeper understanding of Tokio. For now, just be sure you leave Tokio to manage your application lifecycle to prevent weird threading errors in your program 😬.