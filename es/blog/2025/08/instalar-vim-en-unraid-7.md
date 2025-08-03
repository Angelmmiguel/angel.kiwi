---
layout: blog.njk
title: Cómo instalar Vim en Unraid 7
description: Una guía rápida para instalar el editor de texto Vim en Unraid 7. Aprende los pasos sencillos para tener Vim funcionando en tu servidor Unraid para editar archivos desde la línea de comandos.
type: article
tags:
  - post
  - unraid
  - tools
  - sysadmin
date: 2025-08-03
updated: 2025-08-03
background: linear-gradient(90deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%);
---

Siempre que trabajo en servidores o sistemas que gestiono, me gusta utilizar las más herramientas. Lo mismo me ocurre on Unraid. Prefiero editar archivos con editores que suelo utilizar como Vim o Helix. Si eres como yo, aquí tienes una guía rápida sobre cómo instalar Vim.

# Instalar nuevos paquetes en Unraid

Unraid está basado en [Slackware Linux](https://www.slackware.com/), por lo que puedes reutilizar los mismos paquetes. Para instalarlos, primero debes localizar el paquete que buscas en el archivo [PACKAGES.txt](https://mirrors.slackware.com/slackware/slackware64-current/slackware64/PACKAGES.TXT). En mi caso, busqué:

- Vim
- Libsodium (una dependencia de Vim)

Encontrarás la ubicación de la carpeta en el archivo:

```plain
...

PACKAGE NAME:  vim-9.1.1591-x86_64-1.txz
PACKAGE LOCATION:  ./slackware64/ap
PACKAGE SIZE (compressed):  8836 K
PACKAGE SIZE (uncompressed):  44060 K
PACKAGE DESCRIPTION:
vim: vim (Vi IMproved)
vim:
vim: Vim is an almost compatible version of the UNIX editor vi. Many new
vim: features have been added: multi level undo, command line history, 
vim: filename completion, block operations, and more.
vim:
vim: Bram Moolenaar began working on Vim for the Amiga computer in 1988.
vim:

...

PACKAGE NAME:  libsodium-1.0.20-x86_64-1.txz
PACKAGE LOCATION:  ./slackware64/l
PACKAGE SIZE (compressed):  180 K
PACKAGE SIZE (uncompressed):  660 K
PACKAGE DESCRIPTION:
libsodium: libsodium (Sodium crypto library)
libsodium:
libsodium: Sodium is a library for encryption, decryption, signatures, password
libsodium: hashing and more. It is a portable, cross-compilable, installable,
libsodium: packageable fork of NaCl, with a compatible API, and an extended API
libsodium: to improve usability even further.
libsodium:
libsodium: Its goal is to provide all of the core operations needed to build
libsodium: higher-level cryptographic tools.
libsodium:
libsodium: Homepage: https://libsodium.org

...
```

Anota el nombre del paquete y la ubicación para construir las URLs de los paquetes:

- https://mirrors.slackware.com/slackware/slackware64-current/slackware64/ap/vim-9.1.1591-x86_64-1.txz
- https://mirrors.slackware.com/slackware/slackware64-current/slackware64/l/libsodium-1.0.20-x86_64-1.txz

Finalmente, abre una terminal en Unraid y ejecuta los siguientes comandos:

```sh
cd /tmp

# Descargar los archivos
wget https://mirrors.slackware.com/slackware/slackware64-current/slackware64/ap/vim-9.1.1591-x86_64-1.txz
wget https://mirrors.slackware.com/slackware/slackware64-current/slackware64/l/libsodium-1.0.20-x86_64-1.txz

# Instalarlos
installpkg libsodium-1.0.20-x86_64-1.txz
installpkg vim-9.1.1591-x86_64-1.txz
```

Después de esto, ya puedes ejecutar `vim` en tu terminal.
