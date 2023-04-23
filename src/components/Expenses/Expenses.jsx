import React, { useState } from "react";

import ExpenseItem from "./ExpenseItems";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExpensesFilter from "./ExpenseFilter";
import Chart from "../Chart/Chart";
import Card from "../UI/Card";
import "./Expenses.css";
import CryptoJS from "crypto-js";

const secretKey = "mysecretkey"; // Replace with your own secret key

function encryptMessage(message) {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
  console.log(encryptedMessage);
  localStorage.setItem("encryptedMessage", encryptedMessage);
}

// encryptMessage("This is my secret message");
function decryptMessage() {
  const encryptedMessage = localStorage.getItem("encryptedMessage");
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

// console.log(decryptMessage()); // Output: "This is my secret message"

const Expenses = (props) => {
  const [sortList, setSortList] = useState("new");

  const date = new Date();
  const yearArr = [];
  let amount = 0;
  const [filteredDate, setFilteredDate] = useState({
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getFullYear(),
  });
  const filterChangeHandler = (selectedYear) => {
    setFilteredDate(selectedYear);
  };
  const sortHandler = (e) => {
    setSortList(e.target.value);
  };

  const filteredExpenses = props.items.filter((expense) => {
    if (yearArr.indexOf(expense.date.getFullYear()) === -1) {
      yearArr.push(expense.date.getFullYear());
    }
    return (
      expense.date.getFullYear().toString() === filteredDate.year.toString() &&
      expense.date.toLocaleString("en-US", { month: "long" }) ===
        filteredDate.month
    );
  });
  filteredExpenses.map((item) => {
    amount = amount + Number(item.amount);
    return true;
  });

  if (sortList === "new") {
    filteredExpenses.sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return db - da;
    });
  } else {
    filteredExpenses.sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return da - db;
    });
  }
  const generateFilename = () => {
    const timestamp = new Date().getTime();
    const randomString = uuidv4().substr(0, 8); // Generate a random string of 8 characters
    const filename = `${timestamp}-${randomString}`;
    return filename;
  };

  const pdfGenrator = () => {
    const doc = new jsPDF();

    // Define table headers and rows
    const options = { day: "numeric", month: "long", year: "numeric" };
    const headers = [["Label", "Title", "Amount", "Date"]];
    const rows = filteredExpenses.map((item) => [
      item.label,
      item.title,
      item.amount,
      item.date.toLocaleDateString("en-GB", options),
    ]);

    // Add table to PDF document
    doc.autoTable({
      head: headers,
      body: rows,
    });

    // Save or view PDF document
    doc.save(generateFilename());
    encryptMessage(
      "Note that it is important to keep the secret key safe and not share it with anyone, as it is required to decrypt the message."
    );
    console.log(decryptMessage());
  };
  // console.log(filteredExpenses);
  return (
    <Card className="expenses">
      <ExpensesFilter
        yearArr={yearArr}
        selected={filteredDate}
        onChangeFilter={filterChangeHandler}
      />
      {filteredExpenses.length <= 0 && <h1>No Expenses!</h1>}
      {filteredExpenses.length > 0 && (
        <Chart dt={filteredDate} data={filteredExpenses} />
      )}
      {filteredExpenses.length > 0 && (
        <>
          <div className="totalExpense">
            <h2>Expenditure</h2>
            <h2>&#x20b9;{parseFloat(amount).toFixed(2)}</h2>
          </div>
          <div className="sort">
            <select onChange={sortHandler}>
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>
          <div className="buttonContainer">
            <button className="button" onClick={pdfGenrator}>
              Generate PDF
            </button>
          </div>
        </>
      )}
      <div className="items">
        {filteredExpenses.map((item) => {
          return (
            <ExpenseItem
              title={item.title}
              amount={item.amount}
              date={item.date}
              label={item.label}
              key={item.id}
              id={item.id}
              uid={props.uid}
              refresh={props.onRefresh}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default Expenses;
