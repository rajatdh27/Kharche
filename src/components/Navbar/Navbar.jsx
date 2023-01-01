import React, { useState } from "react";
import "./Navbar.css";
import kharcheLogo from "../../assests/kharche_logo.png";
const t = new Date().toLocaleTimeString();
function Navbar() {
  const [time, setTime] = useState(t);
  const currentTime = () => {
    const t1 = new Date().toLocaleTimeString();
    setTime(t1);
  };
  setInterval(currentTime, 1000);
  return (
    <div className="navbar">
      <img className="logo" src={kharcheLogo} alt="Kharche" />
      <div className="elements">
        <i class="fa-solid fa-house fa-xl child"></i>
        <i class="fa-solid fa-user fa-xl child"></i>
        <h2>{time}</h2>
      </div>
    </div>
  );
}

export default Navbar;
