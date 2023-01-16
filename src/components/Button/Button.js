import React from "react";
import styles from "./Button.module.css";
function Button(props) {
  return (
    <button
      className={styles.button}
      type={props.disables ? "button" : "submit"}
    >
      {props.buttonName}
    </button>
  );
}

export default Button;
