import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function Slider({ slides }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const count = slides.length

  function go(step) {
    setDirection(step)
    setIndex((i) => (i + step + count) % count)
  }

  function jump(i) {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  useEffect(() => {
    if (paused || count < 2) return
    const timer = setInterval(() => go(1), 6000)
    return () => clearInterval(timer)
  }, [paused, count, index])

  if (count === 0) return null

  const slide = slides[index % count]

  return (
    <div
      className="relative h-[420px] overflow-hidden bg-ink md:h-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Link to={'/article/' + slide.slug} className="block h-full w-full">
            {slide.image_url && (
              <img src={slide.image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-3xl p-8 pb-12 text-paper md:p-14 md:pb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-paper/70">
                {slide.subcategory || slide.category}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{slide.title}</h2>
              <p className="mt-4 line-clamp-2 max-w-xl text-paper/80">{slide.summary}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.25em]">Read article →</p>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {count > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-ink/40 px-4 py-3 text-2xl text-paper transition-colors hover:bg-accent"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-ink/40 px-4 py-3 text-2xl text-paper transition-colors hover:bg-accent"
            aria-label="Next"
          >
            ›
          </button>

          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => jump(i)}
                aria-label={'Slide ' + (i + 1)}
                className={
                  'h-2 transition-all ' +
                  (i === index ? 'w-8 bg-paper' : 'w-2 bg-paper/50 hover:bg-paper')
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}