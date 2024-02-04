---
layout: blog.njk
title: Cloudflare Web Analytics is not capturing my events
description: Process to solve CORS issues / errors when Cloudflare Web Analytics is showing 0 visitors on your site and you configured a custom domain
type: article
tags:
  - post
  - dev
category: dev
date: 2022-07-15
updated: 2022-07-15
background: linear-gradient(90deg, rgba(139,33,212,1) 0%, rgba(244,179,53,1) 100%);
picture: /static/images/blog/cors-error-capturing-cloudflare-web-analytics/og.jpg
---

[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) is an analytics service that focuses on simplicity and privacy. **You can enable it for any project you host on Cloudflare and start collecting basic and private metrics from your sites**. 

I recently added it to a project and noticed it was not capturing any event. So, let's get our hands dirty and understand what is happening.

## CORS error when sending the beacon

This service uses a minimal JS code to send a beacon with the visitor event. When checking the developer console, I noticed **the event was blocked by the [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS) policy**.

If you did not hear about CORS before, **it is a way for a web server to indicate the user browser from which domain it can receive requests**. This blocking system is a security mechanism. It prevents a malware site from sending a request to any sensitive site (like your bank) without you noticing it. 

From the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS):

> **Cross-Origin Resource Sharing** ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) is an [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)-header based mechanism that allows a server to indicate any [origins](https://developer.mozilla.org/en-US/docs/Glossary/Origin) (domain, scheme, or port) other than its own from which a browser should permit loading resources

This policy is very convenient. However, it may cause issues when it is not configured correctly.

### Cloudflare Web Analytics and custom domains

Looking for a solution, I found a related message from a Cloudflare developer [in their forums](https://community.cloudflare.com/t/analytics-tag-not-loading-due-to-cross-origin-request-blocked/261058/5):

> Hi, looks like we have a bug on our end. Until this is fixed, after adding your custom domain on Pages, please disable and re-enable Web Analytics so that your new custom domain

And this was my current issue. In the end, these are the steps I followed:

1. Disable Web Analytics
1. Deploy a new version of the site
1. Enable Web Analytics
1. Redeploy again a new version

After this, I started getting events on my site.

## When things do not work

As a developer, you usually get frustrated when a “click to enable” button does not work. Companies try to simplify their products as much as possible, and **the easier they configure a feature, the faster you expect it to work**.

Most of the time is a matter of patience. Deep breath and start searching for a solution 😄