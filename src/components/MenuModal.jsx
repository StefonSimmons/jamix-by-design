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
            <Link><li>Home</li></Link>
            <Link><li>About</li></Link>
            <Link><li>Gallery</li></Link>
            <Link><li>Services</li></Link>
            <Link><li>Contact</li></Link>
          </ul>
        </div >
      }
    </Fragment>
  )
}
