import { Fragment } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { gallery } from '../import-info/gallery'

export default function GalleryCarousel({ index, setIndex, setGalleryModal, galleryModal }) {

  const handleSelect = (selectedIndex, _) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      { galleryModal &&
        <div className="gallery-carousel">
          <span className="close" onClick={() => setGalleryModal(false)}>X</span>
          <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
            {gallery.map((photo, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block"
                  src={photo}
                  alt={`slide ${idx + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      }
    </Fragment >
  );
}
