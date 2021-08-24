import { Link } from "react-router-dom";
import homeFloral from "../assets/home-floral.jpg"

export default function Home() {
  return (
    <div className="home-screen">
      <section>
        <h1>We Plan and Design </h1>
        <h1 className="shifted-header-home">With You In Mind</h1>
      </section>
      <Link to="/services">
        <button>Browse our Services</button>
      </Link>
      <img src={homeFloral} alt="floral center piece" />
    </div>
  )
}
