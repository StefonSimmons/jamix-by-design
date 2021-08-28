import { Fragment } from "react"
import close from "../assets/close-icon.svg"


export default function MenuModal({ menuModal, setMenuModal }) {
  return (
    <Fragment>
      { menuModal &&
        < div className="menu-modal" >
          <img src={close} alt="close" onClick={() => setMenuModal(false)} />
        </div >
      }
    </Fragment>
  )
}
