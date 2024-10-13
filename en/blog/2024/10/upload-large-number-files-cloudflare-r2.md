---
layout: blog.njk
title: Uploading a large number of files to Cloudflare R2
description: TBD
type: article
tags:
  - post
  - hosting
date: 2024-06-22
updated: 2024-06-22
background: linear-gradient(90deg, rgb(80, 23, 44) 0%, rgb(188, 12, 70) 100%);
---

[Cloudflare R2](https://developers.cloudflare.com/r2/) is an generic object storage with a S3-compatible API. You can combine it with other Cloudflare features like caching and firewall rules. It also offers a generous free tier that fulfill the requirements of many projects.

I started using it recently and had to upload more than 7000 files. As you might guess, the Cloudflare Dashboard website won't support such a large number of files. You need to use an alternative method like Wrangler, the Cloudflare CLI, or the AWS S3 CLI. 

After getting my hands into work, I found there's a quick winner here.

# How to upload 7000 files to Cloudlare R2?

Like S3, the first step to upload your files to Cloudflare R2 is to create a bucket. In Cloudflare, it is ja container for your files with a set of permissions, domains, and rules. The Cloudflare UI only allows you to upload 100 files, so I couldn't use it.

Then, I tried with [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/). This CLI provides the `r2 putObject` method to upload files into your R2 bucket. However, it has some serious limitations:

* The [R2 API token you generate following the official guide](https://developers.cloudflare.com/r2/api/s3/tokens/) doesn't work out of the box. The Wrangler CLI will complain about missing permissions to access the `/memberships` endpoint. [You can find a workaround here](https://github.com/cloudflare/workers-sdk/issues/1422#issuecomment-1189496401)
* You cannot upload a folder and uploading it file by file is extremely slow

Due to these issues, I ended up using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Cloudflare has a [complete guide about using the AWS CLI to manage R2 buckets](), but here you have a TL;DR to upload an entire folder with more than 7000 files:

* Generate a [new R2 token](https://developers.cloudflare.com/r2/api/s3/tokens/) or reuse an existing one. You only need the `access_key_id` and the `access_key_secret`
* Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* Configure the AWS CLI with your Cloudflare credentials. Introduce the `access_key_id` and `access_key_secret`, set the region name to `auto`, and the output format to `json`:

  ```bash
  aws configure
  ```
  
* Retrieve your Cloudflare account ID and R2 bucket name, you can find them on the Cloudflare R2 overview page
* Upload your folder using the AWS `s3 sync` method:

  * Upload it in the bucket root:

    ```bash
    aws --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
      s3 sync <FOLDER_PATH> --recursive s3://<YOUR_BUCKET_NAME>/
    ```
  
  * Upload it in a subfolder:

    ```bash
    aws --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
      s3 sync <FOLDER_PATH> --recursive s3://<YOUR_BUCKET_NAME>/<SUBFOLDER>
    ```

I prefer the `s3 sync` command as it only upload the files that are missing. You can use the `s3 cp` too, although it will upload the files even they are present. This behavior will affect the billing as you are sending multiple writing requests to the bucket ([Class A Operations](https://developers.cloudflare.com/r2/pricing/)).
