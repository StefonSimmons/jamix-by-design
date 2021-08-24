
export default function Service({ service }) {
  return (
    <div className="service-card-container">
      <div className="service-card-color">
        <div className="service-card">
          <div className="service-card-content">
            <h2>{service.name}</h2>
            <ul>
              <li>{service.one}</li>
              <li>{service.two}</li>
              <li>{service.three}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
