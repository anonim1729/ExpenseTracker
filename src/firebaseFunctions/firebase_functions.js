import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, where, query, writeBatch } from 'firebase/firestore';


export const addExpense = async (userId, expense) => {
    try {
        const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), expense);
        console.log("Expense added with ID: ", docRef.id);
    } catch (err) {
        console.error("Error adding expense: ", err);
    }
};


export const addBudget = async (userId, budget) => {
    try {
        const docRef = await addDoc(collection(db, 'users', userId, 'budgets'), budget);
        console.log("Budget added with ID: ", docRef.id);
    }
    catch (err) {
        console.error("Error adding budget: ", err);
    }
};

export const getExpenses = async (userId) => {
    const expenses = [];

    try {
        const querySnapshot = await getDocs(collection(db, 'users', userId, 'expenses'));
        querySnapshot.forEach((doc) => {
            expenses.push({ id: doc.id, ...doc.data() })
        });
        console.log('user expenses: ', expenses);
        return expenses;
    } catch (err) {
        console.error("Error fetching expenses: ", err);
    }
};

export const getBudgets = async (userId) => {
    const budgets = [];
    try {
        const querySnapshot = await getDocs(collection(db, 'users', userId, 'budgets'));
        querySnapshot.forEach((doc) => {
            budgets.push({ id: doc.id, ...doc.data() })
        })
        console.log('user budgets: ', budgets);
        return budgets;
    }
    catch (err) {
        console.error("Error fetching budgets: ", err);
    }
}

export const updateBudgets = async (userId, budId, updatedDoc) => {
    const docRef = doc(db, 'users', userId, 'budgets', budId);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, updatedDoc);
        } else {
            console.log('Document does not exist.');
        }
    } catch (err) {
        console.error("Error fetching budgets: ", err);
    }
};

export const deleteExpense = async (userId, expId) => {
    const docRef = doc(db, 'users', userId, 'expenses', expId);
    try {
        const response = await deleteDoc(docRef);
    } catch (err) {
        console.error("Error fetching budgets: ", err)
    }
}

export const deleteAllExpenses = async (userId, budgetName) => {
    const collRef = collection(db, 'users', userId, 'expenses');
    const q = query(collRef, where('category', '==', budgetName));

    try {
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('All related expenses have been deleted successfully');
    } catch (err) {
        console.error('Error deleting expenses: ', err);
    }
};

export const deleteBudget = async (userId, budId) => {
    const docRef = doc(db, 'users', userId, 'budgets', budId);
    try {
        console.log(docRef);
        const budgetSnap = await getDoc(docRef);

        if (budgetSnap.exists()) {
            const budget = budgetSnap.data();
            console.log(budget.name);
            await deleteAllExpenses(userId, budget.name);
            await deleteDoc(docRef);
        } else {
            console.log("Budget does not exist.");
        }
    }
    catch (err) {
        console.log("Error deleting budget: ", err);
    }
}
