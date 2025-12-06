import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  // 1. Estado para controlar la visibilidad del botón
  const [isVisible, setIsVisible] = useState(false);

  // Función para volver a la parte superior de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 2. Lógica para mostrar/ocultar el botón basada en el scroll
  useEffect(() => {
    const toggleVisibility = () => {
      // Muestra el botón si el desplazamiento vertical es mayor a 150px
      if (window.pageYOffset > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Agregar el detector de eventos al montar
    window.addEventListener('scroll', toggleVisibility);

    // Limpiar el detector de eventos al desmontar (cleanup function)
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 3. Renderizado condicional
  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="rounded-circle shadow"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            width: '50px',
            height: '50px',
            backgroundColor: '#887645ff', // Color de fondo personalizado
            borderColor: '#887645ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s'
          }}
          aria-label="Volver arriba"
        >
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;