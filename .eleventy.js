const markdownIt = require('markdown-it');
const { feedPlugin } = require('@11ty/eleventy-plugin-rss');

const md = markdownIt({ html: true, linkify: true });

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/CNAME');
  eleventyConfig.addPassthroughCopy({ 'src/favicon.ico': 'favicon.ico' });

  // Markdown filter for rendering markdown strings in templates (e.g. resume data)
  eleventyConfig.addFilter('md', (content) => {
    if (!content) return '';
    return md.render(content);
  });

  // Date formatting filters
  eleventyConfig.addFilter('displayDate', (dateVal) => {
    if (!dateVal || dateVal === 'Present') return dateVal;
    const date = new Date(dateVal);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
  });

  eleventyConfig.addFilter('blogDate', (dateVal) => {
    const date = new Date(dateVal);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  });

  // Blog collection
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/blog/*.md').reverse();
  });

  // RSS feed plugin
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom',
    outputPath: '/feed.xml',
    collection: {
      name: 'blog',
      limit: 10,
    },
    metadata: {
      language: 'en',
      title: 'Danny Anderson',
      subtitle: 'Software developer and musician.',
      base: 'https://danny-anderson.com/',
      author: {
        name: 'Danny Anderson',
        email: 'danny@danny-anderson.com',
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
      layouts: '_includes/layouts',
    },
    templateFormats: ['njk', 'md', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
