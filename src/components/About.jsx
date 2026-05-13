function About() {
  return (
    <section id="about" className="bg-[#fbf4e6] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-t-full border-8 border-[#ead9b8] bg-[#173b2c] shadow-2xl shadow-[#173b2c]/20">
          <img
            src="https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=1200&q=85"
            alt="Fresh pasta finished with herbs"
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#9f2f21]">
            A little Italy by the Mondego
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#173b2c] sm:text-5xl">
            Small kitchen, deep roots, generous plates.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#4f614f]">
            La Piccola Cucina Italiana brings rustic Italian cooking to Coimbra:
            handmade dough, long-simmered tomato sauces, bright herbs, and
            desserts made fresh each morning. The room is intimate, the service
            is easy, and every table is meant to linger.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              ['Pasta', 'Made in-house daily'],
              ['Pizza', 'Wood-fired and blistered'],
              ['Wine', 'Italian bottles and Portuguese finds'],
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
