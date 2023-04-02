import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./Navbar.css";
import { color } from "d3";
const t = new Date().toLocaleTimeString();
function Navbar(props) {
  const navigate = useNavigate();
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
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        props.signOut();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="nav_mobile">
        <h1>{greet} ! </h1>
        <h2>{props.email} 🙂</h2>
        <h2>{time}</h2>
      </div>
      <div className="navbar">
        <h1 className="logo">Kharche</h1>
        <div className="elements">
          <Link to="/" className="link">
            <i className="fa-solid fa-house child">
              <p>Home</p>
            </i>
          </Link>
          <Link to="/data" className="link">
            <i className="fa-solid fa-database child">
              <p>Data</p>
            </i>
          </Link>
          <Link to="/profile" className="link">
            <i className="fa-solid fa-user child">
              <p>Profile</p>
            </i>
          </Link>
          <i
            className="fa-solid fa-right-from-bracket child"
            onClick={signOutHandler}
          >
            <p>Log Out</p>
          </i>
          <h2 className="time">{time}</h2>
        </div>
      </div>
    </>
  );
}

export default Navbar;
