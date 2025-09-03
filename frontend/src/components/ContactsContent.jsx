import React from 'react'
import './Styles/ContactsContent.css'
import Arrow from '../Assets/images/down-pointer.svg'

function ContactsContent() {
  return (
    <div className='ContactsContent'>
      <h1>Contact Us</h1>
      <p>Your inquiry and feedback is always appreciated. To contact a Muse Group company nearest you, select a category below and then choose your country/area.</p>
      <ul>
        <li>
          <img src={Arrow} alt="" /><a href="/muse/products">Electronics, Phones / Tablets / SmartWear, Games</a>
          <p>TV, Video, Audio, Digital Still Camera, Gaming consoles, and others.</p>
        </li>
        <li>
        <img src={Arrow} alt="" /><a href="/muse/products">Music</a>
          <p>Muse Music</p>
        </li>
        <li>
        <img src={Arrow} alt="" /><a href="/muse/products">Movies</a>
          <p>Muse Pictures</p>
        </li>
        <li>
        <img src={Arrow} alt="" /><a href="/muse/contacts">Financial Services</a>
          <p>Life insurance, non-life insurance, banking, etc.</p>
        </li>
        <li>
        <img src={Arrow} alt="" /><a href="/muse/products">Others</a>
          <p>(This link takes you to the Electronics country / area select page of this site, where you can search by country/area.)</p>
        </li>
      </ul>
      <h2>Disclaimer:</h2>
      <ul className='Disclaimer'>
        <li>
        Your e-mails may be forwarded to a relevant Muse Group company in a country/area which is appropriate to answer your inquiry.
        </li>
        <li>
        We may not be able to receive e-mails sent in special formats.
        </li>
      </ul>
    </div>
  )
}

export default ContactsContent
