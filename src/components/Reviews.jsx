import { reviews } from '../data/reviews.js'

function Reviews() {
  return (
    <section id="reviews" className="bg-[#f3e4c5] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#9f2f21]">
            Reputacao e confianca
          </p>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#173b2c] sm:text-5xl">
            Uma pagina preparada para converter interesse em reservas.
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#5d6a57]">
            Avaliacoes, pontos fortes e fotografias reais podem ser adicionadas
            depois de aprovadas pelo restaurante.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="bg-[#fff8e8] p-7 shadow-md shadow-[#9d7b3d]/10"
            >
              <blockquote className="font-serif text-2xl font-semibold leading-snug text-[#173b2c]">
                "{review.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-[#decba5] pt-4 text-sm font-bold uppercase tracking-[0.18em] text-[#9f2f21]">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
