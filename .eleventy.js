const path = require('path')
const fs = require('fs-extra')

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false)

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true)

  // Copy static assets to /_site
  eleventyConfig.addPassthroughCopy('./src/**/*.(js|png|webmanifest)')

  const copyOutFiles = fs.readdirSync(path.join(__dirname, 'src', '_shared')).filter((file) => {
    return !file.startsWith('.')
  })
  const copyOutDestinations = fs.readdirSync(path.join(__dirname, 'src'), { withFileTypes: true }).filter((file) => {
    return file.isDirectory() && !file.name.startsWith('_')
  }).map((file) => file.name)

  for (const copyOutFile of copyOutFiles) {
    for (const copyOutDestination of copyOutDestinations) {
      try {
        fs.copySync(
          path.join(__dirname, 'src', '_shared', copyOutFile),
          path.join(__dirname, '_site', copyOutDestination, copyOutFile)
        )
      } catch (err) {
        console.error(`Failed to copy ${copyOutFile} to ${copyOutDestination}: ${err.message}`)
      }
    }
  }

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
