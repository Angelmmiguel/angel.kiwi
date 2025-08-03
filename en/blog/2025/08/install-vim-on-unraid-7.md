---
layout: blog.njk
title: How to Install Vim on Unraid 7
description: A quick guide on installing Vim text editor on Unraid 7. Learn the simple steps to get Vim running on your Unraid server for command-line text editing.
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

I like to use my preferred tools in any system I manage. For Unraid, it's no different. I like to edit my files with Vim or Helix. If you are like me, here's a quick guide on how to install Vim easily.

# Install new packages in Unraid

Unraid is based on [Slackware Linux](https://www.slackware.com/), so you can reuse the same packages. To install them, you'll first need to locate your desired package in the [PACKAGES.txt](https://mirrors.slackware.com/slackware/slackware64-current/slackware64/PACKAGES.TXT) file from the current Slackware version. In my case, I looked for:

- Vim
- Libsodium (a Vim dependency)

You'll find the folder location in the file:

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

You need to note the package name and the location to build the package URLs:

- https://mirrors.slackware.com/slackware/slackware64-current/slackware64/ap/vim-9.1.1591-x86_64-1.txz
- https://mirrors.slackware.com/slackware/slackware64-current/slackware64/l/libsodium-1.0.20-x86_64-1.txz

Now, open a terminal in Unraid and run the following commands:

```sh
cd /tmp

# Download the files
wget https://mirrors.slackware.com/slackware/slackware64-current/slackware64/ap/vim-9.1.1591-x86_64-1.txz
wget https://mirrors.slackware.com/slackware/slackware64-current/slackware64/l/libsodium-1.0.20-x86_64-1.txz

# Install them
installpkg libsodium-1.0.20-x86_64-1.txz
installpkg vim-9.1.1591-x86_64-1.txz
```

After that, you can now run `vim` in your terminal.
