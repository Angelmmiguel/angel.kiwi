const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

// Calculate the content hash
const contentHash = (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(fullPath);
  const hash = crypto.createHash("md5");
  hash.update(content);
  return hash.digest("hex");
};

module.exports = function (eleventyConfig) {
  // Copy `css/` to `_site/css`
  eleventyConfig.addPassthroughCopy("static");

  // Cache busting methods
  // @ref https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
  eleventyConfig.addFilter("bust", (url) => {
    const params = new URLSearchParams("");
    params.set("h", contentHash(url));
    return `${url}?${params}`;
  });

  // Date filter
  eleventyConfig.addFilter("date", function (date, format) {
    return dayjs(date).format(format);
  });
};
