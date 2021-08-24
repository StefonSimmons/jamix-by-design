import { Link } from "react-router-dom"
import jamixLogo from "../assets/jamix-logo.png"

export default function Header() {
  return (
    <header>
      <img src={jamixLogo} alt="jamix-logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}
