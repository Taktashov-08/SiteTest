import { sendNewReservationEmails } from '../src/server/email.js'
import { allowPostOnly, readJsonBody } from '../src/server/http.js'

export default async function handler(request, response) {
  if (!allowPostOnly(request, response)) {
    return
  }

  try {
    const reservation = await readJsonBody(request)
    const result = await sendNewReservationEmails(reservation)

    response.status(200).json({
      ok: true,
      result,
    })
  } catch (error) {
    response.status(202).json({
      ok: false,
      warning: 'Reservation saved, email skipped',
      error: error.message,
    })
  }
}
