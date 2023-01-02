import React from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const refresh = () => {
    props.onRefresh();
  };
  return (
    <div className="new-expense">
      <ExpenseForm onRefresh={refresh} />
    </div>
  );
};

export default NewExpense;
