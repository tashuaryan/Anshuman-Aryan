export default function SectionTitle({ kicker, title }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-display text-lg italic text-accent">{kicker}</p>
      <h2 className="font-display text-4xl uppercase tracking-wide md:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-12 bg-ink/40" />
    </div>
  )
}