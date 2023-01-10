import { Link } from "react-router-dom"
import jamixLogo from "../assets/jamix-logo.png"

export default function Header({setMenuModal, user, logout}) {


  return (
    <header>
      <div className={`${user ? 'admin-container': ''}`}>
        <img src={jamixLogo} alt="jamix-logo" />
        {user && <p className="admin-greeting"><span>Hi,</span>{user.email.split('@')[0]}</p>}
      </div>
      {/* Destop / Tablet Menu */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        {user && <button onClick={logout}>Logout</button>}
      </nav>
      {/* Mobile Menu */}
      <div
        className="hamburger-menu-toggler"
        onClick={() => setMenuModal(true)}
      >
        <div className="hamburger-menu-bar"></div>
        <div className="hamburger-menu-bar"></div>
        <div className="hamburger-menu-bar"></div>
      </div>
    </header>
  )
}
