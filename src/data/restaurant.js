export const restaurant = {
  name: 'Il Tartufo',
  descriptor: 'Ristorante Italiano',
  city: 'Coimbra, Portugal',
  locationShort: 'Rua da Sota, Coimbra',
  address: ['Rua da Sota 34 e 38', '3000-392 Coimbra'],
  phone: '239 820 546',
  email: 'coimbrailtartufo@gmail.com',
  hours: ['Todos os dias', '12:00-23:00'],
  heroImage:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85',
  aboutImage:
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
  locationImage:
    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85',
  shortPitch:
    'Cozinha italiana no centro historico de Coimbra, com massas frescas, pizzas e pratos preparados para uma refeicao sem pressa.',
  heroAsideTitle: 'Reserva pendente',
  heroAsideText:
    'Os pedidos enviados pelo site ficam organizados no painel privado, prontos para aceitar, recusar ou acompanhar por data.',
  demoNotice:
    'Demonstracao nao oficial criada para apresentacao. Dados publicos a confirmar com o restaurante.',
}

export const contactItems = [
  {
    label: 'Morada',
    lines: restaurant.address,
  },
  {
    label: 'Telefone',
    lines: [restaurant.phone],
  },
  {
    label: 'Horario',
    lines: restaurant.hours,
  },
  {
    label: 'Email',
    lines: [restaurant.email],
  },
]

export const reservationStatuses = {
  pending: 'Pendente',
  accepted: 'Aceite',
  rejected: 'Recusada',
  cancelled: 'Cancelada',
}

export const reservationStatusDescriptions = {
  pending: 'Por confirmar pelo restaurante',
  accepted: 'Confirmada pelo restaurante',
  rejected: 'Sem disponibilidade',
  cancelled: 'Cancelada',
}
