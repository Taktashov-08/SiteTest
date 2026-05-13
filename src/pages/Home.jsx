import About from '../components/About.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Location from '../components/Location.jsx'
import Menu from '../components/Menu.jsx'
import Navbar from '../components/Navbar.jsx'
import Reviews from '../components/Reviews.jsx'

function Home() {
  return (
    <div className="min-h-screen bg-[#fbf4e6] font-sans text-[#183127]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

export default Home
