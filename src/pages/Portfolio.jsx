import { motion } from 'motion/react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'

const spring = { type: 'spring', stiffness: 300, damping: 20 }

const highlights = [
  { value: '500K+', label: 'Pageviews on MSN articles' },
  { value: '600K+', label: 'Views on a Reddit post' },
]

const experience = [
  {
    org: 'Essentially Sports',
    role: 'MSN Slideshow Writer / Reddit Associate',
    dates: 'Mar 2026 - Present',
    points: [
      'Produced SEO-focused NFL, CFB and Combat Sports content, leveraging keyword research and audience insights to maximize reach.',
      'Produced multiple MSN articles surpassing 500K+ pageviews and a Reddit post reaching 600K+ views.',
    ],
  },
  {
    org: 'Collegepur.com',
    role: 'SEO and Web Content Writer Intern',
    dates: 'Jan 2026 - Mar 2026',
    points: [
      'Created SEO-optimized web pages, blogs, and LinkedIn articles based on search intent and brand tone.',
      'Researched and executed on-page SEO (meta tags, internal linking, content organization).',
    ],
  },
  {
    org: 'Agricoaching Chandigarh',
    role: 'Academic Content Writer',
    dates: 'Mar 2025 - Aug 2025',
    points: [
      'Developed and wrote accurate, engaging educational content for agriculture students.',
      'Collaborated with subject matter experts to ensure content accuracy and relevance.',
    ],
  },
  {
    org: 'Airlineza (Airline Website)',
    role: 'Junior SEO Content Writer',
    dates: 'Sep 2022 - Mar 2023',
    points: [
      'Created web content with lead-generation-focused CTAs.',
      'Conducted keyword research and off-page SEO/backlink building.',
      'Optimized content for organic visibility and user engagement.',
    ],
  },
]

const skills = [
  'Copywriting',
  'CTA Development',
  'Lead Generation',
  'Conversion-Focused Content',
  'Audience Research',
  'Content Strategy',
  'On-Page & Off-Page SEO',
]

const education = [
  {
    school: 'Bachelor of Science in Agriculture (Hons.)',
    detail: 'Faculty of Agriculture, Sri Dev Suman Uttarakhand University',
    dates: 'Jul 2021 - Jun 2025 | CGPA 7.57 / 10',
  },
  {
    school: 'Diploma in Computer Applications',
    detail: 'Global Institute of Information Technology',
    dates: 'Jan 2024 - Jun 2024 | 79% (Grade A)',
  },
]

const certifications = [
  'The Complete Content Writing Course for 2026 (3 Courses in 1), Udemy, July 2026',
  'AI Tools & Claude Workshop, be10x, August 2026',
  'Content Writing Internship, Collegepur, Excellent Performance',
]

const places = ['Location 01', 'Location 02', 'Location 03', 'Location 04']

export default function Portfolio() {
  return (
    <>
      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p className="font-display text-lg italic text-accent">The work behind the words</p>
        <h1 className="mt-2 font-display text-6xl uppercase tracking-wide md:text-7xl">Portfolio</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
          Digital Content &amp; Copywriter experienced in sports media, SEO, web content, and
          lead-generation-focused copy. Skilled in CTA development, audience research, and content
          optimization, with multiple articles exceeding 500K+ views.
        </p>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={i * 0.1}>
            <motion.div whileHover={{ scale: 1.04 }} transition={spring} className="bg-sand p-8">
              <p className="font-display text-6xl text-accent">{h.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-ink/70">{h.label}</p>
            </motion.div>
          </Reveal>
        ))}
      </section>
      {/* EXPERIENCE */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle kicker="Where I have written" title="Experience" />
        <div className="space-y-6">
          {experience.map((job) => (
            <Reveal key={job.org}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={spring}
                className="grid gap-4 border border-ink/15 p-6 md:grid-cols-4"
              >
                <p className="text-xs uppercase tracking-widest text-accent">{job.dates}</p>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl">{job.org}</h3>
                  <p className="text-ink/60">{job.role}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/80">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle kicker="What I bring" title="Skills" />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((s) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.1 }}
                transition={spring}
                className="cursor-default border border-ink/20 bg-paper px-5 py-2 text-sm"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION AND CERTIFICATIONS */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl uppercase tracking-wide">Education</h2>
          <div className="mt-6 space-y-6">
            {education.map((e) => (
              <div key={e.school}>
                <h3 className="font-display text-2xl leading-tight">{e.school}</h3>
                <p className="text-ink/60">{e.detail}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-accent">{e.dates}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl uppercase tracking-wide">Certifications</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-ink/80">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* SONG OF THE DAY */}
      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 md:flex-row">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="flex h-56 w-56 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent via-ink to-accent ring-8 ring-paper/10"
          >
            <div className="h-8 w-8 rounded-full bg-paper" />
          </motion.div>

          <Reveal>
            <p className="font-display text-lg italic text-accent">Song of the Day</p>
            <h2 className="mt-2 font-display text-5xl leading-tight">Song title goes here</h2>
            <p className="mt-2 text-paper/60">Artist name</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/70">
              A line about why this song is today's pick will appear here.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.08 }}
              transition={spring}
              className="mt-8 inline-block border border-accent px-6 py-3 text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-paper"
            >
              Listen ↗
            </motion.a>
          </Reveal>
        </div>
      </section>
      {/* TRAVEL DUMP */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionTitle kicker="Pocket full of places" title="Travel Dump" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {places.map((place, i) => (
            <Reveal key={place} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={spring}
                className="flex aspect-square cursor-pointer items-end bg-gradient-to-br from-sand to-accent p-4"
              >
                <span className="font-display text-xl text-ink">{place}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}