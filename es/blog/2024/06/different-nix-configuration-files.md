---
layout: blog.njk
title: La diferencia entre configuration.nix y nix.conf
description: Existen distintas maneras de instalar Nix. Puedes instalarlo como un gestor de paquetes o directamente como tu sistema operativo (NixOS). Dependiendo de tu instalación, necesitas modificar distintos ficheros de configuración. 
type: article
tags:
  - post
  - nix
date: 2024-06-22
updated: 2024-06-22
background: linear-gradient(90deg, rgb(122, 23, 24) 0%, rgb(192, 41, 130) 100%);
---

> Este artículo es part de mi proceso de aprendizaje en Nix. Esta herramienta es muy potente y compleja, por lo que este artículo puede incluir algunos errores. Por ello voy a ir actualizando estos artículo a medida que vaya aprendiendo más 😊

Una de las ventajas de Nix es poder instalarlo en diferentes entornos. Por ejemplo, puedes instalar Nix en un portátil Macbook o NixOS en una nueva máquina. Esta versatilidad conlleva cierta complejida a la hora de entender los conceptos básicos. Esto se debe a que parte de la documentación de Nix hace referencia a ficheros que solo se encuentran en un tipo de instalación.

Este es el caso de `configuration.nix` y `nix.conf`. 

Con NixOS, todo el sistema está definido de forma declarativa. En vez de instalar paquetes con los gestores de paquetes de la distribución que hayas instalado (como `yum`, `apt` o `brew`), estos se declaran en el fichero `configuration.nix`. En este fichero puedes definir todos los paquetes que quieres instalar en el sistema:

```nix
# ...
environment.systemPackages = with pkgs; [
  vim
  wget
  git
];
```

Por otro lado, el fichero `nix.conf` define la configuración de Nix. Este fichero se encuentra en cualquier instalación de Nix, mientras que `configuration.nix` solo estará disponible en NixOS.

Al instalar Nix como un "gestor de paquetes" en un sistem existente, solo necesitas realizar cambios en el fichero `nix.conf`. Si tu sistema se basa en NixOS, entonces solo debes editar el fichero `configuration.nix`. NixOS auto-genera el fichero `nix.conf` en base a las opciones de `nix.*` en tu `configuration.nix`.

## Referencias

* [Manual de referencia de `nix.conf` (Inglés)](https://nix.dev/manual/nix/2.22/command-ref/conf-file)
* [Documentación de `configuration.nix` (Inglés)](https://nixos.org/manual/nixos/stable/#sec-configuration-syntax)