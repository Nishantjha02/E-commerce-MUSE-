import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../components/Styles/AboutContent.css";
import downArrow from "../Assets/images/down-pointer.svg";
import graphictablet from "../Assets/images/initiative1.jpeg";
import musicpro from "../Assets/images/initiative2.jpeg";
import AboutBannerImage from "../Assets/images/AboutBannerImage.jpg";
import CorporateData from "../Assets/images/CorporateData.jpeg";
import History from "../Assets/images/History.jpg";
import CorporateReport from "../Assets/images/CorporateReport.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
gsap.registerPlugin(ScrollTrigger);

function AboutDropDown() {
  return (
    <div >
      <a href="./">About Muse Group Top</a>
      <a href="./">Muse's Purpose & Values</a>
      <a href="./">News Releases</a>
      <a href="./">Our Business</a>
      <a href="./">New Initiatives</a>
      <a href="./">Corporate Report</a>
      <a href="./">History</a>
      <a href="./">Corporate Data</a>
      <a href="./">Affiliated Companies</a>
      <a href="./">Procurement Activities</a>
      <a href="./">Message from the CEO</a>
    </div>
  );
}
function AboutContent() {
  const [aboutMenu, setAboutMenu] = useState(false);
  const tempref = useRef(null);
  function AboutMenuDrop() {
    if (aboutMenu) {
      setAboutMenu(false);
    } else {
      setAboutMenu(true);
    } 
  }
  useEffect(() => {
    const el = tempref.current;
    gsap.from(el, {
      y: "30%",
      opacity: 0,
      duration: 1,
      ease: "ease-in",
      scrollTrigger: {
        trigger: el,
        toggleActions: "restart none none none",
      },
    });
  }, []);
  return (
    <>
      <div className="About-container">
        <div className="About-header">
          <div className="About-menu-container">
            <h2>About Muse Group </h2>
            <img
              onClick={AboutMenuDrop}
              className={`About-menu-arrow ${
                aboutMenu ? "About-menu-arrow-active" : ""
              }`}
              src={downArrow}
              alt=""
            />
          </div>
          <Link to="../">
            <button className="About-home-button">Home</button>
          </Link>
        </div>
        <div className="About-banner">
          <div className="AboutDropDown">
            {aboutMenu && <AboutDropDown/>}
          </div>
          <img src={AboutBannerImage} alt="" />
        </div>
        <div className="About-message">
          <h2>Muse's Purpose</h2>
          <h1>
            Fill the world with emotion,through the power of creativity and
            technology.
          </h1>
          <button className="About-button">Read more</button>
        </div>
        <div className="Initiatives">
          <h2>New Initiatives</h2>
          <a href="./">
            <div ref={tempref}>
              <img src={graphictablet} alt="" />
              <img src={musicpro} alt="" />
            </div>
          </a>
          <a href="./">New Initiatives List &gt;</a>
        </div>
        <div className="other">
          <div>
            <div className="other-card">
              <a href="./">
                <img src={CorporateData} alt="" />
              </a>
              <h3>Corporate Data</h3>
            </div>
            <div className="other-card">
              <a href="./">
                <img src={History} alt="" />
              </a>
              <h3>History</h3>
            </div>
            <div className="other-card">
              <a href="./">
                <img src={CorporateReport} alt="" />
              </a>
              <h3>Corporate Report</h3>
            </div>
          </div>
          <button className="About-button">Affilated companies</button>
        </div>
        <div className="prefooter AboutDropDown">
          <AboutDropDown />
        </div>
      </div>
    </>
  );
}

export default AboutContent;
