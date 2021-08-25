import { gallery } from '../import-info/gallery'

export default function Gallery() {
  return (
    <div className="gallery-screen">
      {/* {gallery.map((photo, idx) => <img key={idx} src={photo} alt="decoration"/>)} */}
      <section className="gallery">
        {gallery.map((photo, idx) => <div key={idx} className="photo" style={{ backgroundImage: `url(${photo})` }}></div>)}
      </section>
    </div>
  )
}
