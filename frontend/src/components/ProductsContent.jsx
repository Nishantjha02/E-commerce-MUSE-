  import React from 'react'
  import {useState} from 'react'
  import './Styles/ProductsContent.css'
  import FilterBar from './FilterBar.jsx'
  import ProductList from './ProductList.jsx'
  import Carousel from './CarouselNew.jsx'
  import { Link } from 'react-router-dom'
  import downArrow from "../Assets/images/down-pointer.svg";

  function AboutDropDown() {
    return (
      <div className='ProductMenuContainer'>
        <a href="./">Wireless Headphones</a>
        <a href="./">Home speakers</a>
        <a href="./">Laptops</a>
        <a href="./">Tablets</a>
        <a href="./">Graphic tablets</a>
        <a href="./">Neckbands</a>
        <a href="./">Ear buds</a>
        <a href="./">Wired Headphones</a>
        <a href="./">Gaming Section</a>
        <a href="./">Creators Section</a>
        <a href="./">Others</a>
      </div>
    );
  }

  function ProductsContent() {
    const [aboutMenu, setAboutMenu] = useState(false);
    const[filterCategory, setFilterCategory] = useState("none");

    function AboutMenuDrop() {
      if (aboutMenu) {
        setAboutMenu(false);
      } else {
        setAboutMenu(true);
      } 
    }
    
    function applycategory(category)
    {
      setFilterCategory(category);
    }
    return (
      <>
      <div className="About-header">
            <div className="About-menu-container">
              <h2>Products</h2>
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
      <div className="carousel-container">
      <div className="AboutDropDown">
              {aboutMenu && <AboutDropDown/>}
            </div>
      <Carousel/>
      </div>
      <div className = 'ProductsContentMain'>
        <FilterBar applycategory = {applycategory}/>
        <div className="Prouctlistcontainer">
        <ProductList filterCategory = {filterCategory}/>
        </div>
      </div>
      </>
    )
  }

  export default ProductsContent
