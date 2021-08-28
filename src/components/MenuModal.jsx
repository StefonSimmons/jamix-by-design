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
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/gallery"><li>Gallery</li></Link>
            <Link to="/services"><li>Services</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
          </ul>
        </div >
      }
    </Fragment>
  )
}
