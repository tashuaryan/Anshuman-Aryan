import { motion } from 'motion/react'
import { useArticles } from '../hooks/useArticles'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import ArticleCard from '../components/ArticleCard'

export default function Home() {
  const { articles, loading } = useArticles()
  const latest = articles.slice(0, 3)

  return (
    <>
      {/* BANNER */}
      <section className="bg-ink text-paper">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-display text-5xl font-medium uppercase tracking-wide md:text-7xl"
          >
            Anshuman Aryan
          </motion.h1>
          <div className="mt-6 h-px w-16 bg-accent" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-xl font-display text-2xl italic text-paper/70"
          >
            Sports, screen and everything in between, written daily.
          </motion.p>
        </div>
      </section>

      {/* NEW POSTS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionTitle kicker="Fresh off the keyboard" title="New Posts" />

        {loading && <p className="text-center text-ink/60">Loading...</p>}

        <div className="grid gap-8 md:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.1}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}