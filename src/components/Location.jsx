import { contactItems, restaurant } from '../data/restaurant.js'
import ReservationForm from './ReservationForm.jsx'

function Location() {
  return (
    <section id="location" className="bg-[#fbf4e6] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="bg-[#173b2c] p-8 text-[#fff8e8] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#e3b35f]">
            Contactos
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Reservas no centro de Coimbra.
          </h2>
          <div className="mt-9 grid gap-7 text-[#efe2c6]">
            {contactItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e3b35f]">
                  {item.label}
                </p>
                <p className="mt-2 text-lg leading-7">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <ReservationForm />
          <div className="relative min-h-[460px] overflow-hidden bg-[#d8c9aa]">
            <img
              src={restaurant.locationImage}
              alt="Copo de vinho preparado para jantar"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#10281f]/30" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#fff8e8] p-6 text-[#173b2c] shadow-xl sm:left-auto sm:max-w-sm">
              <p className="font-serif text-2xl font-bold">
                {restaurant.locationShort}
              </p>
              <p className="mt-2 leading-7 text-[#5d6a57]">
                Um ponto central para clientes encontrarem o restaurante,
                pedirem reserva e receberem confirmacao sem chamadas perdidas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
