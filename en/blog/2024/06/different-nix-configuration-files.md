---
layout: blog.njk
title: The difference between configuration.nix and nix.conf
description: There are many ways to install Nix in a system. You can install it as a package manager or as your operating system (NixOS). Depending on your installation, you need to focus on certain configuration files.
type: article
tags:
  - post
  - nix
date: 2024-06-22
updated: 2024-06-22
background: linear-gradient(90deg, rgb(122, 23, 24) 0%, rgb(192, 41, 130) 100%);
---

> This article is part of my personal journey on Nix. This system is quite powerful and complex, so you might find some misconceptions here. I will update these articles as I get more proficient on it 😊

One of the Nix advantages is the ability to install it in different environments. For example, you can add Nix to your macOS device or install a fresh new machine with NixOS. This powerful duality, also increases the complexity to understand Nix basics. Some documentation refers to certain files that are mainly related to one of the installation formats. 

This is the case of `configuration.nix` and `nix.conf`. 

NixOS defines the operating system configuration declaratively. Instead of installing random packages using the distro package manager (like `yum`, `apt` or `brew`), you declare the system configuration on the `configuration.nix` file. There, you can define the different packages you want to install widely on the system:

```nix
# ...
environment.systemPackages = with pkgs; [
  vim
  wget
  git
];
```

On the other side, the `nix.conf` file defines the configuration for the nix installation. This file will be present in any nix installation, while the `configuration.nix` file will be available only when you install NixOS.

If you installed Nix as a "package manager" in an existing system, you can focus only on the `nix.conf` file. If your machine is based on NixOS, then you need to edit only the `configuration.nix` file. The `nix.conf` file will be auto-generated based on the `nix.*` options in your configuration file.


## References

* [`nix.conf` reference manual](https://nix.dev/manual/nix/2.22/command-ref/conf-file)
* [`configuration.nix` documentation](https://nixos.org/manual/nixos/stable/#sec-configuration-syntax)