
export default function Service({ service }) {
  return (
    <div className={`service-card-container ${service.name.toLowerCase()}`}>
      <div className="service-card-color">
        <div className="service-card">
          <div className="service-card-content">
            <h2>{service.name}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
