import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState({
    passwordToggle: false,
  });
  const icons = {
    open: faEye,
    close: faEyeSlash,
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        // props.userHandler(currentUser);
        // navigate("/");
      }
    });
  }, []);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const passwordIconHandler = () => {
    setToggle((prevState) => {
      return {
        ...prevState,
        passwordToggle: !toggle.passwordToggle,
      };
    });
  };
  const emailHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, email: e.target.value };
    });
  };
  const passwordHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, password: e.target.value };
    });
  };
  const requestHandler = () => {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <Card name="Login" data={userInput} login={requestHandler}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="text"
            onChange={emailHandler}
            name="name"
            autoComplete="off"
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Password:</label>
          <input
            type={toggle.passwordToggle ? "text" : "password"}
            onChange={passwordHandler}
            name="password"
            autoComplete="off"
          />
          <FontAwesomeIcon
            icon={toggle.passwordToggle ? icons.close : icons.open}
            className={styles.icon}
            onClick={passwordIconHandler}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button buttonName="Login" />
        </div>
        <p>
          Not a member?{" "}
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
        <span>Forgot Password?</span>
      </div>
    </Card>
  );
}

export default Login;
