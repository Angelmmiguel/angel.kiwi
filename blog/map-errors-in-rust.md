---
layout: blog.njk
title: Map errors in Rust
description: In Rust, modifying given errors can become handy. Instead of providing a generic error, you add the context that makes sense for your application
type: article
tags:
  - post
  - dev
category: dev
date: 2022-01-23
updated: 2022-01-23
background: linear-gradient(90deg, rgb(249, 216, 138) 0%, rgb(76, 196, 59) 100%);
picture: /static/images/blog/map-errors-in-rust/og.png
---

```
pub enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

Method signature:

```
pub fn map_err<F, O>(self, op: O) -> Result<T, F>
where
    O: FnOnce(E) -> F,
```

This allow you to change:

```
if let Ok(content) = toml::from_slice::<Metadata>(data) {
    Ok(content)
} else {
    Err(anyhow!("wws could not deserialize the runtime metadata"))
}
```

To

```
toml::from_slice::<Metadata>(data)
    .map_err(|_| anyhow!("wws could not deserialize the runtime metadata"))
```

## References

- https://doc.rust-lang.org/std/ops/trait.FnOnce.html
- https://doc.rust-lang.org/std/result/enum.Result.html#method.map_err
- https://doc.rust-lang.org/std/result/enum.Result.html