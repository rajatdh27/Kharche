import React, { useState } from "react";
import "./Navbar.css";
import kharcheLogo from "../../assests/kharche_logo.png";
const t = new Date().toLocaleTimeString();
function Navbar() {
  const myDate = new Date();
  const hrs = myDate.getHours();
  let greet = "";
  if (hrs < 12) {
    greet = "Good Morning";
    // greetEmoji = "&#x1F31E;";
  } else if (hrs >= 12 && hrs <= 17) {
    greet = "Good Afternoon";
    //greetEmoji = "&#x1F31D; ";
  } else if (hrs >= 17 && hrs <= 24) {
    greet = "Good Evening";
    //greetEmoji = "&#x1F31A;";
  }
  const [time, setTime] = useState(t);
  const currentTime = () => {
    const t1 = new Date().toLocaleTimeString();
    setTime(t1);
  };
  setInterval(currentTime, 1000);

  return (
    <>
      <div className="nav_mobile">
        <h1>{greet} ! </h1>
        <h2>phenominal 🙂</h2>
      </div>
      <div className="navbar">
        <img className="logo" src={kharcheLogo} alt="Kharche" />
        <div className="elements">
          <i className="fa-solid fa-house fa-xl child"></i>
          <i className="fa-solid fa-user fa-xl child"></i>
          <h2>{time}</h2>
        </div>
      </div>
    </>
  );
}

export default Navbar;
