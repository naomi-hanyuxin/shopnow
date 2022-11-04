import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css"

const Navbar = () => {

  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //Handle login
    if (localStorage.token && localStorage.email){
      setLogged(true);
      setUsername(localStorage.username);
      fetch(process.env.REACT_APP_CART_SERVCE + 'cart/' + localStorage.email)
      .then((response) => response.json())
      .then((data) => {
        if(data.Item){
          setCartItems(data.Item.numOfItems); 
        }
      });
    }
  }, [navigate]);

  function logOut(e){
    e.preventDefault();
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
      <div className="container-fluid">
        <b className="navbar-brand">ShopNow</b>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link active">Wish List</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link active">Orders</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <div style={{
                display: logged && 'none'
              }}>
              <a type="button" className="btn btn-info position-relative" href={process.env.REACT_APP_LOGIN_URI}>
                Login
              </a>
            </div>
            <div style={{
                display: !logged && 'none'
              }}>
              <span className="navbar-text" style={{ marginRight: "5px"}}>
                Welcome, {username}!
              </span>
              <Link to="/cart" className="btn btn-info position-relative">
                Shopping Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </Link>

              <button id="logout" onClick={logOut}>Logout</button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
