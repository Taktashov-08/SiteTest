import { restaurant } from '../data/restaurant.js'

const navItems = [
  { label: 'Sobre', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Avaliacoes', href: '#reviews' },
  { label: 'Reservas', href: '#location' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c9aa]/70 bg-[#fbf4e6]/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8"
        aria-label="Navegacao principal"
      >
        <a href="#home" className="group min-w-0 leading-none">
          <span className="block font-serif text-xl font-bold text-[#173b2c] sm:text-2xl">
            {restaurant.name}
          </span>
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#9f2f21] sm:tracking-[0.28em]">
            {restaurant.descriptor}
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-semibold text-[#28503d] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[#9f2f21]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#location"
          className="rounded-full border border-[#173b2c] bg-[#173b2c] px-3 py-2 text-sm font-bold text-[#fff8e8] shadow-sm transition hover:bg-[#9f2f21] sm:px-4"
        >
          <span className="hidden sm:inline">Reservar</span>
          <span className="sm:hidden">Mesa</span>
        </a>
      </nav>
    </header>
  )
}

export default Navbar
