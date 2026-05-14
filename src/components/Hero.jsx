import { restaurant } from '../data/restaurant.js'

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[74svh] items-end overflow-hidden bg-[#173b2c] px-5 pb-14 pt-28 text-[#fff8e8] sm:px-8 lg:pb-20"
    >
      <img
        src={restaurant.heroImage}
        alt="Sala acolhedora de restaurante italiano"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10281f]/95 via-[#10281f]/75 to-[#10281f]/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#fbf4e6] to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.45fr)] lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-[#e3b35f]">
            {restaurant.city}
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[0.98] text-[#fff8e8] sm:text-7xl lg:text-8xl">
            {restaurant.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f4e6c8] sm:text-xl">
            {restaurant.shortPitch}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="rounded-full bg-[#c9442f] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/20 transition hover:bg-[#a93224]"
            >
              Ver menu
            </a>
            <a
              href="#location"
              className="rounded-full border border-[#f1d59b] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#fff8e8] transition hover:bg-[#fff8e8] hover:text-[#173b2c]"
            >
              Reservar mesa
            </a>
          </div>
        </div>

        <aside className="max-w-sm border-l-4 border-[#e3b35f] bg-[#10281f]/75 p-6 backdrop-blur">
          <p className="font-serif text-2xl font-bold text-[#fff8e8]">
            {restaurant.heroAsideTitle}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#f4e6c8]">
            {restaurant.heroAsideText}
          </p>
        </aside>
      </div>
    </section>
  )
}

export default Hero
