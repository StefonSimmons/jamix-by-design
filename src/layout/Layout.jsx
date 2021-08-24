import jamixLogo from "../assets/jamix-logo.png"

export default function Layout() {
  return (
    <div>
      <header>
        <img src={jamixLogo} alt="jamix-logo" />
        <nav>
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>
          <Link></Link>
        </nav>
      </header>
    </div>
  )
}
