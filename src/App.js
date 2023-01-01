import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
import Loader from "./components/Loader/Loader";
import ExpenseServices from "./services/expenseServices";
//const expenses = ;

function App() {
  const [loading, setLoading] = useState(false);
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
  const fetchData = async () => {
    const data = await ExpenseServices.getAllExpenses();
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const x = d.map((y) => {
      const dt = y.date.split(",");
      return {
        ...y,
        date: new Date(
          Number(dt[0]),
          Number(dt[1]),
          Number(dt[2]),
          Number(dt[3]),
          Number(dt[4])
        ),
      };
    });

    setExpenses((prevExpenses) => {
      return [...prevExpenses, ...x];
    });
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <NewExpense />
          <Expenses items={expenses} />
        </>
      )}
    </>
  );
}

export default App;
