import { useArticles } from '../hooks/useArticles'
import Slider from '../components/Slider'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'

export default function Category({ category, title, kicker }) {
  const { articles, loading, error } = useArticles(category)

  const featured = articles.filter((a) => a.featured)
  const slides = (featured.length > 0 ? featured : articles).slice(0, 5)
  const slideIds = slides.map((a) => a.id)
  const others = articles.filter((a) => !slideIds.includes(a.id)).slice(0, 4)

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        <p className="font-display text-lg italic text-accent">{kicker}</p>
        <h1 className="mt-1 font-display text-6xl uppercase tracking-wide md:text-7xl">{title}</h1>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        {loading && <p className="text-ink/60">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && articles.length === 0 && (
          <p className="text-ink/60">No articles here yet. Check back soon.</p>
        )}
        <Slider slides={slides} />
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle kicker="Keep reading" title="More stories" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.1}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}