import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ProductList from "../components/ProductList";

const Wish = () => {

  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_WISH_SERVCE + 'wish/' + localStorage.email)
    .then((response) => response.json())
    .then((data) => {
    	setWishList(data.Item.wishlist);
    });
  }, []);

  return (
    <>
      <section className="h-100" style={{backgroundColor: "eee"}}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Wish List</h3>
            </div>
            {wishList.map(function(object,i){
              return <ProductList products={object} key={i}/>
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  )
};

export default Wish;
