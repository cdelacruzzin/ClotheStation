import React from "react";
// import Cart from "../components/Cart";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

import HeaderImg1 from "../assets/home/header_image_1.png";
import HeaderImg2 from "../assets/home/header_image_2.png";
import HeaderImg3 from "../assets/home/header_image_3.png";

import Title2 from "../assets/home/title_2.png";

import AboutImg1 from "../assets/home/about_image_1.png";

import "./css/Home.scss";

const Home = () => {
  return (
    <div className="Home">
      {/* === HEADER === */}
      <header id="home-header">
        {/* === HEADER HERO === */}
        <div id="header--hero">
          <div id="header--hero-image">
            <img className="hero-image" src={HeaderImg1} alt="" />
            <img className="hero-image" src={HeaderImg2} alt="" />
            <img className="hero-image" src={HeaderImg3} alt="" />
          </div>
          <div id="header--hero-text">
            <div>
              <h1>Feel</h1>
              <div>
                <button className="btn">Shop</button>
                <h1>The</h1>
              </div>
            </div>
            <div>
              <img src={Title2} alt="" />
            </div>
          </div>
        </div>
      </header>

      <hr />

      {/* === OUR MISSION === */}
      <section id="home-about">
        <div id="about--info">
          <h1>Our Mission</h1>
          <p>
            At Urban Sk8, we're driven by the skate culture and a passion to
            make a positive impact. Founded by skaters, our brand is rooted in
            the community we love. When you shop with us, you're not just
            getting fashionable clothing; you're investing in our mission. A
            portion of every purchase goes towards empowering troubled youth
            through skateboarding, creating opportunities for them to discover
            the thrill and camaraderie it offers. Join us in uniting style,
            purpose, and the love of skating.
          </p>
          <div id="info--controls">
            <button className="btn">Learn More</button>
            <div id="info--controls-links">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTiktok} />
            </div>
          </div>
        </div>
        <div id="about--image">
          <img src={AboutImg1} alt="" />
        </div>
      </section>
      {/* <div className="children">
        <CategoryMenu />
        <ProductList />
      </div> */}
    </div>
  );
};
export default Home;
