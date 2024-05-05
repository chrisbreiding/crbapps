module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true)

  // Copy static assets to /_site
  eleventyConfig.addPassthroughCopy('./src/static')

  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    // Using markdown causes some html to be rendered into code blocks
    markdownTemplateEngine: false,
  }
}
