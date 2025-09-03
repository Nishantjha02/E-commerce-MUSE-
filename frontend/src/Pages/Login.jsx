import React from 'react'
import './Styles/Login.css'
import LoginCard from '../components/LoginRegisterCard.jsx'
import LoginVideo from "../Assets/videos/login-video.mp4";

function Login() {
  return (
    <div className='Login-content'>
    <video
        className="Login-bg-video"
        src={LoginVideo}
        autoPlay
        muted
        loop
      ></video>
      <LoginCard title ={"Log In"}/>
      {/* <div className="login-message">
        <h1>WELCOME BACK</h1>
        <p>It's nice to see you again!</p>
        <p>Log in to continue to your account</p>
      </div> */}
    </div>
  )
}

export default Login
