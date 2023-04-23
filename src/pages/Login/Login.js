import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const navigate = useNavigate();
  const [dontWntToVerify, setDontWntToVerify] = useState(false);
  const resendVerification = () => {
    auth.currentUser.reload();
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Resent verification email!");
    });
  };
  const [toggle, setToggle] = useState({
    passwordToggle: false,
  });
  const icons = {
    open: faEye,
    close: faEyeSlash,
  };
  const [err, setError] = useState({
    message: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && !auth.currentUser.emailVerified) {
        setDontWntToVerify(true);
        setError({ message: "xauth/Email not verified)" });
      } else if (currentUser && auth.currentUser.emailVerified) {
        setError({ message: "" });
        props.userHandler({
          email: currentUser.email,
          uid: currentUser.uid,
        });
        navigate("/");
      }
    });
  }, [props, navigate]);
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
    setError(() => {
      return { message: "" };
    });
  };
  const forgotPasswordHandler = () => {
    navigate("/forgotpassword");
  };
  const requestHandler = () => {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then()
      .catch((error) => {
        setError(() => {
          return {
            message: error.message,
          };
        });
      });
  };
  return (
    <Card
      name="Login"
      data={userInput}
      login={requestHandler}
      message={err.message}
    >
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
        {!dontWntToVerify && (
          <>
            <div className={styles.button}>
              <Button buttonName="Login" />
            </div>
            <p>
              Not a member?{" "}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </p>
            <span onClick={forgotPasswordHandler}>Forgot Password?</span>
          </>
        )}
        {dontWntToVerify && (
          <>
            <p
              style={{
                cursor: "pointer",
                color: "#341948",
                fontWeight: "900",
                fontSize: "1.5rem",
              }}
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Don't want to verify{" "}
            </p>
            <p style={{ cursor: "pointer" }} onClick={resendVerification}>
              Resend Verification Link
            </p>
          </>
        )}
      </div>
    </Card>
  );
}

export default Login;
