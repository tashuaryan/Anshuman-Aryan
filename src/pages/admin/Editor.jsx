import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { uploadImage } from '../../lib/uploadImage'
import RichTextEditor from '../../components/RichTextEditor'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const inputClass =
  'mt-2 w-full border border-ink/20 bg-white px-4 py-3 outline-none focus:border-accent'
const labelClass = 'mt-6 text-xs uppercase tracking-widest text-ink/60'

const subtopics = {
  sports: ['NFL', 'UFC', 'College Football', 'NBA'],
  entertainment: ['Movies', 'Web Series'],
}

export default function Editor() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('sports')
  const [subcategory, setSubcategory] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [featured, setFeatured] = useState(false)
  const [wasPublished, setWasPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    async function load() {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
      if (error) return setError(error.message)
      setTitle(data.title)
      setCategory(data.category)
      setSubcategory(data.subcategory || '')
      setSummary(data.summary)
      setContent(data.content)
      setImageUrl(data.image_url || '')
      setFeatured(data.featured)
      setWasPublished(data.published)
    }
    load()
  }, [id])

  async function handleCover(e) {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setError('')
    try {
      setImageUrl(await uploadImage(file))
    } catch (err) {
      setError('Photo upload failed: ' + err.message)
    }
    setUploading(false)
  }

  async function save(publish) {
    if (!title.trim() || !summary.trim()) {
      return setError('Please add a title and a summary first.')
    }
    setSaving(true)
    setError('')

    const row = {
      title: title.trim(),
      category: category,
      subcategory: subcategory || null,
      summary: summary.trim(),
      content: content,
      image_url: imageUrl || null,
      featured: featured,
      published: publish,
    }
    if (publish && !wasPublished) row.published_at = new Date().toISOString()

    let result
    if (id) {
      result = await supabase.from('articles').update(row).eq('id', id)
    } else {
      const slug = slugify(title) + '-' + Date.now().toString(36)
      result = await supabase.from('articles').insert({ ...row, slug: slug })
    }

    setSaving(false)
    if (result.error) setError(result.error.message)
    else navigate('/admin')
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/admin" className="text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-accent">
          ← Back
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => save(false)}
            disabled={saving || uploading}
            className="border border-ink px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-sand disabled:opacity-50"
          >
            {wasPublished ? 'Save as draft' : 'Save draft'}
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving || uploading}
            className="bg-ink px-5 py-3 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent disabled:opacity-50"
          >
            {saving ? 'Saving...' : wasPublished ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <h1 className="mt-8 font-display text-5xl">{id ? 'Edit article' : 'New article'}</h1>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      <p className={labelClass}>Title</p>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className={labelClass}>Category</p>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setSubcategory('')
            }}
            className={inputClass}
          >
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <p className={labelClass}>Sub-topic</p>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className={inputClass}
          >
            <option value="">None</option>
            {subtopics[category].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            {subcategory && !subtopics[category].includes(subcategory) && (
              <option value={subcategory}>{subcategory}</option>
            )}
          </select>
        </div>
      </div>

      <p className={labelClass}>Cover photo</p>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-24 w-36 shrink-0 overflow-hidden bg-sand">
          {imageUrl && <img src={imageUrl} alt="" className="h-full w-full object-cover" />}
        </div>
        <label className="cursor-pointer border border-ink px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper">
          {uploading ? 'Uploading...' : imageUrl ? 'Change photo' : 'Upload photo'}
          <input type="file" accept="image/*" onChange={handleCover} className="hidden" />
        </label>
        {imageUrl && (
          <button
            type="button"
            onClick={() => setImageUrl('')}
            className="text-xs uppercase tracking-widest text-red-600"
          >
            Remove
          </button>
        )}
      </div>

      <p className={labelClass}>Short summary</p>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={3}
        className={inputClass}
      />

      <p className={labelClass}>Article</p>
      <div className="mt-2">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <label className="mt-6 flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4"
        />
        Show in the big slider on its category page
      </label>
    </section>
  )
}