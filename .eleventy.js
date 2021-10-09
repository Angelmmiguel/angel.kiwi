module.exports = function (eleventyConfig) {
  // Output directory: _site

  // Copy `css/` to `_site/css`
  eleventyConfig.addPassthroughCopy("static");
};
