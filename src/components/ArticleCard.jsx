import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const spring = { type: 'spring', stiffness: 300, damping: 20 }

export default function ArticleCard({ article }) {
  const date = new Date(article.published_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link to={'/article/' + article.slug} className="block">
      <motion.article whileHover={{ scale: 1.04 }} transition={spring}>
        <div className="aspect-[4/3] w-full overflow-hidden bg-sand">
          {article.image_url && (
            <img src={article.image_url} alt={article.title} className="h-full w-full object-cover" />
          )}
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-accent">{date}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight">{article.title}</h3>
        <div className="mt-3 border-t border-ink/15 pt-3 text-[11px] uppercase tracking-widest text-ink/60">
          {article.subcategory || article.category}
        </div>
      </motion.article>
    </Link>
  )
}