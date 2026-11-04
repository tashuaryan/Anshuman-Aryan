import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

export default function Dashboard() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, category, subcategory, image_url, published')
        .order('created_at', { ascending: false })

      if (error) setError(error.message)
      else setArticles(data)
      setLoading(false)
    }
    load()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function togglePublished(article) {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id)

    if (error) return setError(error.message)
    setArticles(
      articles.map((a) =>
        a.id === article.id ? { ...a, published: !a.published } : a
      )
    )
  }

  async function remove(article) {
    if (!window.confirm('Delete "' + article.title + '" for good?')) return

    const { error } = await supabase.from('articles').delete().eq('id', article.id)

    if (error) return setError(error.message)
    setArticles(articles.filter((a) => a.id !== article.id))
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-5xl">Dashboard</h1>
        <div className="flex items-center gap-6">
          <Link
            to="/admin/new"
            className="bg-ink px-5 py-3 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
          >
            + New article
          </Link>
          <button
            onClick={signOut}
            className="text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-accent"
          >
            Sign out
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink/60">Signed in as {session?.user?.email}</p>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-10 text-ink/60">Loading...</p>}
      {!loading && articles.length === 0 && (
        <p className="mt-10 text-ink/60">No articles yet.</p>
      )}

      <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {articles.map((a) => (
          <li key={a.id} className="flex flex-wrap items-center gap-4 py-4">
            <div className="h-16 w-24 shrink-0 overflow-hidden bg-sand">
              {a.image_url && (
                <img src={a.image_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-display text-xl leading-tight">{a.title}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/60">
                {a.category}
                {a.subcategory ? ' · ' + a.subcategory : ''}
              </p>
            </div>

            <span
              className={
                'px-2 py-1 text-[10px] uppercase tracking-widest ' +
                (a.published ? 'bg-accent text-paper' : 'bg-sand text-ink/60')
              }
            >
              {a.published ? 'Live' : 'Draft'}
            </span>

            <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
              <Link to={'/admin/edit/' + a.id} className="hover:text-accent">
                Edit
                </Link>
              <button onClick={() => togglePublished(a)} className="hover:text-accent">
                {a.published ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => remove(a)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}