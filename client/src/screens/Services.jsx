import { Fragment } from "react"
import BigButton from "../components/BigButton"
import Service from "../components/Service"
import { events, services } from "../import-info/services"

export default function Services() {
  return (
    <div className="services-screen">
      <h1>Let’s Work On Your Next Celebration!</h1>
      <section className="services-grid">
        {services.map((service, idx) => (
          <Fragment key={idx}>
            <Service service={service} />
          </Fragment>
        ))}
      </section>
      <BigButton text="Contact Us" screen="contact"/>
      <ul className="events">
        {events.map((event, idx) => <li key={idx}>{event}</li>)}
      </ul>
    </div>
  )
}
