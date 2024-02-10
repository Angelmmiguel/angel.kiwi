---
layout: blog.njk
title: Difference between base, chat and instruct models
description: Machine learning model hubs like HuggingFace contains many different kinds of models. In the same model family, you can usually find base, chat and instruct. What's the difference between them?
type: article
tags:
  - post
  - ai
category: dev
date: 2024-02-10
updated: 2024-02-10
background: linear-gradient(90deg, rgb(30, 158, 228) 0%, rgb(20, 180, 76) 100%);
picture: /static/images/blog/difference-base-instruct-chat-models/og.png
---

In Machine Learning (ML) model hubs like HuggingFace, you can find many different models. Some of them like Llama2 and Mistral are very popular. If you search for these models, you will find several variations:

- Llama2-13B
- Llama2-13B-chat
- Mistral-7B
- Mistral-7B-Instruct

The 7B and 13B clearly identifies the number of parameters in the model. However, what's the difference between chat, instruct and models without these suffixes?

## TL;DR

The chat and instruct variants are the same base model (either Llama2-13B or Mistral-7B in the preivous example) that is fine-tuned to perform better in certain circunstances. A chat model is fine-tuned for conversational

## References

* https://wowdata.science/chat-and-instruct-modes-in-llms/
