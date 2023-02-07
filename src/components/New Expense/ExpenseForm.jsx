import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // console.log(new Date("2011-04-12".replace(/-/g, "/")));
  const navigate = useNavigate();
  const date = new Date();
  const hr =
    date.getHours().toString() < 10
      ? `0${date.getHours().toString()}`
      : date.getHours().toString();
  const min =
    date.getMinutes().toString() < 10
      ? `0${date.getMinutes().toString()}`
      : date.getMinutes().toString();
  const result = format(date, "yyyy-MM-dd");
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredLabel: "Food",
    enteredAmount: "",
    enteredDate: result,
    enteredTime: `${hr}:${min}`,
  });
  useEffect(() => {}, [userInput]);
  const titleHandler = (e) => {
    const title = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: title };
    });
  };
  const labelHandler = (e) => {
    const label = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredLabel: label };
    });
  };
  const amountHandler = (e) => {
    const amount = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: amount };
    });
  };
  const dateHandler = (e) => {
    const date = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredDate: date };
    });
  };
  const timeHandler = (e) => {
    const time = e.target.value;
    console.log("time: ", time);
    setUserInput((prevState) => {
      return { ...prevState, enteredTime: time };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const [year, month, date] = userInput.enteredDate.split("-");
    const [hour, minute] = userInput.enteredTime.split(":");
    try {
      addDoc(collection(db, `expenseData/${props.uid}/data/`), {
        amount: userInput.enteredAmount,
        label: userInput.enteredLabel,
        title: userInput.enteredTitle,
        date: `${year},${month - 1},${date},${hour},${minute}`,
      });
      props.onRefresh();
      navigate("/data");
    } catch (err) {
      console.log(err);
    }
    setUserInput(() => {
      const date = new Date();
      const hr =
        date.getHours().toString() < 10
          ? `0${date.getHours().toString()}`
          : date.getHours().toString();
      const min =
        date.getMinutes().toString() < 10
          ? `0${date.getMinutes().toString()}`
          : date.getMinutes().toString();
      const [month, day, year] = date.toLocaleDateString().split("/");
      return {
        enteredTitle: "",
        enteredAmount: "",
        enteredLabel: "Food",
        enteredDate: `${year}-${month < 10 ? `0${month}` : `${month}`}-${
          day < 10 ? `0${day}` : `${day}`
        }`,
        enteredTime: `${hr}:${min}`,
      };
    });
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleHandler}
            value={userInput.enteredTitle}
            required
          />
        </div>
        <div className="new-expense__control">
          <label>Label</label>
          <select
            onChange={labelHandler}
            value={userInput.enteredLabel}
            required
          >
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Savings">Savings</option>
            <option value="Rent">Rent</option>
            <option value="Transportation">Transportation</option>
            <option value="Clothing">Clothing</option>
            <option value="Medical">Medical</option>
            <option value="Utilities">Utilities</option>
            <option value="Household Items">Household Items</option>
            <option value="Personal">Personal</option>
            <option value="Gifts">Gifts</option>
            <option value="Entertainment ">Entertainment </option>
            <option value="Other ">Other </option>
          </select>
          {/* <input
            type="number"
            onChange={amountHandler}
            value={userInput.enteredAmount}
            min="0.01"
            step="0.01"
            required
          /> */}
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            onChange={amountHandler}
            value={userInput.enteredAmount}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            onChange={dateHandler}
            value={userInput.enteredDate}
            required
          />
        </div>
        <div className="new-expense__control">
          <label>Time</label>
          <input
            type="time"
            onChange={timeHandler}
            value={userInput.enteredTime}
            required
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">
          Add Expense
          <i className="fa-solid fa-plus icon"></i>
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
