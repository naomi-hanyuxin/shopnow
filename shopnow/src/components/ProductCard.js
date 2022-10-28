import { useState, useEffect } from "react";

const ProductCard = (props) => {

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    //Handle login
    if (localStorage.token && localStorage.email){
      setLogged(true);
    }
  }, []);

  function handleClick(event) {
    event.stopPropagation();
    var payload = {
      "email" : localStorage.email,
      "product" : props.products
    }
    fetch(process.env.REACT_APP_CART_SERVCE + 'cart', {
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
          window.location.reload();
        }else{
          alert("Something went wrong");
        }
      });
  }

  function handleWish(event) {
    event.stopPropagation();
    var payload = {
      "email" : localStorage.email,
      "product" : props.products
    }
    fetch(process.env.REACT_APP_WISH_SERVCE + 'wish', {
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
          alert("Added to Wish!")
          window.location.reload();
        }else{
          alert("Something went wrong");
        }
      });
  }


  return (
    <div className="col">
      <div className="card">
        <img src={props.products.Image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.products.Name} by {props.products.Company}</h5>
          <p className="card-text">Price: ${props.products.Price}</p>
          <p className="card-text">Stock Available: {props.products.Stock} {props.wished}</p>
        </div>
        <div className="btn-group" role="group" aria-label="Basic example"  style={{
          display: !logged && 'none'
        }}>
          <button type="button" className="btn btn-outline-warning" onClick={handleWish} disabled={props.wished}>Wish List</button>
          <button type="button" className="btn btn-outline-danger" onClick={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
};

export default ProductCard;
