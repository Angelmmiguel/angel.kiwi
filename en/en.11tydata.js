// From https://github.com/madrilene/eleventy-i18n/
module.exports = {
  lang: 'en',
  langPrefix: '',
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${this.slugify(data.slugOverride)}/`;
    } else {
      let stem = data.page.filePathStem;

      // Remove the first part.
      let slug = stem.split("/").slice(2).join("/");

      if (slug.endsWith("index")) {
        slug = slug.replace(/index$/, "");
      }

      return `/${slug}/`;
    }
  }
};