import instagram from "../assets/social-icons/instagram.svg"
import facebook from "../assets/social-icons/facebook.svg"
import gmail from "../assets/social-icons/gmail.svg"

export default function Contact() {
  return (
    <div className="contact-screen">
      <a href="https://www.instagram.com/jamix_by_design/" target="_blank" rel="noreferrer">
        <img src={instagram} alt="instagram" />
      </a>
      <a href='mailto:jamixdesigns10@gmail.com' target='_blank' rel="noopener noreferrer">
        <img src={gmail} alt="gmail" />
      </a>
      <a href="https://www.facebook.com/JAMixByDesign/" target='_blank' rel="noopener noreferrer">
        <img src={facebook} alt="facebook" />
      </a>
    </div>
  )
}
