import { Fragment, useEffect, useState } from "react"
import Service from "../components/Service"
import { services } from "../import-info/services"

export default function Services({children}) {

  


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
      <p className="services-about">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has Engagement (surpises), Bridal Shower ot only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more  Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <h2>Packages</h2>
      {children}
    </div>
  )
}
