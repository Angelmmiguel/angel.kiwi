---
layout: blog.njk
title: Cómo no probé Gemini CLI
description: Después de usar Claude Code durante un mes, probé Gemini CLI de Google. El proceso de instalación fue tan frustrante que nunca llegué a probar sus capacidades. Aquí cuento qué falló y por qué la experiencia de usuario importa en las herramientas de IA.
type: article
tags:
  - post
  - ai
  - tools
  - engineering
date: 2025-07-08
updated: 2025-07-08
background: linear-gradient(90deg, rgb(66, 133, 244) 0%, rgb(234, 67, 53) 100%);
---

Últimamente he estado usando agentes de IA en mi día a día y sinceramente, son muy útiles. Después de usar Claude Code durante un mes, ayer intenté probar Gemini CLI de Google. Esta herramienta de Google pintaba muy bien gracias al contexto que admite su modelo Pro, pero al final no llegué a mandar un _prompt_.

No es por la calidad del modelo, su código, las respuestas o cómo funciona. No llegué a ese punto porque **no conseguí echarlo a andar**. En un entorno tan competitivo, me parece increíble que el proceso de instalación sea tan complicado.

# ¿Autenticarse o no?

Después de instalarlo con `npm`, me encontré con el primer problema. Gemini CLI no funciona correctamente en entornos de servidor, ya que no dispone de un navegador. El proceso de autenticación con OAuth no está preparado ya que intenta abrir el navegador directamente sin dar más información.

Después de buscar en los issues de GitHub, encontré que [el flag `--debug` muestra la URL de autenticación](https://github.com/google-gemini/gemini-cli/issues/1432). Esto ayuda, pero no es tan sencillo. Al final acabé:

1. Copiando la URL en mi Macbook
2. Configurando una redirección de puertos (_port forwarding_) por SSH para el callback de OAuth
3. Autenticándome en a través de mi Macbook

# "No tienes un proyecto"

Una vez que pasé la autenticación, ya pensé que todo estaba listo. Error. Gemini CLI necesita un proyecto de Google Cloud cuando usas una cuenta de Workspace. OK, vamos a crearlo.

Después de crear el proyecto, intenté ejecutar Gemini CLI otra vez. Error! Necesitas definir la variable de entorno `GOOGLE_PROJECT_ID` antes de ejecutar el CLI. ¿Por qué no permitir seleccionar directamente un proyectos en mi cuenta?

# "Capa Gratuita"

Justo cuando pensé que finalmente podría probar un prompt, otro problema más. Para usar Gemini CLI con una cuenta Workspace, necesitas habilitar la API de pago de Gemini en mi proyecto de Google Cloud. Aquí es donde se vuelve realmente frustrante, ya que no puedes probarlo de antemano y [los precios no son tan fáciles de predecir](https://ai.google.dev/gemini-api/docs/pricing).

En este punto, me rendí. **He estado usando Claude Code durante un mes sin ninguno de estos problemas**. Simplemente funciona. Descargar, autenticarse y empezar a programar.

# Experiencia

La competencia es enorme en el ecosistema de agentes de código por IA. Cuando los desarrolladores quieren probar una nueva herramienta, especialmente una que compite con otra que ya usan, la experiencia de instalación es crítica.

**Google tiene muy buenos modelos de IA** (Veo 3 es increíble), pero los desarrolladores necesitan poder acceder fácilmente a ellas. Con Claude Code, pude empezar a trabajar en minutos con mi plan Pro. Con Gemini CLI, no pude llegar a lanzar un _prompt_.