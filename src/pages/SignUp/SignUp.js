import React, { useState, useEffect, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function SignUp(props) {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const getUserName = useCallback(async () => {
    const xi = await getDocs(collection(db, "userID"));
    const user = xi.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    user.map(async (x) => {
      const y = await getDocs(collection(db, `userData/${x.uid}/userDetails/`));
      const usery = y.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const u = { ...usery };
      const userName = u[0].userName;
      if (userName === userInput.userName) {
        setDisable(true);
        setError(() => {
          return {
            message: "xauth/User name has been taken)",
          };
        });
      } else if (disable) {
        setDisable(false);
        setError(() => {
          return {
            message: "",
          };
        });
      }
    });
  }, [userInput.userName, disable]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        props.userHandler(currentUser);
        navigate("/");
      }
    });
    getUserName();
  }, [props, navigate, userInput.userName, getUserName]);
  const icons = {
    open: faEye,
    close: faEyeSlash,
  };
  const [err, setError] = useState({
    message: "",
  });
  const [toggle, setToggle] = useState({
    passwordToggle: false,
    confirmPasswordToggle: false,
  });
  const registerID = async (id) => {
    console.log("regises");
    try {
      addDoc(collection(db, `userID/`), {
        uid: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const register = async () => {
    try {
      setDisable(true);
      const x = await createUserWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      if (x.user.uid !== undefined) {
        addDoc(collection(db, `userData/${x.user.uid}/userDetails/`), {
          userName: userInput.userName,
          name: userInput.name,
        });
        registerID(x.user.uid);
      }
    } catch (error) {
      setDisable(false);
      setError(() => {
        return {
          message: error.message,
        };
      });
    }
  };
  const nameHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, name: e.target.value };
    });
  };
  const emailHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, email: e.target.value };
    });
  };
  const userNameHandler = (e) => {
    //getUserName();
    setUserInput((prevInput) => {
      return { ...prevInput, userName: e.target.value };
    });
  };
  const passwordHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, password: e.target.value };
    });
  };
  const confirmPasswordHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, confirmPassword: e.target.value };
    });
  };
  const passwordIconHandler = () => {
    setToggle((prevState) => {
      return {
        ...prevState,
        passwordToggle: !toggle.passwordToggle,
      };
    });
  };
  const confirmPasswordIconHandler = () => {
    setToggle((prevState) => {
      return {
        ...prevState,
        confirmPasswordToggle: !toggle.confirmPasswordToggle,
      };
    });
  };
  const dataHandler = (data) => {
    props.dataManipulation(data);
    console.log(auth);
  };
  return (
    <Card
      name="Sign Up"
      data={userInput}
      dataHandler={dataHandler}
      userCreationHandler={register}
      message={err.message}
    >
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={userInput.name}
            onChange={nameHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            onChange={emailHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>User Name:</label>
          <input
            type="text"
            name="user"
            autoComplete="off"
            onChange={userNameHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Password:</label>
          <input
            type={toggle.passwordToggle ? "text" : "password"}
            name="password"
            autoComplete="off"
            onChange={passwordHandler}
          />
          <FontAwesomeIcon
            icon={toggle.passwordToggle ? icons.close : icons.open}
            className={styles.icon}
            onClick={passwordIconHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Confirm Password:</label>
          <input
            type={toggle.confirmPasswordToggle ? "text" : "password"}
            name="confirmPassword"
            autoComplete="off"
            onChange={confirmPasswordHandler}
          />
          <FontAwesomeIcon
            icon={toggle.confirmPasswordToggle ? icons.close : icons.open}
            className={styles.icon}
            onClick={confirmPasswordIconHandler}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button buttonName="Sign Up" disables={disable} />
        </div>
        <p>
          Already a member?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default SignUp;
