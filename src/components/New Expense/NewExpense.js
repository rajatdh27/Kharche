import React from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const refresh = () => {
    props.onRefresh();
  };
  return (
    <div className="container">
      <div className="new-expense">
        <ExpenseForm onRefresh={refresh} />
      </div>
    </div>
  );
};

export default NewExpense;
