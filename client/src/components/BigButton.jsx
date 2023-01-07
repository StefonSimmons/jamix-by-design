import { Link } from 'react-router-dom'

export default function BigButton({ text, screen }) {
  return (
    <Link to={`/${screen}`}>
      <button className="big-btn">{text}</button>
    </Link>
  )
}
