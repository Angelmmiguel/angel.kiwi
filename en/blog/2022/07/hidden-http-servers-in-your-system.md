---
layout: blog.njk
title: Hidden HTTP servers in your system
description: Zero-installation single-line commands to run HTTP servers in Linux and macOS. Start developing without installing new software
type: article
tags:
  - post
  - dev
  - tools
category: dev
date: 2022-07-11
updated: 2022-07-11
background: linear-gradient(90deg, rgba(32,27,122,1) 0%, rgba(187,25,79,1) 28%, rgba(226,64,138,1) 43%, rgba(0,212,255,1) 100%);
picture: /static/images/blog/hidden-http-servers-in-your-system/og.png
---

When working with a static site, **a local HTTP server becomes handy**. You can always open the `index.html` file in your browser to test the final output (HTML, JS, and CSS). However, it will fail in many cases due to absolute import paths such as `/index.js` . 

One option is to install a local server such as [Caddy](https://caddyserver.com/), although why install new software if **your operating system may include a built-in option**?

## Built-in servers

Some programming languages include a local HTTP server script. For example, Ruby and Python. Others like NodeJS allow you to install and run a binary temporarily using a single command. 

Considering that some of these languages are preinstalled in your operating system, you already have a HTTP server available. The missing step is to know the command you need to run.

Do not worry, I will include some aliases in this article 😄.

### Ruby

*Available by default in macOS*

```bash
ruby -run -e httpd . -p 3000
```

### Python

*Available by default in most popular Linux distros and macOS*

```bash
python -m SimpleHTTPServer 3000 .
```

### NodeJS

*Not available by default in any OS, but commonly used*

```bash
npx serve -p 3000 .
```

### And Windows?

Unfortunately, Windows does not include any programming language by default. If you have already installed any of the mentioned programming languages, then feel free to use the same commands.

Otherwise, I recommend you download and install [Caddy](https://caddyserver.com/download).

## Aliases

As I promised, here you have the list of aliases to add to your shell profile file:

```bash
alias ruby-server="ruby -run -e httpd -p 3000"
alias python-server="python -m SimpleHTTPServer 3000"
alias node-server="npx serve -p 3000"
alias http-server="python-server"
```

I took some decisions, but feel free to adapt the aliases to your case:

- Use the `3000` port by default
- Skip the folder to add it on-demand
- For the `http-server` alias, I chose Python because it is installed in many operating systems by default

### Usage

After adding it and reloading your shell, you can start serving your files locally:

```bash
http-server .
http-server ./dist
```

# Can I avoid installing it?

This is a question I usually ask myself. Tools like brew make it easy to install new software in your system. It is like a tick. However, I always wonder why I installed something any time I need to update the installed packages 😂.

**For that reason, the less to install, the better.**
