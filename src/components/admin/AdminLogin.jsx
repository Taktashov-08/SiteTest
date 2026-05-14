import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase.js'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (!isSupabaseConfigured) {
      setError('Configura as variaveis Supabase antes de usar o painel.')
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#10281f] px-5 py-12 text-[#fff8e8] sm:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <a
            href="/"
            className="text-sm font-bold uppercase tracking-[0.22em] text-[#e3b35f] transition hover:text-white"
          >
            Voltar ao site
          </a>
          <h1 className="mt-8 font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Painel privado de reservas
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d9d0bd]">
            A equipa entra aqui para ver pedidos pendentes, aceitar, recusar,
            cancelar e guardar notas internas.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#fff8e8] p-7 text-[#173b2c] shadow-2xl shadow-black/20 sm:p-9"
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9f2f21]">
            Login admin
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold">
            Aceder as reservas
          </h2>

          <div className="mt-7 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                className="border border-[#d8c9aa] bg-white px-4 py-3 outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Palavra-passe
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="border border-[#d8c9aa] bg-white px-4 py-3 outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#173b2c] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#9f2f21] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>

          {error && (
            <p className="mt-4 border border-[#d69a87] bg-[#fff0e8] px-4 py-3 text-sm font-semibold text-[#9f2f21]">
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default AdminLogin
