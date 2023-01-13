import { Link } from "react-router-dom"
import jamixLogo from "../assets/jamix-logo.png"

export default function Header({setMenuModal, user, logout}) {


  return (
    <header>
      <div className={`${(user?.isAdmin || user?.isOwner) ? 'admin-container': ''}`}>
        <img src={jamixLogo} alt="jamix-logo" />
          {(user?.isAdmin || user?.isOwner) && (
          <div className="admin-greeting">
              <p ><span>Hi,</span>{user.email.split('@')[0]}</p>
              <Link to="/jamix-admin/home">home</Link>
              <Link to="/jamix-admin/about">about</Link>
              <Link to="/jamix-admin/gallery">gallery</Link>
              <Link to="/jamix-admin/services">services</Link>
              {user.isOwner && <Link to="/jamix-admin/accounts">accounts</Link>}
          </div>
          )}
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
      {!user ?
      <div
        className="hamburger-menu-toggler"
        onClick={() => setMenuModal(true)}
      >
        <div className="hamburger-menu-bar"></div>
        <div className="hamburger-menu-bar"></div>
        <div className="hamburger-menu-bar"></div>
      </div>
      :
      <button className="mobile-menu-user-btn" onClick={() => setMenuModal(true)}>
        <span>{user.email.split('@')[0]}</span>
        <div className="down-arrow">
        </div>
      </button>
      }
    </header>
  )
}
