---
layout: blog.njk
title: Tokio (Rust) necesita finalizar tu programa
description: Los binarios de Rust que usan Tokio fallan si intentas salir del programa manualmente. Para evitar estos errores, siempre deja que sea Tokio quien termine la ejecución del programa programa.
type: article
tags:
  - post
  - til
  - rust
date: 2023-02-20
updated: 2023-02-20
background: linear-gradient(90deg, rgb(247, 96, 96) 0%, rgb(130, 114, 239) 100%);
slugOverride: tokio-necesita-finalizar-tu-programa
---

Cuando utilizas Tokio, la famosa libraría para código asíncrono en Rust, el método `main` de tu proyecto se convierte en asíncrono. Esto aplica a cualquier otra librería que utilice Tokio internamente, como [actix-web](https://actix.rs/).

```rust
#[tokio::main]
async fn main() -> Result<()> {
    // Código asíncrono ...
    Ok(())
}
```

Parece magina, pero Tokio genera un entorno completo de ejecución para gestionar el código asíncrono y asegurarse que tu programa finaliza sin errores. Por ello, Tokio necesita controlar el ciclo de vida la aplicación y cualquier error que cause un `panic` en la aplicación.

Hoy justo he corregido [este problema en Wasm Workers Server]((https://github.com/vmware-labs/wasm-workers-server/issues/96)). Antes, `wws` lanzaba el siguiente error cuando fallaba un comando: 

```rust
thread '<unnamed>' panicked at 'cannot access a Thread Local Storage value during or after destruction: AccessError', /rustc/fc594f15669680fa70d255faec3ca3fb507c3405/library/std/src/thread/local.rs:422:26
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
fatal runtime error: failed to initiate panic, error 5
```

El problema venía de cómo estaba gestionando los errores. Cuando un comando de la CLI fallaba, `wws` trataba de finalizar el programa inmediatamente llamando al [método `exit`](https://doc.rust-lang.org/std/process/fn.exit.html). Esto evitaba que Tokio pudiera finalizar el proceso de manera correcta, por lo que aplicación lanzaba un `panic`.

Me gustaría entender mejor el problema, pero aún necesito entender un poco más cómo funciona Tokio. Por ahora, solo asegúrate de dejar a Tokio que finalize tu aplicación aunque esta falle para evitar errores de hilos 😬.