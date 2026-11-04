import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useArticles(category) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (category) query = query.eq('category', category)

      const { data, error } = await query
      if (cancelled) return

      if (error) setError(error.message)
      else setArticles(data)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [category])

  return { articles, loading, error }
}