import React, { useState } from "react";

import ExpenseItem from "./ExpenseItems";
import ExpensesFilter from "./ExpenseFilter";
import Chart from "../Chart/Chart";
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
      expense.date.getFullYear().toString() === filteredDate.year.toString() &&
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
      {filteredExpenses.length === 0 && <h1>No Expenses!</h1>}
      {filteredExpenses.length > 0 && (
        <Chart dt={filteredDate} data={filteredExpenses} />
      )}
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
