import React from 'react'
import './Styles/UserDropDown.css'
import { Link } from 'react-router-dom'
import { authAPI } from '../api.js'
import DashboardIcon from '../Assets/images/dashboard.png'
import LogInIcon from '../Assets/images/sign-in.png'
import RegisterIcon from '../Assets/images/sign-up.png'

function UserDropDown({setUsrBtnClicked}) {
  const isAuthenticated = authAPI.isAuthenticated();
  
  function dropbtnclick() {
    setUsrBtnClicked(false);
  }

  function handleLogout() {
    authAPI.logout();
    setUsrBtnClicked(false);
    window.location.reload();
  }

  return (
    <>
    <div className='UserMenu'>
      {isAuthenticated ? (
        <>
          <button onClick={dropbtnclick}>
            <Link className="UserMenuLink" to="../UserDashboard">
              <img src={DashboardIcon} alt="" />Dashboard
            </Link>
          </button>
          <button onClick={handleLogout}>
            <span className="UserMenuLink">
              <img src={LogInIcon} alt="" />Logout
            </span>
          </button>
        </>
      ) : (
        <>
          <button onClick={dropbtnclick}>
            <Link className="UserMenuLink" to="../Login">
              <img src={LogInIcon} alt="" />Login
            </Link>
          </button>
          <button onClick={dropbtnclick}>
            <Link className="UserMenuLink" to="../Register">
              <img src={RegisterIcon} alt="" />Register
            </Link>
          </button>
        </>
      )}
    </div>
    <div className="bg-blur"></div>
    </>
  )
}

export default UserDropDown
