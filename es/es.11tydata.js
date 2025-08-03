// From https://github.com/madrilene/eleventy-i18n/
export default {
  lang: 'es',
  langPrefix: 'es/',
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      let splitUrl = data.page.filePathStem.split("/");
      console.log(splitUrl);
      let withoutSlug = splitUrl.slice(0, splitUrl.length - 1).join("/")

      return `/${withoutSlug}/${this.slugify(data.slugOverride)}/`;
    }
  }
};