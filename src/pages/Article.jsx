import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { supabase } from '../lib/supabase'

export default function Article() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()
      setArticle(data)
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return <p className="mx-auto max-w-3xl px-6 py-24 text-ink/60">Loading...</p>
  }

  if (!article) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-5xl">Article not found</h1>
        <Link to="/" className="mt-6 inline-block text-accent hover:underline">
          Back to home
        </Link>
      </section>
    )
  }

  const date = new Date(article.published_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to={'/' + article.category}
        className="text-xs uppercase tracking-[0.2em] text-accent hover:underline"
      >
        ← {article.category}
      </Link>

      <h1 className="mt-6 font-display text-5xl leading-tight md:text-6xl">{article.title}</h1>
      <p className="mt-4 text-xs uppercase tracking-widest text-ink/60">
        {date}
        {article.subcategory ? ' · ' + article.subcategory : ''}
      </p>

      {article.image_url && (
        <img src={article.image_url} alt={article.title} className="mt-8 w-full" />
      )}

      <p className="mt-8 font-display text-2xl italic leading-relaxed text-ink/70">
        {article.summary}
      </p>

      <div
        className="article-content mt-8"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
      />
    </article>
  )
}