import { gallery } from '../import-info/gallery'

export default function Gallery({ setIndex }) {
  return (
    <div className="gallery-screen">
      <section className="gallery">
        {gallery.map((photo, idx) => (
          <div
            key={idx}
            className="photo"
            onClick={() => setIndex(idx)}
            style={{ backgroundImage: `url(${photo})` }}
          >
          </div>
        ))}
      </section>
    </div>
  )
}
