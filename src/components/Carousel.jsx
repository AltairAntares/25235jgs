import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// ✅ Importar las imágenes
import Slide1 from '../assets/pictures/Slide_1.png';
import Slide2 from '../assets/pictures/Slide_2.jpg';
import Slide3 from '../assets/pictures/Slide_3.jpg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide1} 
          alt="First slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>SNAKEAR Argentina</h3>
          <p>Somos una empresa lider en la comercialización de snacks saludables.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide2} 
          alt="Second slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>SNAKEAR Argentina</h3>
          <p>Garantizamos la calidad de nuestros productos mediante estrictas normas de calidad.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Slide3}  
          alt="Third slide"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>SNAKEAR Argentina</h3>
          <p>Priorizamos productos de origen nacional.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;

