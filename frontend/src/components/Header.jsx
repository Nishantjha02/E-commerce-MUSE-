import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Styles/Header.css';
import search from '../Assets/images/search.svg';
import myProfile from '../Assets/images/my-profile.svg';
import logo from '../Assets/images/main-logo.png';
import UserDropDown from './UserDropDown.jsx';

function Header({ searchInputRef }) {
  const [usrBtnClicked, setUsrBtnClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleUserButtonClick() {
    setUsrBtnClicked(!usrBtnClicked);
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`./search/${searchQuery}`);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <>
      <div className="Header-outer-container">
        <div className="Header-container">
          <div className="logo-container">
            <Link className="Logo-link" to="../">
              <img src={logo} alt="Main logo" />
            </Link>
          </div>
          <div className="links-container">
            <Link className="Link" to="../">Home</Link>
            <Link className="Link" to="../Products">Products</Link>
            <Link className="Link" to="../About">About</Link>
            <Link className="Link" to="../Contacts">Contacts</Link>
          </div>
          <div className="search-panel-container">
            <input
              type="text"
              placeholder="Search Muse"
              value={searchQuery}
              ref={searchInputRef} 
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              <img className="search-icon" src={search} alt="Search" />
            </button>
            <button className="User-section-btn" onClick={handleUserButtonClick}>
              <img className="myProfile" src={myProfile} alt="User profile" />
            </button>
          </div>
        </div>
        <div className="animate"></div>
      </div>
      {usrBtnClicked && <UserDropDown setUsrBtnClicked={setUsrBtnClicked} />}
      <div className="blur-bg"></div>
    </>
  );
}

export default Header;
