import React from "react";
// import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

import HeaderImg1 from "../assets/home/header_image_1.png";
import HeaderImg2 from "../assets/home/header_image_2.png";
import HeaderImg3 from "../assets/home/header_image_3.png";

import Title2 from "../assets/home/title_2.png";

import "./css/Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <header id="home-header">
        <div id="header--hero">
          <div id="hero--image-container">
            <img className="hero-image" src={HeaderImg1} alt="" />
            <img className="hero-image" src={HeaderImg2} alt="" />
            <img className="hero-image" src={HeaderImg3} alt="" />
          </div>
          <div id="hero--text-container">
            <div>
              <h1>Feel</h1>
              <div>
                <button>Shop</button>
                <h1>The</h1>
              </div>
            </div>
            <div>
              <img src={Title2} alt="" />
            </div>
          </div>
        </div>
      </header>
      {/* <div className="children">
        <CategoryMenu />
        <ProductList />
      </div> */}
    </div>
  );
};
export default Home;
