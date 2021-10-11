module.exports = function (eleventyConfig) {
  // Copy `css/` to `_site/css`
  eleventyConfig.addPassthroughCopy("static");
};
