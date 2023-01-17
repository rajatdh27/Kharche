import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
function Profile(props) {
  const navigate = useNavigate();
  const [err, setError] = useState({
    message: "",
  });
  const [userInput, setUserInput] = useState({
    name: props.name,
    username: props.userName,
  });
  const nameHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, name: e.target.value };
    });
  };
  const userNameHandler = (e) => {
    setUserInput((prevInput) => {
      return { ...prevInput, username: e.target.value };
    });
  };
  const f = async () => {
    const examcollref = doc(
      db,
      `userData/${props.uid}/userDetails/${props.id}/`
    );
    try {
      await updateDoc(examcollref, {
        name: userInput.name,
        userName: userInput.username,
      });
      props.fetch();
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(() => {
        return {
          message: err.message,
        };
      });
    }
  };
  //   console.log("ui", props.user);
  return (
    <Card name="Profile" data={userInput} message={err.message} profile={f}>
      <div className={styles.inputs}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input
            type="text"
            value={userInput.name}
            onChange={nameHandler}
            name="name"
            autoComplete="off"
          />
        </div>
        <div className={styles.inputContainer}>
          <label>User Name:</label>
          <input
            type="text"
            value={userInput.username}
            onChange={userNameHandler}
            name="username"
            autoComplete="off"
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <Button buttonName="Update" />
        </div>
      </div>
    </Card>
  );
}

export default Profile;
