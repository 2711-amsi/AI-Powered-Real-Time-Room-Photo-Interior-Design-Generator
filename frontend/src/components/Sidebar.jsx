import { Home, History, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import styles from '../styles.css'
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <button className="close-button" onClick={onClose}>
          <X />
        </button>
        <h1 className="sidebar-title">Interior Designer</h1>
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={onClose}>
            <Home className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
            onClick={onClose}
          >
            <History className="nav-icon" />
            <span>History</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}

