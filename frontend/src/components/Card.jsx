import React from "react";
import "./Styles/Card.css";
import { Link } from "react-router-dom";
import FullStar from "../Assets/images/fill-star.png";
import HalfStar from "../Assets/images/half-star.png";
import EmptyStar from "../Assets/images/empty-star.png";

function Card({ product }) {
  let ratingArray = Array(5).fill("empty");

  for (let i = 0; i < product.rating; i++) {
    if (product.rating - i >= 1) {
      ratingArray[i] = "full";
    } else {
      ratingArray[i] = "half";
    }
  }
  return (
    <>
      <Link to={`/Products/${product._id || product.id}`} className="card-link">
        <div className="card">
          <img className="Product-card-image" src={product.thumbnail} alt="" />
          <div className="card-info">
            <h2>{product.title}</h2>
            <div className="rating-container">
            {ratingArray.map((item, index) => (
              <img className="rating-star-icon"
                key={index}
                src={
                  item === "full"
                    ? FullStar
                    : item === "half"
                    ? HalfStar
                    : EmptyStar
                }
                alt=""
              />
            ))}
            </div>
            <p>{product.description}</p>
            <h2>{`$${product.price}`}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
