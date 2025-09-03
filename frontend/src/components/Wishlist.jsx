import React, { useState, useEffect } from 'react';
import './Styles/Wishlist.css';
import WishlistCard from './wishlistCard.jsx'

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [userWishlist, setUserWishlist] = useState(null);
  const UserId = 83;

  useEffect(() => {
    const wishlisturl = `https://localhost:8000/carts`;

    fetch(wishlisturl)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('API Response:', jsonData);
        if(Array.isArray(jsonData))
        {
          const foundUserWishlist = jsonData.find((cart) => cart.userId === UserId);
          if(foundUserWishlist)
          {
            setWishlist(jsonData);
            setUserWishlist(foundUserWishlist);
            if(foundUserWishlist.totalProducts.length > 0)
            {
              setIsEmpty(false);
            }
          }
        }else
        {
            console.error('APi response is not an array.');
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, []);

  if (wishlist === null) {
    return (
      <div className="Loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isEmpty || userWishlist === null) {
    return (
      <div className="Empty-wishlist-container">
        <h1>Your wishlist is empty.</h1>
      </div>
    );
  }
  return (
    <>
    <div className="wishlist-section">
      <h1>Your Wishlist ({userWishlist.products.length} items)</h1>
      <div className="wishlist-card-container">
      <div className='wishlist-card-header'>
        <h3 className='Wishlist-Item'>Item</h3>
        <h3>Price</h3>
        <h3>Discounted Price</h3>
      </div>
      {userWishlist.products.map((item, id) => (
          <div key={id}>
            <WishlistCard key={id} product = {item}/>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Wishlist;
