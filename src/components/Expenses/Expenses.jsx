import React, { useState } from "react";

import ExpenseItem from "./ExpenseItems";
import ExpensesFilter from "./ExpenseFilter";
import Chart from "../Chart/Chart";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const [sortList, setSortList] = useState("new");

  const date = new Date();
  const yearArr = [];
  let amount = 0;
  const [filteredDate, setFilteredDate] = useState({
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getFullYear(),
  });
  const filterChangeHandler = (selectedYear) => {
    setFilteredDate(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    if (yearArr.indexOf(expense.date.getFullYear()) === -1) {
      yearArr.push(expense.date.getFullYear());
    }
    return (
      expense.date.getFullYear().toString() === filteredDate.year.toString() &&
      expense.date.toLocaleString("en-US", { month: "long" }) ===
        filteredDate.month
    );
  });
  filteredExpenses.map((item) => {
    amount = amount + Number(item.amount);
    return true;
  });

  if (sortList === "new") {
    filteredExpenses.sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return db - da;
    });
  } else {
    filteredExpenses.sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return da - db;
    });
  }
  // console.log(filteredExpenses);
  return (
    <Card className="expenses">
      <ExpensesFilter
        yearArr={yearArr}
        selected={filteredDate}
        onChangeFilter={filterChangeHandler}
      />
      {filteredExpenses.length <= 0 && <h1>No Expenses!</h1>}
      {filteredExpenses.length > 0 && (
        <Chart dt={filteredDate} data={filteredExpenses} />
      )}
      {filteredExpenses.length > 0 && (
        <>
          <div className="totalExpense">
            <h2>Expenditure</h2>
            <h2>&#x20b9;{parseFloat(amount).toFixed(2)}</h2>
          </div>
          <div className="sort">
            <select
              value={sortList}
              onClick={(e) => {
                setSortList(e.target.value);
              }}
            >
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>
        </>
      )}
      {filteredExpenses.map((item) => {
        return (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            date={item.date}
            label={item.label}
            key={item.id}
            id={item.id}
            uid={props.uid}
            refresh={props.onRefresh}
          />
        );
      })}
    </Card>
  );
};

export default Expenses;
