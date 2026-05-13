function Footer() {
  return (
    <footer className="bg-[#10281f] px-5 py-10 text-[#efe2c6] sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[#55725f] pt-8 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-2xl font-bold text-[#fff8e8]">
            La Piccola Cucina Italiana
          </p>
          <p className="mt-2 text-sm text-[#c8bea8]">
            Handmade Italian cooking in Coimbra, Portugal.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <a href="#about" className="transition hover:text-[#e3b35f]">
            About
          </a>
          <a href="#menu" className="transition hover:text-[#e3b35f]">
            Menu
          </a>
          <a href="#location" className="transition hover:text-[#e3b35f]">
            Reservations
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
