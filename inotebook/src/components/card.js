import React from "react";

const Card = (props) => {
  return (
    <div>
      <div className="card my-3">
        <h5 className="card-header">{props.item.category.toUpperCase()}</h5>
        <div className="card-body">
          <h5 className="card-title">{props.item.name}</h5>
          <p className="card-text">
            <span>
            <img src={`./images/${props.item.image}`} alt="your item"/>
            <span style={{float:'right',color:'black',fontSize:'40px'}} className="mx-4">
              Price:
              {props.item.price}
              <br/>
              <button className="btn btn-primary my-4" style={{width:'100%',padding:'10px'}} onClick={()=>{props.order(props.item)}}>
                Order Now
              </button>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
