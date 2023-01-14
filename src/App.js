import React, { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Navbar from "./components/Navbar/Navbar";
import NewExpense from "./components/New Expense/NewExpense";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignUp from "./pages/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
//const expenses = ;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState({
    email: "",
    uid: "",
    userName: "",
  });
  const signOut = () => {
    setUser({
      email: "",
      uid: "",
    });
  };
  const userHandler = (data) => {
    setUser((prevState) => {
      return {
        ...prevState,
        ...data,
      };
    });
  };
  const fetchData = async () => {
    try {
      const xi = await getDocs(collection(db, `expenseData/${user.uid}/data/`));
      const yi = await getDocs(
        collection(db, `userData/${user.uid}/userDetails/`)
      );
      const z = yi.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const d = xi.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
      setUser((prevState) => {
        return {
          ...prevState,
          userName: z[0].userName,
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
    if (user.uid !== "") {
      fetchData();
    }
  }, [user.uid]);
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
        <Route
          element={<ProtectedRoute auth={user.uid !== "" ? true : false} />}
        >
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar signOut={signOut} email={user.userName} />
                <NewExpense onRefresh={onRefresh} uid={user.uid} />
              </>
            }
          />
          <Route
            exact
            path="/data"
            element={
              <>
                <Navbar signOut={signOut} email={user.userName} />
                <Expenses items={expenses} />
              </>
            }
          />
        </Route>
        <Route
          exact
          path="/signup"
          element={<SignUp userHandler={userHandler} />}
        />
      </Routes>
    </>
  );
}

export default App;
