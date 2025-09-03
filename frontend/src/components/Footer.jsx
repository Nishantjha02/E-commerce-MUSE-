import React from 'react'
import './Styles/Footer.css'
import Arrow from '../Assets/images/arrow.png'
import yticon from '../Assets/images/yticon.png';
import twicon from '../Assets/images/twicon.png';
import igicon from '../Assets/images/igicon.png';
import fbicon from '../Assets/images/fbicon.png';

function NewFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className='animateF'></div>
    <div className='Footer-main'> 
      <div className="footer-container">
        <div className="footer-section">
          <div className="connect-section">
            <h3>Connect with us</h3>
            <div className='Email-input'>
            <input type="text" placeholder='Enter Email ID' />
            <button><img src={Arrow} alt="" /></button>  
            </div>
            <div className="social-handles">
              <a href="/"><img src={twicon} alt="" /></a>
              <a href="/"><img src={yticon} alt="" /></a>
              <a href="/"><img src={igicon} alt="" /></a>
              <a href="/"><img src={fbicon} alt="" /></a>
            </div>
            <h4>&copy; Copyright {currentYear} Muse. All rights reserved</h4>
          </div>
        </div>
        <div className="footer-section mid">
          <h3>Useful links</h3>
          <a href="/muse/about">About Muse</a>
          <a href="/muse/contacts">Help and support</a>
          <a href="/muse/contacts">Contact us</a>
          <a href="/muse/about">Privacy policy</a>
        </div>
        <div className="footer-section">
        <h3>Products</h3>
          <a href="/muse/products">Audio</a>
          <a href="/muse/products">Laptops</a>
          <a href="/muse/products">Tablets</a>
          <a href="/muse/products">Others</a>
        </div>
      </div>
    </div>
    </>
  )
}

export default NewFooter
