---
layout: blog.njk
title: Record neat terminal demos
description: Sometimes you need to record some demo that involves the terminal. Typing the commands is difficult and you may need to record the video multiple times. You can create neat terminal demos with demo-magic 
type: article
tags:
  - til
  - terminal
  - video
date: 2023-02-23
updated: 2023-02-23
background: linear-gradient(90deg, rgb(245, 181, 32) 0%, rgb(59, 173, 204) 100%);
---

Sometimes you need to record videos or demos that involves the terminal. Typing the commands is difficult, as you may miss-type or forget a specific command. 

Today, I wanted to record a small demo for the Wasm Workers Server project. Instead of typing the commands, I tried to write a simple script to print and run them. However, the result was messy.

Fortunately, I found [demo-magic](https://github.com/paxtonhare/demo-magic), a bash script to emulate typing and prepare neat terminal demos. It comes with multiple helper methods. For exampl:

- `p`: emulate typing a command
- `pe`: emulate typing a command, wait you to press "Enter" and run the command
- `pei`: emulate typing a command and run the command
- `wait`: wait until you press "Enter"
- `cmd`: give control back to you to type and run commands manually

The demo look and feel can be customized. You can configure the prompt (`DEMO_PROMPT`) and the waiting timeout (`WAIT_TIMEOUT`). You can find [a sample script](https://github.com/paxtonhare/demo-magic/blob/master/samples/demo-template.sh) in the repository. 

[The result was pretty neat](https://twitter.com/vmwwasm/status/1628827270369488901)! The tool is simple, although I needed some practice with the different methods and the waiting periods 📹.feat