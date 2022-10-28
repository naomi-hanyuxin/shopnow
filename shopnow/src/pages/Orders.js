import { useState, useEffect } from "react";
import { Link} from "react-router-dom";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_ORDER_SERVCE + 'orders/' + localStorage.email)
    .then((response) => response.json())
    .then((data) => {
      setOrders(data.data);
    });
  }, []);

  return (
    <>
      <h2>Your Orders</h2>
      <table className="table table-primary table-striped">
        <thead>
        <tr>
          <th>Order Id</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {orders.map(function(obj,i){
            return (
            <tr key={i}>
              <th>{obj.Id}</th>
              <th><Link to={"/order/" + obj.Id} className="btn btn-outline-primary">View</Link></th>   
            </tr>
            )})}
        </tbody>
      </table>
    </>
  )
};

export default Orders;
