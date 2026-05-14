const statusCopy = {
  accepted: {
    subject: 'Reserva confirmada',
    title: 'A sua reserva foi confirmada',
    body: 'A sua reserva foi aceite pelo restaurante. Obrigado pelo seu pedido.',
  },
  rejected: {
    subject: 'Pedido de reserva sem disponibilidade',
    title: 'Nao foi possivel confirmar a sua reserva',
    body: 'Infelizmente nao existe disponibilidade para a data e hora pedidas.',
  },
  cancelled: {
    subject: 'Reserva cancelada',
    title: 'A sua reserva foi cancelada',
    body: 'A reserva foi marcada como cancelada pelo restaurante.',
  },
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function getEmailConfig() {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    ownerEmail: process.env.RESERVATION_NOTIFY_EMAIL,
    fromEmail:
      process.env.RESERVATION_FROM_EMAIL || 'Reservas <onboarding@resend.dev>',
    siteUrl: process.env.SITE_URL || 'https://iltartufo-coimbra.vercel.app',
    restaurantName: process.env.RESTAURANT_NAME || 'Il Tartufo',
  }
}

function reservationDetailsHtml(reservation) {
  return `
    <p><strong>Nome:</strong> ${escapeHtml(reservation.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(reservation.email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(reservation.phone)}</p>
    <p><strong>Data:</strong> ${escapeHtml(reservation.date)}</p>
    <p><strong>Hora:</strong> ${escapeHtml(reservation.time)}</p>
    <p><strong>Pessoas:</strong> ${escapeHtml(reservation.number_of_guests)}</p>
  `
}

async function sendEmail({ to, subject, html }) {
  const { resendApiKey, fromEmail } = getEmailConfig()

  if (!resendApiKey || !to) {
    return { skipped: true }
  }

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html,
    }),
  })

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text()
    return {
      error: `Resend failed with ${emailResponse.status}: ${errorText}`,
    }
  }

  return { ok: true }
}

export async function sendNewReservationEmails(reservation) {
  const { ownerEmail, restaurantName, siteUrl } = getEmailConfig()

  const ownerEmailResult = await sendEmail({
    to: ownerEmail,
    subject: `Novo pedido de reserva - ${reservation.date} ${reservation.time}`,
    html: `
      <h1>Novo pedido de reserva</h1>
      ${reservationDetailsHtml(reservation)}
      <p>Entre no painel admin para aceitar ou recusar este pedido:</p>
      <p><a href="${escapeHtml(siteUrl)}/admin">Abrir painel de reservas</a></p>
    `,
  })

  const customerEmailResult = await sendEmail({
    to: reservation.email,
    subject: `Pedido de reserva recebido - ${restaurantName}`,
    html: `
      <h1>Recebemos o seu pedido de reserva</h1>
      <p>Obrigado pelo contacto. O seu pedido ainda nao esta confirmado.</p>
      <p>A equipa do ${escapeHtml(
        restaurantName,
      )} ira confirmar a disponibilidade em breve.</p>
      ${reservationDetailsHtml(reservation)}
    `,
  })

  return { ownerEmailResult, customerEmailResult }
}

export async function sendReservationStatusEmail(reservation, status) {
  const { restaurantName } = getEmailConfig()
  const copy = statusCopy[status]

  if (!copy) {
    return { skipped: true }
  }

  return sendEmail({
    to: reservation.email,
    subject: `${copy.subject} - ${restaurantName}`,
    html: `
      <h1>${copy.title}</h1>
      <p>${copy.body}</p>
      ${reservationDetailsHtml(reservation)}
      <p>Para qualquer alteracao, contacte diretamente o restaurante.</p>
    `,
  })
}
