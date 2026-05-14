import { sendReservationStatusEmail } from '../src/server/email.js'
import { allowPostOnly, readJsonBody } from '../src/server/http.js'
import { requireAdminClient } from '../src/server/supabaseAdmin.js'

export default async function handler(request, response) {
  if (!allowPostOnly(request, response)) {
    return
  }

  const admin = await requireAdminClient(request)

  if (admin.error) {
    response.status(admin.status).json({ error: admin.error })
    return
  }

  try {
    const { reservationId, status } = await readJsonBody(request)

    if (!reservationId || !status) {
      response.status(400).json({ error: 'reservationId and status required' })
      return
    }

    const { data: reservation, error: reservationError } = await admin.supabase
      .from('reservations')
      .select('*')
      .eq('id', reservationId)
      .single()

    if (reservationError || !reservation) {
      response.status(404).json({ error: 'Reservation not found' })
      return
    }

    const result = await sendReservationStatusEmail(reservation, status)

    response.status(200).json({
      ok: true,
      result,
    })
  } catch (error) {
    response.status(202).json({
      ok: false,
      warning: 'Reservation updated, email skipped',
      error: error.message,
    })
  }
}
