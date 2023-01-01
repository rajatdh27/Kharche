import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const expenseCollectionRef = collection(db, "expenses");

class ExpenseService {
  addExpense = (newExpense) => {
    return addDoc(expenseCollectionRef, newExpense);
  };
  updateExpense = (id, updatedExpense) => {
    const expenseDoc = doc(db, "expenses", id);
    return updateDoc(expenseDoc, updatedExpense);
  };

  deleteExpense = (id) => {
    const expenseDoc = doc(db, "expenses", id);
    return deleteDoc(expenseDoc);
  };

  getAllExpenses = () => {
    return getDocs(expenseCollectionRef);
  };

  getExpense = (id) => {
    const expenseDoc = doc(db, "expenses", id);
    return getDoc(expenseDoc);
  };
}

export default new ExpenseService();
