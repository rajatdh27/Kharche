import React from "react";
import "./ExpenseItems.css";
import ExpenseData from "./ExpenseData";
import Card from "../UI/Card";

function ExpenseItems(props) {
  return (
    <Card className="expense-item">
      <ExpenseData date={props.date} label={props.label} />
      <div className="expense-item__description">
        <h2>{props.label}</h2>
        <h3>{props.title}</h3>
        <div className="expense-item__price">&#x20b9;{`${props.amount}`}</div>
      </div>
    </Card>
  );
}

export default ExpenseItems;
