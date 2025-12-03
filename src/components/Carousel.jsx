import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// Imágenes
import Slide1 from '../assets/pictures/Slide_1.png';
import Slide2 from '../assets/pictures/Slide_2.jpg';
import Slide3 from '../assets/pictures/Slide_3.jpg';

// Video
import VideoChoco from "../assets/videos/choco (7).mp4";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
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

      {/* VIDEO DEBAJO DEL CARRUSEL */}
<div
  style={{
    position: "relative",
    width: "100%",
    height: "80px",
    marginTop: "30px",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.22)"
  }}
>
  {/* VIDEO DE FONDO */}
  <video
    src={VideoChoco}
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "translate(-50%, -50%)",
      zIndex: 1
    }}
  ></video>

</div>

    </>
  );
}

export default ControlledCarousel;


