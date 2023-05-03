import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Budget.css";

const Budget = (props) => {
  const navigate = useNavigate();
  const d = new Date();
  console.log(props);

  const [opOnBudget, setOpOnBudget] = useState(true);
  const [userInput, setUserInput] = useState({
    enteredAmount: "",
  });
  const amountHandler = (e) => {
    const amount = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, enteredAmount: amount };
    });
  };
  const addHandler = () => {
    setOpOnBudget(true);
  };
  const minusHandler = () => {
    setOpOnBudget(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      addDoc(collection(db, `expenseData/${props.uid}/budget/`), {
        budget:
          opOnBudget === true
            ? 1 * userInput.enteredAmount
            : -1 * userInput.enteredAmount,
        month: d.getMonth(),
        year: d.getFullYear(),
      });
      props.onRefresh();
      navigate("/");
    } catch (err) {
      console.log(err);
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
              <label>Budget(Month) :</label>
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
            <button type="submit" onClick={addHandler}>
              Add
              <i className="fa-solid fa-plus icon"></i>
            </button>
            <button type="submit" onClick={minusHandler}>
              Minus
              <i className="fa-solid fa-minus icon"></i>
            </button>
          </div>
        </form>
        <h2>
          Budget(Month) : {props.budget ? props.budget : "Not Unfined Yet 😔"}
        </h2>
      </div>
    </div>
  );
};

export default Budget;
