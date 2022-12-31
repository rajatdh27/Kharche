import React, { useState } from "react";

import ExpenseItem from "./ExpenseItems";
import ExpensesFilter from "./ExpenseFilter";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const date = new Date();
  const [filteredDate, setFilteredDate] = useState({
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getFullYear(),
  });
  const filterChangeHandler = (selectedYear) => {
    setFilteredDate(selectedYear);
  };
  const filteredExpenses = props.items.filter((expense) => {
    return (
      expense.date.getFullYear() === filteredDate.year &&
      expense.date.toLocaleString("en-US", { month: "long" }) ===
        filteredDate.month
    );
  });
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredDate}
        onChangeFilter={filterChangeHandler}
      />
      {filteredExpenses.map((item) => {
        return (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            date={item.date}
            key={item.id}
          />
        );
      })}
    </Card>
  );
};

export default Expenses;
