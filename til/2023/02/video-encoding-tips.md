---
layout: blog.njk
title: Some personal tips for video encoding
description: Creating video content is not an easy task. After working on a new video, I collected some of the tips that helped me to configure my encoding options. You can always increase all the quality parameters, but that will increase the processing time too.
type: article
tags:
  - til
  - video
date: 2023-02-22
updated: 2023-02-22
background: linear-gradient(90deg, rgb(102, 18, 204) 0%, rgb(199, 41, 30) 100%);
---

Creating video content is not an easy task. You first need to prepare your environment (pre-production), record all the videos (production), and make the final composition (post-production). Every step has its challenges, and **mastering all of them requires time (a lot of time)**.

Fortunately, you don't need to take all of them at once. You can start creating and uploading your videos to get practice and improve on each of them. I'm still a newbie, **trying to understand how to get the best quality from my current setup**.

Today, I was post-producing a video to showcase the new version of a project. I recorded everything and started to edit it in [Shotcut](https://shotcut.org/). After merging multiple shots and applying video / audio filters, it's time to export the video. At this point, you need to decice between a huge list of options. Again, it takes time to find the right configuration for your videos, platform and environment.

However, I may give you some things I learned today about video encoding:

* You may increase audio and video quality, however some options may drastically increase the processing time and the file size. 
* The best source of information about encoding options is the platform you plan to upload your video:
    * [Youtube](https://support.google.com/youtube/answer/1722171)
    * [Vimeo](https://vimeo.zendesk.com/hc/en-us/articles/360056550451-Video-and-audio-compression-guidelines)
    * [Twitch](https://stream.twitch.tv/encoding/)
* There are no magic rules. The right bitrate, fps (frames per second) and other parameters depend on your content, source video, and other factors.
* After applying the recommended configuration, tweak and play with the other parameters:
    * Create a separate video project
    * Crop your current production to 2 minutes
    * Export using the recommended configuration and see how much time it takes and the quality you get
    * Tweak one parameter and export the video
    * How does it affect the quality? What about enconding time?
    * Read or watch some videos about the topic. Some of them may be complex, so be sure you first get an introduction.
    * Repeat with a different parameter

## Bonus tip

If you use [Shotcut](https://shotcut.org/) on MacOS, don't forget to enable "parallel processing" when exporting a video! I read in some forums this option may cause the video encoding to be slower, but it saved me a lot of time today 😊