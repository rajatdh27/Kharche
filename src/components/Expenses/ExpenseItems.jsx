import React from "react";
import "./ExpenseItems.css";
import ExpenseData from "./ExpenseData";
import Card from "../UI/Card";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

function ExpenseItems(props) {
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
    <Card className="expense-item">
      <ExpenseData date={props.date} label={props.label} />
      <div className="expense-item__description">
        <h2>{props.label}</h2>
        <h3>{props.title}</h3>
        <div className="expense-item__price__container">
          <div className="expense-item__price">&#x20b9;{`${props.amount}`}</div>
          <button className="button" onClick={expenseDeleteHandler}>
            Remove
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ExpenseItems;
