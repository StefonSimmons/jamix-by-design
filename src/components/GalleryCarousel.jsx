import Carousel from 'react-bootstrap/Carousel'
import { gallery } from '../import-info/gallery'

export default function GalleryCarousel({index, setIndex}) {
  
  const handleSelect = (selectedIndex, _) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="gallery-carousel">
      <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
        {gallery.map((photo, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block"
              src={photo}
              alt={`slide ${idx+1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
