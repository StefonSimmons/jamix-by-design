import { atAPI, config } from '../services/apiConfig'
import { useEffect } from 'react'
import { gallery } from '../import-info/gallery'

export default function Gallery({ setIndex, setGalleryModal, airtablePhotos, setAirtablePhotos }) {

  

  useEffect(() => {
    const getAirtablePhotos = async () => {
      const {data} = await atAPI.get("/gallery/?view=Gridview", config)

      const photoObjs = data.records.reduce((acc, record) => {
        acc.push(...record.fields.photo)
        return acc
      }, [])

      setAirtablePhotos(photoObjs)
    }

    getAirtablePhotos()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="gallery-screen">
      <section className="gallery">
        {[...gallery, ...airtablePhotos].map((photo, idx) => {
          return (
            <div
              key={idx}
              className="photo"
              onClick={() => {
                setIndex(idx)
                setGalleryModal(true)
              }}
              style={{ backgroundImage: `url(${photo.url || photo})` }}
            >
            </div>
          )
        })}
      </section>
      <div style={{borderTop: "solid black 2px"}}>
        <iframe className="airtable-embed" src="https://airtable.com/embed/shrIwCRb7zRzmzD3l" frameBorder="0" width="100%" height="533" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe>
      </div>
    </div>
  )
}
