import React, { useState, useEffect, useRef } from 'react';
import './Styles/ProductCard.css';
import Card from './Card.jsx';
import ButtonArrow from '../Assets/images/arrow-button.png';

function ProductCard({ title, arr = [] }) {
  const [scrollLeft, setScrollLeft] = useState(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  function prebtnclick() {
    if (boxRef.current) {
      let width = boxRef.current.clientWidth;
      setScrollLeft(scrollLeft - width);
    }
  }

  function nextbtnclick() {
    if (boxRef.current) {
      let width = boxRef.current.clientWidth;
      setScrollLeft(scrollLeft + width);
    }
  }

  return (
    <>
      <h2 className="Product-card-title">{title}</h2>
      <div className="Product-card" ref={boxRef}>
        <button className='prebtn' onClick={prebtnclick}><img src={ButtonArrow} alt="" /></button>
        <button className='nextbtn' onClick={nextbtnclick}><img src={ButtonArrow} alt="" /></button>
        {arr.map((item, id) => (
          <div key={id}>
            <Card key={id} product={item} rating = {item.rating}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductCard;
