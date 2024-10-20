---
layout: blog.njk
title: How to Upload 7000+ Files to Cloudflare R2
description: Learn how to efficiently upload 7000+ files to Cloudflare R2 using AWS CLI. This guide covers common pitfalls, cost-saving techniques, and provides step-by-step instructions for managing large-scale file uploads to your R2 buckets.
type: article
tags:
  - post
  - hosting
date: 2024-10-20
updated: 2024-10-20
background: linear-gradient(90deg, rgb(80, 23, 44) 0%, rgb(188, 12, 70) 100%);
---

[Cloudflare R2](https://developers.cloudflare.com/r2/) is a generic object storage service with an S3-compatible API. You can combine it with other Cloudflare features like caching and firewall rules. It also offers a generous free tier that fulfills the requirements of many projects.

I recently started using Cloudflare R2 and needed to upload over 7000 files. As you might guess, the Cloudflare Dashboard website doesn't support such a large number of files. You need to use an alternative method like Wrangler (the Cloudflare CLI) or the AWS S3 CLI.

After testing the different options, I found a clear winner for efficiently handling large uploads.

# How to Upload 7000 Files to Cloudflare R2

Like S3, the first step to upload your files to Cloudflare R2 is to create a bucket. In Cloudflare, a bucket is a container for your files with a set of permissions, domains, and rules. I tried to upload my 7000 files over the UI, but I quickly hit a wall: the Cloudflare UI only allows you to upload 100 files at a time.

Next, I explored [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/). While it offers the `r2 putObject` method for uploading files to your R2 bucket, I encountered two major issues:

* **Token issues**: The R2 API token generated using the [official guide](https://developers.cloudflare.com/r2/api/s3/tokens/) doesn't work out of the box. The Wrangler CLI complains about missing permissions for the `/memberships` endpoint. (There's a [workaround available](https://github.com/cloudflare/workers-sdk/issues/1422#issuecomment-1189496401), but it's not ideal)

* **Slow uploads**: Wrangler can't upload entire folders, forcing you to upload files one by one - an extremely slow process for 7000+ files

Wrangler was clearly not an option for me, so I tried the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) instead. Cloudflare provides a [comprehensive guide on using the AWS CLI with R2 buckets](https://developers.cloudflare.com/r2/examples/aws-cli/), but if you're short on time, here's a quick guide to upload an entire folder with lot of files:

1. Generate a [new R2 token](https://developers.cloudflare.com/r2/api/s3/tokens/) or reuse an existing one. You only need the `access_key_id` and the `access_key_secret`

2. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

3. Configure the AWS CLI with your Cloudflare credentials:

   ```bash
   # Enter your `access_key_id` and `access_key_secret.
   # Set the region name to `auto`, and the output format to `json`
   aws configure
   ```
  

4. Retrieve your Cloudflare account ID and R2 bucket name from the Cloudflare R2 overview page

5. Upload your folder using the AWS `s3 sync` command. This command synchronizes the contents of your local folder with the R2 bucket:

   - To upload to the bucket root:
  
     ```bash
     aws --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
       s3 sync <FOLDER_PATH> s3://<YOUR_BUCKET_NAME>/ --recursive
     ```
   
   - To upload to a specific subfolder in the bucket:
     
     ```bash
     aws --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
       s3 sync <FOLDER_PATH> s3://<YOUR_BUCKET_NAME>/<SUBFOLDER> --recursive
     ```

I recommend using the `s3 sync` command because it only uploads files that are missing or have changed in the bucket. Alternatively, you can use `s3 cp`, but be aware that it will upload all files, even if they're already present in the bucket.

**This distinction is important for billing purposes**: each upload counts as a writing request to the bucket ([Class A Operation](https://developers.cloudflare.com/r2/pricing/)). By using `s3 sync`, you can minimize these operations and potentially reduce costs, especially when dealing with large numbers of files.
