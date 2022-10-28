import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ProductList from "../components/ProductList";

const Order = () => {

  const [orderItems, setOrderItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_ORDER_SERVCE + 'order/' + id)
    .then((response) => response.json())
    .then((data) => {
      setOrderItems(data.data.Products);
    });
  }, [id]);

  return (
    <>
      <section className="h-100" style={{backgroundColor: "eee"}}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Order {id}</h3>
            </div>
            {orderItems.map(function(object,i){
              return <ProductList products={object} key={i}/>
            })}
          </div>
        </div>
      </div>
    </section>
    </>
  )
};

export default Order;
