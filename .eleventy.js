module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true)

  // Copy static assets to /_site
  eleventyConfig.addPassthroughCopy('./src/static')

  eleventyConfig.addFilter('title', (title) => {
    if (!title) return 'CRB Apps'

    return `${title} | CRB Apps`
  })

  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    // Using markdown causes some html to be rendered into code blocks
    markdownTemplateEngine: false,
  }
}
