import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
//const expenses = ;

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: "94.12",
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: "294.67",
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: "450",
      date: new Date(2021, 5, 12),
    },
  ]);
  const newExpenseDataHandler = (data) => {
    console.log(data);
    setExpenses((prevExpenses) => {
      return [...prevExpenses, data];
    });
  };
  return (
    <>
      <Navbar />
      <NewExpense onNewExpenseData={newExpenseDataHandler} />
      <Expenses items={expenses} />
    </>
  );
}

export default App;
