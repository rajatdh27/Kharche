import React from "react";
import "./ExpenseItems.css";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

function ExpenseItems(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const time = props.date.toLocaleTimeString();
  const expenseDeleteHandler = () => {
    const delRef = doc(db, `expenseData/${props.uid}/data/${props.id}`);
    try {
      alert(
        `${props.label}: ${props.title} of amount ${props.amount} has been deleted`
      );
      deleteDoc(delRef);
    } catch (err) {
      console.log(err.message);
    }
    props.refresh();
  };
  return (
    <div className="itemConatiner">
      <div className="date">
        <div className="year">
          <span>{year}</span>
        </div>

        <div className="month_day">
          <span>{month}</span>
          <span>{day}</span>
        </div>
      </div>
      <div className="exp">
        <span className="label">{props.label}</span>
        <span className="title">{props.title}</span>
      </div>
      <div className="amt">
        <span className="price"> &#x20B9;{props.amount}</span>
      </div>
      <div className="edit">
        <span className="time">{time}</span>
        <button className="button" onClick={expenseDeleteHandler}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ExpenseItems;
