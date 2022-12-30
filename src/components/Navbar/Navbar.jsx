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
      <h2>{time}</h2>
    </div>
  );
}

export default Navbar;
