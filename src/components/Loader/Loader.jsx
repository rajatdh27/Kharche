import React from "react";
import "./Loader.css";
import image from "../../assests/kharche_white.png";
function Loader() {
  return (
    <div className="loading">
      <img src={image} alt={image} />
    </div>
  );
}

export default Loader;
