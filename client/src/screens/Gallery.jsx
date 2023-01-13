import { atAPI, config } from '../services/apiConfig'
import { useEffect, useState } from 'react'
import { gallery } from '../import-info/gallery'

export default function Gallery({ setIndex, setGalleryModal, airtablePhotos, setAirtablePhotos, restricted, user }) {

  const [photoData, setPhotoData] = useState([])
  const [refresh, setRefresh] = useState(false)
  

  useEffect(() => {
    const getAirtablePhotos = async () => {
      const {data} = await atAPI.get("/gallery/?view=Gridview", config)

      const modifiedPhotoObjs = data.records.reduce((acc, record) => {
        const modifiedPhotos = record.fields.photos.map((photo) => ({...photo, recordID: record.id}))
        acc.push(...modifiedPhotos)
        return acc
      }, [])
      setPhotoData(data.records)
      setAirtablePhotos(modifiedPhotoObjs)
    }

    getAirtablePhotos()
    // eslint-disable-next-line
  }, [refresh])


  // DELETE STUFF
  const [hoveredPhotoID, setHoveredID] = useState(null)

  const handleDelete = async (e, recordID, attID) => {
    e.stopPropagation()
    const oneRecord = photoData.find(p => p.id === recordID)
    if(oneRecord.fields.photos.length > 1){
      // this is really an update to the record. deletes attachements
      const recordData = {
        fields: {
          // exclude selected attachement(photo) id
          photos: oneRecord.fields.photos.filter(r => r.id !== attID)
        }
      }
      const {status} = await atAPI.put(`/gallery/${recordID}`, recordData, config)
      if(status === 200){
        setRefresh(prev => !prev)
      }
    } else if (oneRecord.fields.photos.length === 1){
      // this deletes the record if record only has one attachment left 
      const {status} = await atAPI.delete(`/gallery/${recordID}`, config)
      if(status === 200){
        setRefresh(prev => !prev)
      }
    }
  }

  if(!user?.isAdmin && !user?.isOwner && restricted){
    return (
      <div className='no-access'>
          <h1>Sorry. You do not have access to this page.</h1>
      </div>
    )
  }

  return (
    <div className={`gallery-screen ${restricted && "restricted-screen"}`}>
      <section className="gallery">
        {[...gallery, ...airtablePhotos].map((photo, idx) => {
          return (
            <div key={idx}>
              <div
              id={photo.id || idx}
              className="photo"
              onClick={() => {
                setIndex(idx)
                setGalleryModal(true)
              }}
              onMouseEnter={(e) => restricted && setHoveredID(e.target.id)}
              onMouseLeave={() => restricted && setHoveredID(null)}
              style={{ backgroundImage: `url(${photo.url || photo})` }}
              >
              { restricted &&
              <div className={`overlay-delete ${(hoveredPhotoID === photo.id) || (hoveredPhotoID === idx) ? "hovered": "unhovered"}`}>
                <button onClick={(e) => handleDelete(e,photo.recordID, photo.id)}>Delete</button>
              </div>
              }
              </div>
            </div>
          )
        })}
      </section>
      { restricted &&
        <div className='get-pic-container'>
          <button className="get-pics-btn big-secure-btn" onClick={() => setRefresh(prev => !prev)}>Get New Pics</button>
        </div>
      }
      { restricted &&
      <div style={{borderTop: "solid black 2px"}}>
        <iframe className="airtable-embed" src="https://airtable.com/embed/shrIwCRb7zRzmzD3l" frameBorder="0" width="100%" height="533" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe>
      </div>
      }
    </div>
  )
}
