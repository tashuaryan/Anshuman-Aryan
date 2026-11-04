import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setError('Wrong email or password.')
    else navigate('/admin')
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <p className="font-display text-lg italic text-accent">Writer access</p>
        <h1 className="mt-1 font-display text-5xl">Sign in</h1>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-8 w-full border border-ink/20 bg-white px-4 py-3 outline-none focus:border-accent"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full border border-ink/20 bg-white px-4 py-3 outline-none focus:border-accent"
        />

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full bg-ink px-4 py-3 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent disabled:opacity-50"
        >
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  )
}