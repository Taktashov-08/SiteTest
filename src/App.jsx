import Admin from './pages/Admin.jsx'
import Home from './pages/Home.jsx'

function App() {
  if (window.location.pathname.startsWith('/admin')) {
    return <Admin />
  }

  return <Home />
}

export default App
