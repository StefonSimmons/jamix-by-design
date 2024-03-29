import { useState } from "react"
import { useEffect } from "react"
import { Fragment } from "react"
import Service from "../components/Service"
import { services } from "../import-info/services"
import { atAPI, config } from "../services/apiConfig"

export default function Services({children, restricted, user}) {

  const [edit, setEdit] = useState(false)
  const [servicesData, setServicesData] = useState({})
  const [airtableServices, setairtableServices] = useState({})

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getAirtableServices = async () => {
      const {data} = await atAPI.get('/services/', config)
      // console.log(data.records[0])
      setServicesData({
        fields: {
          description: data.records[0]?.fields?.description
        }
      })
      setairtableServices(data.records[0])
    }
    getAirtableServices()
  }, [refresh])
  

  const handleChange = (e) => {
    const {value} = e.target
    setServicesData({
      fields: {
        description: value
      }
    })
  }

  const handleSubmit = async () => {
    const {status} = await atAPI.patch(`/services/${airtableServices.id}`, servicesData,config)
    if(status === 200){
      setRefresh(prev => !prev)
      setEdit(false)
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
    <div className={`services-screen ${restricted && "restricted-screen"}`}>
      <h1>Let’s Work On Your Next Celebration!</h1>
      <section className="services-section">
        {services.map((service, idx) => (
          <Fragment key={idx}>
            <Service service={service} />
          </Fragment>
        ))}
      </section>
      {restricted && <p className="admin-info">To update the text here, click the "Edit" button below. Once you are happy with the text, click "Submit" to save the changes for public viewing.</p>}
      { !edit ?
        <p className="services-about">
        {airtableServices?.fields?.description}
        </p>
        :
        <>
        {restricted && <textarea className="text-area-services" cols="30" rows="10" value={servicesData.fields.description} onChange={(e) => handleChange(e)}></textarea>}
        </>
      }
      {restricted && <button className={`edit-cancel-btn ${edit ? 'cancel': 'edit'} services`} onClick={() => setEdit(prev => !prev)}>{edit ? "Cancel": "Edit"}</button>}
      {edit && restricted && <button className="save-btn" onClick={handleSubmit}>Submit</button>}
      <h2>Packages</h2>
      {children}
    </div>
  )
}
