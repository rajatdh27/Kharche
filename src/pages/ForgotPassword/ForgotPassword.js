import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import styles from "./ForgotPassword.module.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
function ForgotPassWord(props) {
  const [userInput, setUserInput] = useState({
    email: "",
  });
  const [err, setError] = useState({
    message: "",
  });
  const forgotHandler = () => {
    sendPasswordResetEmail(auth, userInput.email)
      .then((a) => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        setError(() => {
          return {
            message: error.message,
          };
        });
      });
  };
  const emailHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, email: e.target.value };
    });
  };
  return (
    <Card
      name="Forgot Password"
      data={userInput}
      forgotHandler={forgotHandler}
      message={err.message}
    >
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            onChange={emailHandler}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button buttonName="Done" />
        </div>
        <p>
          <Link to="/login" className={styles.link}>
            Go back to Login?
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default ForgotPassWord;
