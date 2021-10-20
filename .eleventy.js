const dayjs = require("dayjs");

module.exports = function (eleventyConfig) {
  // Copy `css/` to `_site/css`
  eleventyConfig.addPassthroughCopy("static");

  // Date filter
  eleventyConfig.addFilter("date", function (date, format) {
    return dayjs(date).format(format);
  });
};
