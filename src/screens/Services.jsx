import { Fragment } from "react"
import Service from "../components/Service"
import { events, services } from "../service-data/services"

export default function Services() {
  return (
    <div className="services-screen">
      <h1>Let’s Work On Your Next Celebration!</h1>
      <section className="services">
        {services.map((service, idx) => (
          <Fragment key={idx}>
            <Service service={service} />
          </Fragment>
        ))}
      </section>
      <ul className="events">
        {events.map((event, idx) => <li key={idx}>{event}</li>)}
      </ul>
    </div>
  )
}
