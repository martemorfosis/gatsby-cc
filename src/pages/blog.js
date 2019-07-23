import React from 'react'
import { Link, graphql } from 'gatsby';
import Layout from './../components/layout';

export default function BlogPage({data}) {
  return (
    <Layout>
      <h1>Latest Posts</h1>
      {data.allMarkdownRemark.edges.map( post => (
        <div key={post.node.id}>
          <h3>{post.node.frontmatter.title}</h3>
          <small>Posted by {post.node.frontmatter.author} on {post.node.frontmatter.date}</small>
          <br></br>
          <Link to={post.node.frontmatter.path}>Read More...</Link>
          <hr/>
        </div>
      )
      )}
    </Layout>
  )
}

export const query = graphql`
query BlogEntriesQuery {
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
`
