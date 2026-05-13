const menuItems = [
  {
    name: 'Pizza Piccola',
    description: 'San Marzano tomato, fior di latte, basil, oregano, olive oil.',
    price: '14',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Tagliatelle al Ragu',
    description: 'Slow beef ragu, egg pasta, Parmigiano Reggiano, parsley.',
    price: '18',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Tiramisu della Casa',
    description: 'Espresso-soaked savoiardi, mascarpone cream, dark cocoa.',
    price: '8',
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
  },
]

function Menu() {
  return (
    <section id="menu" className="bg-[#173b2c] px-5 py-20 text-[#fff8e8] sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-[#55725f] pb-9 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#e3b35f]">
              Seasonal menu
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Simple Italian favorites, cooked with care.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#d9d0bd]">
            Lunch is relaxed, dinner is candlelit, and the specials board changes
            with what looks best at the market.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {menuItems.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden bg-[#fff8e8] text-[#173b2c] shadow-xl shadow-black/20"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-bold">{item.name}</h3>
                  <span className="rounded-full bg-[#e7d3a5] px-3 py-1 text-sm font-bold text-[#173b2c]">
                    EUR {item.price}
                  </span>
                </div>
                <p className="mt-4 leading-7 text-[#5d6a57]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu
