---
layout: blog.njk
title: Disappointed by Gemini CLI
description: After a month of using Claude Code, I tried Google's Gemini CLI. The installation process was so frustrating that I never got to test the actual capabilities. Here's what went wrong and why user experience matters in AI tools.
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

Lately, I've been using AI agents and I've found them pretty useful. After spending a month with Claude Code and having a great experience, I was excited to try Google's Gemini CLI yesterday. I was really disappointed.

It's not about the quality of the code, the responses, or how the model performs. I never got that far because **I couldn't make it work**. It's about the experience it offers - or lack of it. In such a competitive environment, it's crazy to me that I couldn't even install and run Gemini.

# Authenticate or not

After installing it with `npm`, I got the first problem. Gemini CLI didn't work properly on my development machine because I don't have a browser there, and the authentication flow wasn't ready for that scenario. 

After digging in GitHub issues, I found that [the `--debug` shows the authentication URL](https://github.com/google-gemini/gemini-cli/issues/1432). Then I had to:

1. Copy the URL manually
2. Set up SSH port forwarding for the OAuth callback
3. Complete the authentication in my Macbook

# Do you have a project?

Once I finally got past the authentication, I thought I could write my first prompt. Wrong. Gemini CLI asked me to create a Google Cloud Project because I was using a Workspace account. Fair enough, let's create it.

After creating the project, I tried to run Gemini CLI again. Another error: I needed to set `GOOGLE_PROJECT_ID` environment variable before running the CLI. Why couldn't it just ask me which project to use from the ones available in my account?

# "Free Tier"

Just when I thought I could finally use the tool, I hit a wall. Google wanted me to enable a paid Gemini API in my Google Cloud Project. Here's where it gets really frustrating as I couldn't test it in advance and the [pricing is not that easy to follow](https://ai.google.dev/gemini-api/docs/pricing).

At this point, I gave up. **I've been using Claude Code for a month without any of these issues**. It just works. Download, authenticate, and start coding.

# Why This Matters

In the AI tools space, the competition is huge. When developers want to try a new tool, especially one that competes with something they're already happy with, the onboarding experience is critical.

**Google has great AI capabilities** (Veo 3 is so cool!), but if developers can't easily access them, what's the point? With Claude Code, I was productive within minutes. With Gemini CLI, I couldn't run a prompt.