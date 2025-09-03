import React from 'react'
import './Styles/ChangePassword.css'
import { Link, useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate(); 

  const handleCancel = (event) => {
    event.preventDefault(); 
    navigate(-1); 
  };

  return (
    <div className='Change-password-container'>
      <video
        className="Login-bg-video"
        src="https://videos.pexels.com/video-files/7117913/7117913-uhd_2732_1440_25fps.mp4"
        autoPlay
        muted
        loop
      ></video>
      <div className="change-password-card">
        <form action="">
          <h3>Change Password</h3>
          <p>Current Password</p>
          <input type="password" placeholder='Enter current password here'/>
          <p>New password</p>
          <input type="password" placeholder='Enter new password'/>
          <p>Confirm new passwords</p>
          <input type="text" placeholder='Confirm new password' />
          <Link to={'/'}>
            <button type="button" className='Change-password-button'>Change Password</button>
          </Link>
          <button type="button" className='Cancel-button' onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword;
