import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
import Loader from "./components/Loader/Loader";
//const expenses = ;

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: "94.12",
      date: new Date(2022, 7, 14),
    },
    { id: "e2", title: "New TV", amount: 799.49, date: new Date(2022, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      amount: "294.67",
      date: new Date(2022, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: "450",
      date: new Date(2022, 5, 12),
    },
    {
      id: "e5",
      title: "Toilet Paper",
      amount: "94.12",
      date: new Date(2022, 7, 14),
    },
    { id: "e6", title: "New TV", amount: 799.49, date: new Date(2022, 7, 12) },
    {
      id: "e7",
      title: "Car Insurance",
      amount: "294.67",
      date: new Date(2022, 7, 28),
    },
    {
      id: "e8",
      title: "New Desk (Wooden)",
      amount: "450",
      date: new Date(2008, 7, 12),
    },
  ]);
  const newExpenseDataHandler = (data) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, data];
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <NewExpense onNewExpenseData={newExpenseDataHandler} />
          <Expenses items={expenses} />
        </>
      )}
    </>
  );
}

export default App;
