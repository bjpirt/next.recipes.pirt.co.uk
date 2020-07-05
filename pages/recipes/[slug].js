import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
const glob = require('glob')

export default function Recipe(props) {
  // Render data from `getStaticProps`
  return (
    // <Layout siteTitle={props.siteTitle}>
      <article>
        <h1>{props.frontmatter.title}</h1>
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {props.frontmatter.ingredients.map((ingredient, k) => (
              <li key={k}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="method">
          <h2>Method</h2>
          <ul>
            {props.frontmatter.method.map((step, k) => (
              <li key={k}>{step}</li>
            ))}
          </ul>
        </div>
        <div>
          <ReactMarkdown source={props.markdownBody} />
        </div>
      </article>
    // </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../_collections/recipes/${slug}.md`)
  const data = matter(content.default)

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  //get all .md files in the recipes dir
  const recipes = glob.sync('_collections/recipes/*.md')
  //remove path and extension to leave filename only
  const recipeSlugs = recipes.map(file =>
    file
      .split('/')[2]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // create paths with `slug` param
  const paths = recipeSlugs.map(slug => `/recipes/${slug}`)
  return {
    paths,
    fallback: false,
  }
}
