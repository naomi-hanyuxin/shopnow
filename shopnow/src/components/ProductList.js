// import { useState, useEffect } from "react";

const ProductCard = (props) => {

  return (
    <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={props.products.Image}
                  className="img-fluid rounded-3"
                  alt=""/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{props.products.Name}</p>
                <p><span className="text-muted"><b>{props.products.Company}</b></span></p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">${props.products.Price}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                {/*<button>X</button>*/}
              </div>
            </div>
          </div>
        </div>
  )
};

export default ProductCard;
