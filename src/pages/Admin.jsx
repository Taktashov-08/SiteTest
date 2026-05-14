import { useEffect, useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard.jsx'
import AdminLogin from '../components/admin/AdminLogin.jsx'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#10281f] px-5 text-[#fff8e8]">
        <p className="font-semibold">A abrir painel...</p>
      </main>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard session={session} />
}

export default Admin
