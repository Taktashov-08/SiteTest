import { menuItems } from '../data/menu.js'

function Menu() {
  return (
    <section
      id="menu"
      className="bg-[#173b2c] px-5 py-20 text-[#fff8e8] sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-[#55725f] pb-9 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#e3b35f]">
              Menu em destaque
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Cozinha italiana apresentada com clareza.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#d9d0bd]">
            A ementa final deve ser confirmada com o restaurante. Esta estrutura
            permite trocar pratos, fotos e descricoes sem mexer no layout.
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
                    {item.tag}
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
