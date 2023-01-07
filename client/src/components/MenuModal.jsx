import { Fragment } from "react"
import { Link } from "react-router-dom"
import close from "../assets/close-icon.svg"


export default function MenuModal({ menuModal, setMenuModal }) {
  return (
    <Fragment>
      {menuModal &&
        <div className="menu-modal" >
          <img src={close} alt="close" onClick={() => setMenuModal(false)} />
          <ul>
            <Link to="/" onClick={() => setMenuModal(false)}><li>Home</li></Link>
            <Link to="/about" onClick={() => setMenuModal(false)}><li>About</li></Link>
            <Link to="/gallery" onClick={() => setMenuModal(false)}><li>Gallery</li></Link>
            <Link to="/services" onClick={() => setMenuModal(false)}><li>Services</li></Link>
            <Link to="/contact" onClick={() => setMenuModal(false)}><li>Contact</li></Link>
          </ul>
        </div >
      }
    </Fragment>
  )
}
