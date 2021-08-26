import { gallery } from '../import-info/gallery'

export default function Gallery({ setIndex, setGalleryModal }) {
  return (
    <div className="gallery-screen">
      <section className="gallery">
        {gallery.map((photo, idx) => (
          <div
            key={idx}
            className="photo"
            onClick={() => {
              setIndex(idx)
              setGalleryModal(true)
            }}
            style={{ backgroundImage: `url(${photo})` }}
          >
          </div>
        ))}
      </section>
    </div>
  )
}
