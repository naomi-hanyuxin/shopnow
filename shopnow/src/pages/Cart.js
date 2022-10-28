import { useState, useEffect } from "react";

import ProductList from "../components/ProductList";
import Overlay from "../components/Overlay";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_CART_SERVCE + 'cart/' + localStorage.email)
    .then((response) => response.json())
    .then((data) => {
      if(data.Item){
        setCartItems(data.Item.cart); 
      }
    });
  }, []);

  function handleClick(event) {
    event.stopPropagation();
    setLoading(true);
    var payload = {
      "email" : localStorage.email,
      "products" : cartItems
    }
    fetch(process.env.REACT_APP_ORDER_SERVCE + 'order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Added successfully"){
          console.log("Added to order");
          fetch(process.env.REACT_APP_CART_SERVCE + "empty", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email" : localStorage.email
            })
          }).then((response) => response.json())
            .then((data) => {
              console.log("empty cart");
              alert("Checkout successful")
              window.location.reload()
            })
        }else{
          alert("Something went wrong");
        }
      });
  }

  return (
    <>
     {loading && <Overlay/>}
     <section className="h-100" style={{backgroundColor: "eee"}}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>
            {cartItems.map(function(object,i){
              return <ProductList products={object} key={i}/>
            })}
            <div className="card">
              <div className="card-body">
                <button type="button" className="btn btn-warning btn-block btn-lg" onClick={handleClick} disabled={cartItems.length == 0}>Checkout!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
};

export default Cart;
