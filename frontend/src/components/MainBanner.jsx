import React from "react";
// import bannerVideo from "../Assets/videos/banner-video.mp4";
import "./Styles/MainBanner.css";
import downArrow from "../Assets/images/down-arrow.png"

function MainBanner() {
  return (
    <>
      <div className="main-banner-container">
        <video
          className="main-banner-video"
          src="https://videos.pexels.com/video-files/3196427/3196427-uhd_2560_1440_25fps.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="banner-text-container">
          <h1>Unleash your creative muse</h1>
          <h2>Eclipse ProMax 360 Wireless Headphone</h2>
          <p>
          Introducing the Eclipse ProMax 360: these headphones blend luxury with performance. Featuring plush memory foam cushions and adaptive noise-canceling technology, they deliver crisp, immersive sound with deep bass. The sleek, lightweight design and intuitive touch controls ensure comfort and ease, making them perfect for any audio experience.
          </p>
          <button onClick={() => window.location.href = '/muse/products'}>Learn More</button>
        </div>
        <div className="s-b-c">
          <button>
            <img src={downArrow} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default MainBanner;
