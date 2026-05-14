import { restaurant } from '../data/restaurant.js'

function Footer() {
  return (
    <footer className="bg-[#10281f] px-5 py-10 text-[#efe2c6] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[#55725f] pt-8 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-2xl font-bold text-[#fff8e8]">
            {restaurant.name}
          </p>
          <p className="mt-2 max-w-xl text-sm text-[#c8bea8]">
            {restaurant.demoNotice}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <a href="#about" className="transition hover:text-[#e3b35f]">
            Sobre
          </a>
          <a href="#menu" className="transition hover:text-[#e3b35f]">
            Menu
          </a>
          <a href="#location" className="transition hover:text-[#e3b35f]">
            Reservas
          </a>
          <a href="/admin" className="transition hover:text-[#e3b35f]">
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
