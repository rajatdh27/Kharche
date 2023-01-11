import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import ExpenseServices from "./services/expenseServices";
//const expenses = ;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState({
    email: "",
    uid: "",
  });
  if (user.email !== "") {
    console.log("user", user);
  }
  const signOut = () => {
    setUser({
      email: "",
      uid: "",
    });
  };
  const userHandler = (data) => {
    console.log(data);
    setUser((prevState) => {
      return {
        ...prevState,
        ...data,
      };
    });
  };
  const fetchData = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onRefresh = () => {
    fetchData();
  };
  return (
    <>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login userHandler={userHandler} />}
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar signOut={signOut} email={user.email} />
              <NewExpense onRefresh={onRefresh} />
            </>
          }
        />
        <Route
          exact
          path="/data"
          element={
            <>
              <Navbar />
              <Expenses items={expenses} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
