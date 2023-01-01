import React, { useState } from "react";
import ExpenseServices from "../../services/expenseServices";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const date = new Date();
  const hr = date.getHours().toString();
  const min =
    date.getMinutes().toString() < 10
      ? `0${date.getMinutes().toString()}`
      : date.getMinutes().toString();

  const [month, day, year] = date.toLocaleDateString().split("/");

  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: `${year}-${month < 10 ? `0${month}` : `${month}`}-${
      day < 10 ? `0${day}` : `${day}`
    }`,
    enteredTime: `${hr}:${min}`,
  });
  const titleHandler = (e) => {
    const title = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredTitle: title };
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
    setUserInput((prevState) => {
      return { ...prevState, enteredTime: time };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const [year, month, date] = userInput.enteredDate.split("-");
    const [hour, minute] = userInput.enteredTime.split(":");
    try {
      await ExpenseServices.addExpense({
        amount: userInput.enteredAmount,
        title: userInput.enteredTitle,
        date: `${year},${month - 1},${date},${hour},${minute}`,
      });
    } catch (err) {
      console.log(err);
    }
    setUserInput(() => {
      const date = new Date();
      const hr = date.getHours().toString();
      const min =
        date.getMinutes().toString() < 10
          ? `0${date.getMinutes().toString()}`
          : date.getMinutes().toString();
      const [month, day, year] = date.toLocaleDateString().split("/");
      return {
        enteredTitle: "",
        enteredAmount: "",
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
