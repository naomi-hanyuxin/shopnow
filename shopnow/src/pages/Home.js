import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //Handle login
    let params = new URLSearchParams(window.location.hash.substr(1));
    let jwt = params.get('id_token')
    if (jwt){
      let tokens = jwt.split(".");
      let payload = JSON.parse(atob(tokens[1]));

      if (payload.iss === process.env.REACT_APP_COGNITO_ISS){
        window.localStorage.setItem("token",jwt);
        window.localStorage.setItem("email",payload.email);
        window.localStorage.setItem("username",payload["cognito:username"]);
        window.localStorage.setItem("key","1");
      }
    }
    return navigate("/product");
  }, [navigate]);
  
  return (
    <h2>Logging in, please wait...</h2>
  );
}

export default Home;