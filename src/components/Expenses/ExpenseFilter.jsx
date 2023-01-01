import React, { useState } from "react";

import "./ExpenseFilter.css";

const ExpenseFilter = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selected);
  const yearArr = props.yearArr;
  if (yearArr.indexOf(new Date().getFullYear()) === -1) {
    yearArr.push(new Date().getFullYear());
  }
  yearArr.sort();
  yearArr.reverse();
  const dropdownChangeMonthHandler = (event) => {
    setSelectedDate((prevDate) => {
      return { ...prevDate, month: event.target.value };
    });
    props.onChangeFilter({
      month: event.target.value,
      year: selectedDate.year,
    });
  };
  const dropdownChangeYearHandler = (event) => {
    setSelectedDate((prevDate) => {
      return { ...prevDate, year: event.target.value };
    });
    props.onChangeFilter({
      month: selectedDate.month,
      year: event.target.value,
    });
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter</label>
        <div className="value">
          <select
            value={props.selected.month}
            onChange={dropdownChangeMonthHandler}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            value={props.selected.year}
            onChange={dropdownChangeYearHandler}
          >
            {yearArr.map((year) => {
              return (
                <option
                  value={`${year}`}
                  key={Math.random()}
                >{`${year}`}</option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
