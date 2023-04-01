import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Budget.css";

const Budget = (props) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    enteredAmount: "",
  });
  const amountHandler = (e) => {
    const amount = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: amount };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!props.budget) {
      try {
        addDoc(collection(db, `expenseData/${props.uid}/budget/`), {
          budget: userInput.enteredAmount,
        });
        props.onRefresh();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }else{
      alert("Your")
    }
    setUserInput(() => {
      return {
        enteredTitle: "",
        enteredAmount: "",
        enteredLabel: "Food",
      };
    });
  };
  return (
    <div className="containerB">
      <div className="new-expense">
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Budget : {props.budget}</label>
              <input
                type="number"
                onChange={amountHandler}
                value={userInput.enteredAmount}
                min="0.01"
                step="0.01"
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
      </div>
    </div>
  );
};

export default Budget;
