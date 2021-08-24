import { Fragment } from "react"
import Service from "../components/Service"
import { services } from "../service-data/services"

export default function Services() {
  return (
    <div className="services-screen">
      <h1>Let’s Work On Your Next Celebration!</h1>
      <section>
        {services.map((service, idx) => (
          <Fragment key={idx}>
            <Service service={service} />
          </Fragment>
        ))}
      </section>
    </div>
  )
}
