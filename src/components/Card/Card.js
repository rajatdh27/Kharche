import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
function Card(props) {
  useEffect(() => {
    if (props.message !== "" && props.message !== undefined) {
      const [, err1] = props.message.split("auth/");
      const [err2] = err1.split(")");
      firebaseErrorHandler(err2);
    } else if (props.message === "") {
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: false,
          message: "",
        };
      });
    }
  }, [props.message]);
  const [errorState, setErrorState] = useState({
    invalid: false,
    message: "",
  });
  const firebaseErrorHandler = (message) => {
    setErrorState((prevState) => {
      return {
        ...prevState,
        invalid: true,
        message: message,
      };
    });
  };
  const submitHandlerSignIn = (e) => {
    e.preventDefault();
    if (
      props.data.name.trim().length === 0 ||
      props.data.email.trim().length === 0 ||
      props.data.userName.trim().length === 0 ||
      props.data.password.trim().length === 0 ||
      props.data.confirmPassword.trim().length === 0
    ) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: true,
          message: "Found empty field",
        };
      });
    } else if (props.data.password !== props.data.confirmPassword) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: true,
          message: "Please recheck password",
        };
      });
    } else {
      props.userCreationHandler();
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: false,
          message: "",
        };
      });
    }
  };
  const submitHandlerForget = (e) => {
    e.preventDefault();
    if (props.data.email.trim().length === 0) {
      console.log("forget!");
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: true,
          message: "Found empty field",
        };
      });
    } else {
      props.forgotHandler();
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: false,
          message: "",
        };
      });
    }
  };
  const submitHandlerLogin = (e) => {
    e.preventDefault();
    if (
      props.data.email.trim().length === 0 ||
      props.data.password.trim().length === 0
    ) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          invalid: true,
          message: "Found empty field",
        };
      });
    } else {
      props.login();
    }
  };
  const submitHandlerProfile = (e) => {
    e.preventDefault();
    props.profile();
  };
  return (
    <>
      <div className={styles.cardWapper}>
        <h1>Kharche</h1>
        <h2>Keep It In Check ✅</h2>
        {errorState.invalid ? (
          <div className={styles.invalid}>
            <h2>{errorState.message}</h2>
          </div>
        ) : (
          ""
        )}
        <div className={styles.card}>
          <form
            className={styles.form}
            onSubmit={
              props.name === "Login"
                ? submitHandlerLogin
                : props.name === "Forgot Password"
                ? submitHandlerForget
                : props.name === "Profile"
                ? submitHandlerProfile
                : submitHandlerSignIn
            }
          >
            <div className={styles.title}>
              <h2>{props.name}</h2>
            </div>
            {props.children}
          </form>
        </div>
      </div>
    </>
  );
}

export default Card;
