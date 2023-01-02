import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
import Loader from "./components/Loader/Loader";
import ExpenseServices from "./services/expenseServices";
//const expenses = ;

function App() {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
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

    setExpenses(() => {
      return [...x];
    });
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const onRefresh = () => {
    fetchData();
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <NewExpense onRefresh={onRefresh} />
          <Expenses items={expenses} />
        </>
      )}
    </>
  );
}

export default App;
