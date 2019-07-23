/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// Small tweak to allow Gatsby to work with pnpm.
let gatsbyNodeModules = require('fs').realpathSync('node_modules/gatsby');
gatsbyNodeModules = path.resolve(gatsbyNodeModules, '..');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [gatsbyNodeModules, 'node_modules'],
    },
  });
};

// Page creation from Markdown blog posts

exports.createPages = ({ boundActionCreators, graphql}) => {
  const { createPage } = boundActionCreators;
  const postTemplate = path.resolve('src/templates/blog-post.js');

  return graphql(`
  {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          path
          date
          author
        }
      }
    }
  }
}
  `).then( result => {
    result.data.allMarkdownRemark.edges.forEach( ({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      });
    })
  });

}
