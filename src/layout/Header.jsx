import { Link } from "react-router-dom"
import jamixLogo from "../assets/jamix-logo.png"

export default function Header() {
  return (
    <header>
      <img src={jamixLogo} alt="jamix-logo" />
      <nav>
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Gallery</Link>
        <Link>Services</Link>
        <Link>Contact</Link>
      </nav>
    </header>
  )
}
