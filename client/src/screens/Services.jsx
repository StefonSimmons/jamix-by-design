import { Fragment, useEffect, useState } from "react"
// import BigButton from "../components/BigButton"
import Service from "../components/Service"
import { events, services } from "../import-info/services"

export default function Services() {

  const [isOpen, setToggle] = useState({})

  useEffect(() => {
    const eventsObj = events.reduce((acc, curr) => {
      acc[curr] = false
      return acc
    }, {})
    setToggle(eventsObj)
  }, [])
  
  const togglePackageCard = (service) => {
    setToggle(prev => ({
      ...prev,
      [service]: !prev[service]
    }))
  }

  return (
    <div className="services-screen">
      <h1>Let’s Work On Your Next Celebration!</h1>
      <section className="services-section">
        {services.map((service, idx) => (
          <Fragment key={idx}>
            <Service service={service} />
          </Fragment>
        ))}
      </section>
      {/* <BigButton text="Contact Us" screen="contact"/> */}
      <p className="services-about">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has Engagement (surpises), Bridal Shower ot only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more  Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2>Packages</h2>
      <ul className="packages">
        {events.map((event, idx) => (
          <li key={idx} className="package-card" onClick={() => togglePackageCard(event)} >
            <div className="package-header">
              <h3>{event}</h3>
              <p>consultation</p>
              <div className={`arrow ${isOpen[event] ? 'open': 'close'}`}></div>
            </div>
            <div className={`package-description-container ${isOpen[event] ? 'open': 'close'}`}>
              <p className="package-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
              </p>
              <p className="package-price">starting @ $55/hr</p>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  )
}
