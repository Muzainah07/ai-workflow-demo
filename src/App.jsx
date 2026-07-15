import { Link, Route, Routes } from 'react-router-dom'
import Settings from './pages/Settings'
import './App.css'

function Home() {
  return (
    <section id="center">
      <div>
        <h1>AI Workflow Demo</h1>
        <p>
          Configure your account on the <Link to="/settings">settings page</Link>.
        </p>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <nav className="app-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/settings" className="nav-link">
          Settings
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
