import Head from "next/head";
import Link from "next/link";
import matter from 'gray-matter'

const Index = props => {
    return (
      <>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
          <h1>Recipes</h1>
          {/* <HomeContent /> */}
          <ul>
            {props.recipes.map((recipe, k) => (
              <li key={k}>
                <h2><Link href={`/recipes/${recipe.slug}`}><a>{recipe.frontmatter.title}</a></Link></h2>
              </li>
            ))}
          </ul>
        </article>
      </>
    )
}

export default Index

export async function getStaticProps() {
  const recipes = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../_collections/recipes', true, /\.md$/))

  return {
    props: {
      recipes
    },
  }

}
