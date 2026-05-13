function Location() {
  return (
    <section id="location" className="bg-[#fbf4e6] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="bg-[#173b2c] p-8 text-[#fff8e8] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#e3b35f]">
            Visit us
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Dinner in the heart of Coimbra.
          </h2>
          <div className="mt-9 grid gap-7 text-[#efe2c6]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e3b35f]">
                Address
              </p>
              <p className="mt-2 text-lg leading-7">
                Terreiro Erva 20 R/C
                <br />
                3000-153 Coimbra
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e3b35f]">
                Phone
              </p>
              <p className="mt-2 text-lg leading-7">
                920 675 389
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e3b35f]">
                Google rating
              </p>
              <p className="mt-2 text-lg leading-7">
                4.9 stars
                <br />
                53 reviews
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden bg-[#d8c9aa]">
          <img
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85"
            alt="Wine glasses ready for dinner service"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#10281f]/30" />
          <div className="absolute bottom-6 left-6 right-6 bg-[#fff8e8] p-6 text-[#173b2c] shadow-xl sm:left-auto sm:max-w-sm">
            <p className="font-serif text-2xl font-bold">Near the old town</p>
            <p className="mt-2 leading-7 text-[#5d6a57]">
              A short walk from the Mondego and close enough for an unhurried
              dinner after an evening in Baixa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
