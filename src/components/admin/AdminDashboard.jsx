import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  reservationStatusDescriptions,
  reservationStatuses,
} from '../../data/restaurant.js'
import { supabase } from '../../lib/supabase.js'
import StatusBadge from './StatusBadge.jsx'

const statusOptions = ['pending', 'accepted', 'rejected', 'cancelled']

function formatDate(value) {
  if (!value) return 'Sem data'
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function AdminDashboard({ session }) {
  const [reservations, setReservations] = useState([])
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [draftNotes, setDraftNotes] = useState({})
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')

  const stats = useMemo(() => {
    return reservations.reduce(
      (currentStats, reservation) => {
        const status = reservation.status || 'pending'
        currentStats.total += 1
        currentStats[status] = (currentStats[status] || 0) + 1
        return currentStats
      },
      { total: 0, pending: 0, accepted: 0, rejected: 0, cancelled: 0 },
    )
  }, [reservations])

  const loadReservations = useCallback(async () => {
    setLoading(true)
    setError('')

    let query = supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (dateFilter) {
      query = query.eq('date', dateFilter)
    }

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    const { data, error: loadError } = await query

    if (loadError) {
      setError(loadError.message)
      setReservations([])
    } else {
      setReservations(data || [])
      setDraftNotes(
        Object.fromEntries(
          (data || []).map((reservation) => [
            reservation.id,
            reservation.owner_notes || '',
          ]),
        ),
      )
    }

    setLoading(false)
  }, [dateFilter, statusFilter])

  useEffect(() => {
    loadReservations()
  }, [loadReservations])

  const updateReservation = async (reservation, patch) => {
    setSavingId(reservation.id)
    setError('')

    const { error: updateError } = await supabase
      .from('reservations')
      .update(patch)
      .eq('id', reservation.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      await loadReservations()
    }

    setSavingId(null)
  }

  const updateStatus = (reservation, nextStatus) => {
    const patch = {
      status: nextStatus,
      confirmed_at:
        nextStatus === 'accepted' ? new Date().toISOString() : null,
      rejected_at: nextStatus === 'rejected' ? new Date().toISOString() : null,
    }

    updateReservation(reservation, patch)
  }

  const updateNote = (reservation) => {
    updateReservation(reservation, {
      owner_notes: draftNotes[reservation.id] || '',
    })
  }

  return (
    <main className="min-h-screen bg-[#fbf4e6] px-5 py-8 text-[#173b2c] sm:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-[#d8c9aa] pb-6 md:flex-row md:items-end">
          <div>
            <a
              href="/"
              className="text-sm font-bold uppercase tracking-[0.22em] text-[#9f2f21] transition hover:text-[#173b2c]"
            >
              Voltar ao site
            </a>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
              Reservas
            </h1>
            <p className="mt-3 text-[#5d6a57]">
              Sessao iniciada como {session.user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="rounded-full border border-[#173b2c] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition hover:bg-[#173b2c] hover:text-white"
          >
            Sair
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            ['Total', stats.total],
            ['Pendentes', stats.pending],
            ['Aceites', stats.accepted],
            ['Recusadas', stats.rejected],
            ['Canceladas', stats.cancelled],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#fff8e8] p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f2f21]">
                {label}
              </p>
              <p className="mt-2 font-serif text-4xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 bg-[#fff8e8] p-5 shadow-sm md:flex-row md:items-end">
          <label className="grid flex-1 gap-2 text-sm font-bold">
            Filtrar por data
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="border border-[#d8c9aa] bg-white px-4 py-3 outline-none focus:border-[#9f2f21]"
            />
          </label>
          <label className="grid flex-1 gap-2 text-sm font-bold">
            Filtrar por estado
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="border border-[#d8c9aa] bg-white px-4 py-3 outline-none focus:border-[#9f2f21]"
            >
              <option value="all">Todos</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {reservationStatuses[status]}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={loadReservations}
            className="rounded-full bg-[#173b2c] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#9f2f21]"
          >
            Atualizar
          </button>
        </div>

        {error && (
          <p className="mt-6 border border-[#d69a87] bg-[#fff0e8] px-4 py-3 text-sm font-semibold text-[#9f2f21]">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-5">
          {loading ? (
            <p className="bg-[#fff8e8] p-6 font-semibold">A carregar...</p>
          ) : reservations.length === 0 ? (
            <p className="bg-[#fff8e8] p-6 font-semibold">
              Nao existem reservas para estes filtros.
            </p>
          ) : (
            reservations.map((reservation) => {
              const status = reservation.status || 'pending'
              return (
                <article
                  key={reservation.id}
                  className="grid gap-5 bg-[#fff8e8] p-5 shadow-sm lg:grid-cols-[1fr_0.95fr]"
                >
                  <div>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h2 className="font-serif text-3xl font-bold">
                          {reservation.name}
                        </h2>
                        <p className="mt-2 text-[#5d6a57]">
                          {reservation.email} · {reservation.phone}
                        </p>
                      </div>
                      <StatusBadge status={status} />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f2f21]">
                          Data
                        </p>
                        <p className="mt-1 font-semibold">
                          {formatDate(reservation.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f2f21]">
                          Hora
                        </p>
                        <p className="mt-1 font-semibold">
                          {reservation.time || 'Sem hora'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f2f21]">
                          Pessoas
                        </p>
                        <p className="mt-1 font-semibold">
                          {reservation.number_of_guests}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-sm font-semibold text-[#5d6a57]">
                      {reservationStatusDescriptions[status]}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((nextStatus) => (
                        <button
                          key={nextStatus}
                          type="button"
                          disabled={savingId === reservation.id}
                          onClick={() => updateStatus(reservation, nextStatus)}
                          className="rounded-full border border-[#d8c9aa] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:border-[#173b2c] hover:bg-[#173b2c] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {reservationStatuses[nextStatus]}
                        </button>
                      ))}
                    </div>

                    <label className="grid gap-2 text-sm font-bold">
                      Notas internas
                      <textarea
                        rows="4"
                        value={draftNotes[reservation.id] || ''}
                        onChange={(event) =>
                          setDraftNotes((currentNotes) => ({
                            ...currentNotes,
                            [reservation.id]: event.target.value,
                          }))
                        }
                        className="resize-none border border-[#d8c9aa] bg-white px-4 py-3 outline-none focus:border-[#9f2f21]"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={savingId === reservation.id}
                      onClick={() => updateNote(reservation)}
                      className="justify-self-start rounded-full bg-[#c9442f] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#9f2f21] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Guardar nota
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard
