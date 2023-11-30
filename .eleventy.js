const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Calculate the content hash
const contentHash = (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(fullPath);
  const hash = crypto.createHash("md5");
  hash.update(content);
  return hash.digest("hex");
};

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy `css/` to `_site/css`
  eleventyConfig.addPassthroughCopy("static");

  // Cache busting methods
  // @ref https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  eleventyConfig.addFilter("bust", (url) => {
    const params = new URLSearchParams("");
    params.set("h", contentHash(url));
    return `${url}?${params}`;
  });

  // Limit a list
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Date filter
  eleventyConfig.addFilter("date", function (date, format) {
    return dayjs(date).format(format);
  });
  
  // Configure Markdown
  eleventyConfig
    .setLibrary(
      'md',
      markdownIt().use(markdownItAttrs)
    )
};
