import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  numberOfGuests: '2',
}

function ReservationForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    if (!isSupabaseConfigured) {
      setStatus('error')
      setMessage(
        'Configura o VITE_SUPABASE_URL e o VITE_SUPABASE_ANON_KEY para guardar reservas.',
      )
      return
    }

    const reservation = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      number_of_guests: Number(form.numberOfGuests),
    }

    const { error } = await supabase.from('reservations').insert([reservation])

    if (error) {
      setStatus('error')
      setMessage(
        'Não foi possível enviar a reserva. Tenta novamente dentro de instantes.',
      )
      return
    }

    setStatus('success')
    setMessage('Reserva enviada com sucesso. Entraremos em contacto em breve.')
    setForm(initialForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fff8e8] p-6 text-[#173b2c] shadow-xl shadow-[#9d7b3d]/10 sm:p-8"
    >
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9f2f21]">
        Reservas
      </p>
      <h3 className="mt-3 font-serif text-3xl font-bold leading-tight">
        Reserve a sua mesa
      </h3>
      <p className="mt-3 leading-7 text-[#5d6a57]">
        Envie os seus dados e confirmamos a disponibilidade por telefone ou
        email.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Nome
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={updateField}
            autoComplete="name"
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Telefone
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={updateField}
            autoComplete="tel"
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Número de pessoas
          <input
            required
            min="1"
            max="20"
            type="number"
            name="numberOfGuests"
            value={form.numberOfGuests}
            onChange={updateField}
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Data
          <input
            required
            type="date"
            name="date"
            value={form.date}
            onChange={updateField}
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#173b2c]">
          Hora
          <input
            required
            type="time"
            name="time"
            value={form.time}
            onChange={updateField}
            className="border border-[#d8c9aa] bg-white px-4 py-3 font-sans font-medium text-[#173b2c] outline-none transition focus:border-[#9f2f21] focus:ring-2 focus:ring-[#9f2f21]/20"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-full bg-[#c9442f] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#9f2f21]/20 transition hover:bg-[#a93224] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'A enviar...' : 'Enviar reserva'}
      </button>

      {message && (
        <p
          className={`mt-4 border px-4 py-3 text-sm font-semibold ${
            status === 'success'
              ? 'border-[#7a9f6d] bg-[#edf5e6] text-[#27502f]'
              : 'border-[#d69a87] bg-[#fff0e8] text-[#9f2f21]'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}

export default ReservationForm
