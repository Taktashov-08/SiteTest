import { restaurant } from '../data/restaurant.js'

function About() {
  return (
    <section id="about" className="bg-[#fbf4e6] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-t-full border-8 border-[#ead9b8] bg-[#173b2c] shadow-2xl shadow-[#173b2c]/20">
          <img
            src={restaurant.aboutImage}
            alt="Massa italiana fresca"
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#9f2f21]">
            Italiano no centro historico
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#173b2c] sm:text-5xl">
            Uma presenca digital a altura da experiencia.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4f614f]">
            Esta demo foi pensada para o {restaurant.name}: uma pagina propria,
            elegante e clara, capaz de mostrar a cozinha italiana, a localizacao
            na Baixa de Coimbra e um sistema de reservas simples para clientes e
            equipa.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              ['Reservas', 'Pedidos organizados por data e estado'],
              ['Menu', 'Pratos destacados e facil atualizacao'],
              ['Painel admin', 'Aceitar, recusar e acompanhar pedidos'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="border-t-2 border-[#d8c9aa] pt-4 text-left"
              >
                <p className="font-serif text-2xl font-bold text-[#173b2c]">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#64715f]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
