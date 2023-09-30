import React from "react";
import { Link } from "react-router-dom";
// import Cart from "../components/Cart";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";

import { ProductCarousel } from "../components/ProductCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

import HeaderImg1 from "../assets/home/header_image_1.png";
import HeaderImg2 from "../assets/home/header_image_2.png";
import HeaderImg3 from "../assets/home/header_image_3.png";

import Title2 from "../assets/home/title_2.png";

import AboutImg1 from "../assets/home/about_image_1.png";

import CategoryImgTee from "../assets/home/category_image_tee.png";
import CategoryImgShoe from "../assets/home/category_image_shoe.png";
import CategoryImgHoodie from "../assets/home/category_image_hoodie.png";

import CategoryImgTeeMobile from "../assets/home/category_image_tee_mobile.svg";
import CategoryImgShoeMobile from "../assets/home/category_image_shoe_mobile.svg";
import CategoryImgHoodieMobile from "../assets/home/category_image_hoodie_mobile.svg";

import SkateboardIcon from "../assets/home/skateboard_icon.svg";
import CharityIcon from "../assets/home/charity_icon.svg";

import "./css/Home.scss";
import { CarouselItem } from "../components/CarouselItem";

export default function Home() {
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
            <Link to="/about">
              <button className="btn">Learn More</button>
            </Link>
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

      {/* === NEW ARRIVALS CAROUSEL === */}
      <ProductCarousel
        title="New Arrivals"
        btnText="View All"
        btnLink="/products"
      >
        {/* 
          !!! THESE ARE PLACE HOLDERS, 
          REMOVE THEM AND REPLACE WITH CODE THAT GETS PRODUCTS FROM
          THE DATABASE AND DISPLAY THEM HERE USING THE CAROUSELITEM.

          EX.

          {
            // Get all the products from the database as array and map them.
            products.map((product) => {
              return (
                <CarouselItem
                  name={product.name}
                  price={product.price}
                  image={product.imageSrc}
                />
              )
            })
          }
        */}
        <CarouselItem
          name="Start"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Some product with a super long long long name"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="End"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
      </ProductCarousel>

      {/* === PRODUCT CATEGORIES === */}
      <div id="home-categories">
        <h1>Shop Collections</h1>
        <div id="categories--images">
          <div className="category-image">
            <img src={CategoryImgTee} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn outlined">Shop Collection</button>
            </Link>
          </div>
          <div className="category-image--mobile">
            <img src={CategoryImgTeeMobile} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn">Shop Collection</button>
            </Link>
          </div>

          <div className="category-image">
            <img src={CategoryImgShoe} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn outlined">Shop Collection</button>
            </Link>
          </div>
          <div className="category-image--mobile">
            <img src={CategoryImgShoeMobile} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn">Shop Collection</button>
            </Link>
          </div>

          <div className="category-image">
            <img src={CategoryImgHoodie} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn outlined">Shop Collection</button>
            </Link>
          </div>
          <div className="category-image--mobile">
            <img src={CategoryImgHoodieMobile} alt="Category hero for shoes" />
            <Link to="/products">
              <button className="btn">Shop Collection</button>
            </Link>
          </div>
        </div>
      </div>

      {/* === INFO SPLITTER === */}
      <div id="home-info-splitter">
        <div>
          <img src={SkateboardIcon} alt="Skateboard icon" />
          <h1>Skater Friendly</h1>
          <p>
            Urban Sk8 is the embodiment of skate culture. Crafted by passionate
            skaters, exuding authenticity, style, and energy of the skate world.
            You're not just wearing clothing; you're embracing a lifestyle.
          </p>
          <button className="btn">Learn More</button>
        </div>
        <div>
          <img src={CharityIcon} alt="Charity icon" />
          <h1>Giving Back</h1>
          <p>
            We believe in giving back to the community that inspires us. That's
            why we commit to donating 1% of our profits to support troubled
            youth in finding their passion for skating.
          </p>
          <button className="btn">Learn More</button>
        </div>
      </div>

      {/* === SKATE DECKS CAROUSEL === */}
      <ProductCarousel
        title="Sake Decks"
        btnText="View All"
        btnLink="/products"
      >
        <CarouselItem
          name="Start"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Some product with a super long long long name"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="Black Hoodie"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
        <CarouselItem
          name="End"
          price="90"
          image="https://www.sk8clothing.com/cdn/shop/files/RDSOGHoodieOceanBlue_480x.webp?v=1694608071"
        />
      </ProductCarousel>

      {/* <div className="children">
        <CategoryMenu />
        <ProductList />
      </div> */}
    </div>
  );
};
