import { supabase } from './supabase'

export async function uploadImage(file) {
  const ext = file.name.split('.').pop()
  const path = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext

  const { error } = await supabase.storage.from('article-images').upload(path, file)
  if (error) throw error

  const { data } = supabase.storage.from('article-images').getPublicUrl(path)
  return data.publicUrl
}