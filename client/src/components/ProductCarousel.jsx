import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import ScrollContainer from "react-indiana-drag-scroll";

import "./css/ProductCarousel.scss";

export const ProductCarousel = ({title, btnText, btnLink, margin, children}) => {
  return (
    <div className="product-carousel">
      <h1>{title}</h1>
      <div className="carousel--guide">
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faMouse} />
        <FontAwesomeIcon icon={faChevronRight} />
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <ScrollContainer className="carousel--product-container">
        {children}
      </ScrollContainer>
      <svg
        width="100"
        height="1000"
        version="1.1"
        className="carousel-fade"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fade">
            <stop className="start1" offset="0%" />
            <stop className="start1" offset="10%" />
            <stop className="stop1" offset="40%" />
            <stop className="stop1" offset="100%" />
          </linearGradient>
        </defs>
        <style>
          {`
            #rect1 { fill: url(#fade); }
            .stop1 { stop-color: white; stop-opacity: 0; }
            .start1 { stop-color: white; } 
          `}
        </style>
        <rect id="rect1" x="0" y="0" width="100%" height="100%" />
      </svg>

      <svg
        width="100"
        height="1000"
        version="1.1"
        className="carousel-fade"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fade2">
            <stop className="start2" offset="0%" />
            <stop className="start2" offset="60%" />
            <stop className="stop2" offset="90%" />
            <stop className="stop2" offset="100%" />
          </linearGradient>
        </defs>
        <style>
          {`
            #rect2 { fill: url(#fade2); }
            .start2 { stop-color: white; stop-opacity: 0; }
            .stop2 { stop-color: white; } 
          `}
        </style>
        <rect id="rect2" x="0" y="0" width="100%" height="100%" />
      </svg>
  
      <Link to={btnLink}>
        <button className="btn outlined" onClick={() => {}}>{btnText}</button>
      </Link>
    </div>
  );
}