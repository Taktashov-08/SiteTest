async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object') {
    return request.body
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}')
  }

  const chunks = []
  for await (const chunk of request) {
    chunks.push(chunk)
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.RESERVATION_NOTIFY_EMAIL
  const fromEmail =
    process.env.RESERVATION_FROM_EMAIL || 'Reservas <onboarding@resend.dev>'

  if (!resendApiKey || !notifyEmail) {
    response.status(204).end()
    return
  }

  const reservation = await readJsonBody(request)

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: notifyEmail,
      subject: `Novo pedido de reserva - ${reservation.date} ${reservation.time}`,
      html: `
        <h1>Novo pedido de reserva</h1>
        <p><strong>Nome:</strong> ${reservation.name}</p>
        <p><strong>Email:</strong> ${reservation.email}</p>
        <p><strong>Telefone:</strong> ${reservation.phone}</p>
        <p><strong>Data:</strong> ${reservation.date}</p>
        <p><strong>Hora:</strong> ${reservation.time}</p>
        <p><strong>Pessoas:</strong> ${reservation.number_of_guests}</p>
        <p>Entre no painel admin para aceitar ou recusar este pedido.</p>
      `,
    }),
  })

  if (!emailResponse.ok) {
    response.status(202).json({ warning: 'Reservation saved, email skipped' })
    return
  }

  response.status(200).json({ ok: true })
}
