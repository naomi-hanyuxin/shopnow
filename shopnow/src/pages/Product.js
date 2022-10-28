import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

import "../styles/Product.css"

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
   // data fetching here
   fetch(process.env.REACT_APP_PRODUCT_SERVCE + 'products/')
    .then((response) => response.json())
    .then((data) => {
      setProductData(data.data.product);
      fetch(process.env.REACT_APP_WISH_SERVCE + 'wish/' + localStorage.email)
        .then((response) => response.json())
        .then((data) => {
          setWishList(data.Item.wishlist);
        });
    });
  }, []);

  if (productData === null) {
    return <>Still loading...</>;
  }

  return (
    <>
    <h2>Our Products</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {productData.map(function(object,i){
        return <ProductCard products={object} key={i} wished={wishList.some(e=> e.Id == object.Id)}/>
      })}
    </div>
    </>
  );
}

export default Product;