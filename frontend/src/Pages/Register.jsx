import React from 'react'
import LoginCard from '../components/LoginRegisterCard'
import LoginVideo from "../Assets/videos/login-video.mp4";
import "./Styles/Register.css"


function Register() {
  return (
    <>
    <div className='Register-content'>
    <video
        className="Login-bg-video"
        src={LoginVideo}
        autoPlay
        muted
        loop
      ></video>
    <div className='Register-container'>
      <LoginCard title = {"Register"}/>
    </div>
    </div>
    </>
  )
}

export default Register
