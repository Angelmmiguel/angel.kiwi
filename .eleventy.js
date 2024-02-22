const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyI18nPlugin } = require('@11ty/eleventy');

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

  // Copy the _redirects file
  eleventyConfig.addPassthroughCopy("_redirects");

  // I18N
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en' // Required
  });

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

  // Filter a list by value or object attribute
  eleventyConfig.addFilter("filterList", (array, val) => {
    return array.filter((el) => {
      if (typeof el == "object") {
        return el[val];
      } else {
        return el != val;
      }
    });
  });

  // Filter a list by the locale (lang)
  eleventyConfig.addFilter("byLocale", (array, locale) => {
    return array.filter(el => el.page.lang == locale);
  });

  // Set the right locale. This is a limitation on the I18N plugin,
  // as it sets the page.lang locale by default. This site uses no prefix
  // for English
  eleventyConfig.addFilter("localePrefix", function(url) {
    let prefix = "";

    // Adding the prefix manually as I cannot access the languages
    // data from here.
    if (this.page.lang == "es") {
      prefix = "/es";
    }

    return `${prefix}${url}`;
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
