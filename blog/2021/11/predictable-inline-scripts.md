---
layout: blog.njk
title: Safe and predictable inline scripts
description: Learn how to use Content Security Policy (CSP) to run only trusted inline scripts in your site
type: article
tags:
  - post
  - dev
  - javascript
  - frontend
  - security
category: dev
date: 2021-11-20
updated: 2021-11-20
background: linear-gradient(45deg, rgba(231,221,149,1) 0%, rgba(150,47,107,1) 48%, rgba(0,140,255,1) 100%);
picture: /static/images/blog/katya-austin-4Vg6ez9jaec-unsplash.webp
pictureBy: Katya Austin
pictureUrl: https://unsplash.com/photos/4Vg6ez9jaec
---

In web security, there are many attack vectors that a malicious actor can use. One of the most common attack vectors is the _injection_. There are many different types of injections. This article is focused on [CWE-79 Cross-site Scripting (XSS)](https://cwe.mitre.org/data/definitions/79.html){target="_blank" rel="noopener noreferrer"} injections.

> Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites - [OWASP](https://owasp.org/www-community/attacks/xss/){target="_blank" rel="noopener noreferrer"}

**In other words, an XSS attack consists of running untrusted and malicious scripts in other user browsers**. With this attack, a malicious actor can get access to the environment to read the information in cookies and storage, and compromise the site behavior.

To minimize the risk, there are different ways to ensure **the browser only executes trusted resources in your sites**. Let's explore how to run inline scripts securely 👇.

# Content Security Policy (CSP) {id="csp"}

The **Content Security Policy (CSP) property allows you to teach the browser about the resources it should read and execute in your site**. It can prevent the execution of non-expected resources to minimize the risk.

You can define a CSP policy in two ways:

- Returning the Content-Security-Policy HTTP header in the response

  ``` plain
  Content-Security-Policy: policy;
  ```

- Create a `<meta>` tag

  ``` html
  <meta http-equiv="Content-Security-Policy" content="policy;">
  ```

## Policies {id="policies"}

**Policies give you the tooling to only allow the execution of resources that you trust**. A CSP `policy` can define:

- A default behavior for the different resources
- Restrictions for specific resources

For example, this policy ensures the browser only executes resources from the same domain:

``` plain
default-src "self";
```

You can allow other domains and specify any domain for certain resources like images:

``` plain
default-src "self" example.com; img-src *;
```

From there, you can start adding stricter policies.

# Inline Scripts {id="inline-scripts"}

Inline scripts are wild and one of the most common injection vectors. An attacker may run arbitrary code on your site [using different approach](https://owasp.org/www-community/attacks/xss/#description){target="_blank" rel="noopener noreferrer"}. So, a good practice is to restrict inline scripts via CSP:

``` plain
default-src "self";
```

However, sometimes inline scripts are required. For example, this site uses an inline script to load the site theme. Using the previous CSP policy would block this script. Inline scripts can be enabled using the `unsafe-inline` value:

``` plain
default-src "self"; script-src "self" "unsafe-inline";
```

As you may guess, **this is a risky option as it allows any inline script in your site**. To protect against unexpected inline scripts, CSP provides us with two tools to enable only trusted ones.

## Nonces {id="nonces"}

> In cryptography, a nonce (number once) is an arbitrary number that can be used just once in a cryptographic communication - [Wikipedia](https://en.wikipedia.org/wiki/Cryptographic_nonce){target="_blank" rel="noopener noreferrer"}

Nonce strategy requires to **generate a base64 random string on the server for every request**. It requires a server to generate the nonce dynamically. Once the nonce is created, you should:

1. Set the `nonce` value in every trusted script

   ``` html
   <script nonce="RANDOM_NONCE">let my_trusted_script;</script>
   ```

2. Configure the CSP the policy to allow script associated to the nonce:

   ``` plain
   default-src "self"; script-src "self" "nonce-RANDOM_NONCE";
   ```

This approach is straightforward. However, it requires a server to generate a new random nonce on every request. If your site is static like this blog, let's check the next approach.

## Script Hash {id="script-hash"}

The script hash strategy allows you to indicate the hash of the inline scripts of your site. **The browser computes the hash of every inline script and compares it with the values provided in the CSP policy**. If the script matches the given hash, the script will be executed.

To compute a script hash, you need to:

- Compute the `SHA-256`, `SHA-384` or `SHA-512` hash of the script content. Note **this includes every tab, space, and break line**. Always calculate the hash of the exact code that will be executed.
- Convert the given hash to `base64`.

To make things simpler, I created [👉 a small tool 🔨](/playground/csp-script-hash/){target="_blank} so you only need to paste your code there.

Once you have the hash, configure it as a trusted inline script in the CSP policy:

``` plain
default-src "self"; script-src "self" "sha256-sytuQ9rGYPcMw/DRh3WEVO2EynM4II6TcLanpOZl+NA=";
```

This approach allows you to execute inline scripts in static sites safely. This is the approach I use on the site 😄.

# References {id="references"}

- [Cross-Site Scripting (XSS) Makes Nearly 40% of All Cyber Attacks in 2019](https://www.precisesecurity.com/articles/cross-site-scripting-xss-makes-nearly-40-of-all-cyber-attacks-in-2019/){target="_blank" rel="noopener noreferrer"}
- [
  OWASP Top 10:2021 - A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/){target="_blank" rel="noopener noreferrer"}
- [The 10 Most Common Website Security Attacks (and How to Protect Yourself)](https://www.tripwire.com/state-of-security/featured/most-common-website-security-attacks-and-how-to-protect-yourself/){target="_blank" rel="noopener noreferrer"}
- [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/){target="_blank" rel="noopener noreferrer"}
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP){target="_blank" rel="noopener noreferrer"}, Mozilla MDN
- [Content Security Policy (CSP) Quick Reference Guide - Unsafe Inline](https://content-security-policy.com/unsafe-inline/){target="_blank" rel="noopener noreferrer"}
- [CSP: script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src){target="_blank" rel="noopener noreferrer"}, Mozilla MDN
