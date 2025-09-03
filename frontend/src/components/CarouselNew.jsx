import React,{useState, useEffect} from 'react';
import './Styles/CarouselNew.css'
import CarouselCardNew from './CarouselCardNew.jsx'
import Carousel1 from '../Assets/images/Carousel1.jpg'
import Carousel2 from '../Assets/images/Carousel2.avif'
import Carousel3 from '../Assets/images/Carousel3.webp'
import Carousel4 from '../Assets/images/Carosuel4.webp'
import Carousel5 from '../Assets/images/Carousel5.webp'
import Carousel6 from '../Assets/images/Carousel6.jpg'
import ButtonArrow from '../Assets/images/arrow-button.png'

function CarouselNew() {
  const [box, setBox] = useState(null);

  useEffect(() => {
    const boxRef = document.querySelector('.CarouselContainer');
    setBox(boxRef);
  }, []);

  function CarouselLeft() {
    if (box) {
      let width = box.clientWidth;
      box.scrollLeft = box.scrollLeft - width;
    }
  }

  function CarouselRight() {
    if (box) {
      let width = box.clientWidth;
      box.scrollLeft = box.scrollLeft + width;
    }
  }
  return (
    <>
    <div className="CarouselContainer">
      <button className='prebtn carouselbtn' onClick={CarouselLeft}><img src={ButtonArrow} alt="" /></button>
      <button className='nextbtn carouselbtn' onClick={CarouselRight}><img src={ButtonArrow} alt="" /></button>
      <CarouselCardNew image = {Carousel1} Heading="Muse Headphones"/>
      <CarouselCardNew image = {Carousel2} Heading="Muse Laptops"/>
      <CarouselCardNew image = {Carousel3} Heading="Muse Graphic Tablets"/>
      <CarouselCardNew image = {Carousel4} Heading="Muse Headphones"/>
      <CarouselCardNew image = {Carousel5} Heading="Muse Gadgets"/>
      <CarouselCardNew image = {Carousel6} Heading="Muse Laptops"/>
    </div>
    </>
  )
}

export default CarouselNew
