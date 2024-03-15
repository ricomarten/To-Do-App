
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../App.css";
import { query, orderBy, onSnapshot } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SignOut from "../components/SignOut";
import { db } from "../firebase";
import { auth } from "../firebase";
import ModalEdit from "../components/ModalEdit";

function App() {
  const user = auth.currentUser;
  if (localStorage.getItem("user") === null) {
    var getuser = false;
  } else {
    getuser = JSON.parse(localStorage.getItem("user"));
  }
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [checked, setChecked] = useState();
  const imageUrl = getuser ? getuser.user.photoURL : "";

  const [openAddModal] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const openEditModal = (task) => {
    setSelectedTask(task);
    //alert(JSON.stringify(task))
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    console.log("Filter changed to:", newFilter);
  };
  const getFilteredTodos = () => {
    console.log("Filtering todos:", filter);
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.data.completed);
      case "uncompleted":
        return todos.filter((todo) => !todo.data.completed);
      default:
        return todos;
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: newItem,
        description: newItem,
        completed: false,
        created: Timestamp.now(),
      });
      alert("Success");
    } catch (err) {
      alert(err);
    }
  };

  const handleToggleCompletion = (id) => {
    //const updatedTodos = todos.map((todo) =>
    //todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    setIsEditing(id);
    setEditText(todos.find((todo) => todo.id === id).text);
    const todoDocRef = doc(db, "tasks", id);
    try {
      updateDoc(todoDocRef, {
        completed: !todos.find((todo) => todo.id === id).data.completed,
      });
    } catch (err) {
      alert(err);
    }
    //setTodos(updatedTodos);
    //console.log(updatedTodos);
  };
  const handleDeleteTodo = (id) => {
    //setTodos(todos.filter((todo) => todo.id !== id));
    const todoDocRef = doc(db, "tasks", id);
    try {
      deleteDoc(todoDocRef);
      alert("Success Delete");
    } catch (err) {
      alert(err);
    }
  };

  const handleEditTodo = (id) => {};

  const handleSaveEdit = (id) => {
    if (!editText.trim()) {
      return;
    }
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setIsEditing(null);
    setEditText("");
  };
  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditText("");
  };

  // const handleAddBulkTodos = (e) => {
  //   e.preventDefault();
  //   const tasks = bulkItems.split('\n').filter(task => task.trim() !== '');
  //   const newTodos = tasks.map(task => ({
  //     id: Date.now() + Math.random(),
  //     text: task,
  //     isCompleted: false
  //   }));
  //   setTodos([...todos, ...newTodos]);
  //   setBulkItems("");
  // };

  return (
    // Testing:

    // <div className="app">
    //   <form onSubmit={handleAddTodo} className="new-item-form">
    //     <label htmlFor="new-item-input" className="new-item-label">New item</label>
    //     <input
    //       id="new-item-input"
    //       className="new-item-input"
    //       type="text"
    //       value={newItem}
    //       onChange={(e) => setNewItem(e.target.value)} />
    //     <button type="submit" className="btn">Add</button>
    //   </form>

    //   <h1 className="header">Todo List</h1>
    //   <ul>
    //     {todos.map((todo) => (
    //       <li key={todo.id} className={todo.isCompleted ? 'completed' : ''}>
    //         {isEditing === todo.id ? (
    //           <div>
    //             <input
    //               type="text"
    //               value={editText}
    //               onChange={(e) => setEditText(e.target.value)} />
    //             <button className="btn btn-save" onClick={() => handleSaveEdit(todo.id)}>Save</button>
    //             <button className="btn btn-cancel" onClick={handleCancelEdit}>Cancel</button>
    //           </div>
    //         ) : (

    <>
      {getuser ? (
        <div>
          <div className="flex flex-row">
            <div className="basis-1/4">
              {getuser && (
                <img
                  src={getuser.user.photoURL}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
            </div>
            <div className="basis-1/2">
              <div className="text-lg">Hello, {getuser.user.displayName}!</div>
            </div>
            <div className="basis-1/4">
              <SignOut />
            </div>
          </div>
          <div className="app bg-gray-600 min-h-screen flex flex-col justify-center items-center">
            <form
              onSubmit={handleAddTodo}
              className="new-item-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <label
                htmlFor="new-item-input"
                className="block text-gray-700 text-4xl font-extrabold "
              >
                To Do App
              </label>
              <input
                id="new-item-input"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
            </form>
            <div className="filters mb-4">
              <button
                onClick={() => handleFilterChange("all")}
                className={`filter-btn ${
                  filter === "all" ? "bg-blue-500" : "bg-gray-300"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange("completed")}
                className={`filter-btn ${
                  filter === "completed" ? "bg-blue-500" : "bg-gray-300"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                Completed
              </button>
              <button
                onClick={() => handleFilterChange("uncompleted")}
                className={`filter-btn ${
                  filter === "uncompleted" ? "bg-blue-500" : "bg-gray-300"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                Uncompleted
              </button>
            </div>
            <h1 className="header text-2xl font-bold underline">Todo List</h1>
            <ul>
              {getFilteredTodos().map((todo) => (
                <li
                  key={todo.id}
                  className={`list-item ${
                    todo.isCompleted ? "line-through" : ""
                  } bg-white flex items-center shadow-lg mb-2 p-4 rounded decoration-red-900`}
                >
                  {isEditing === todo.data.completed ? (
                    <div className="edit-form flex">
                      <input
                        type="text"
                        className="text-gray-700 flex-1 p-2 border rounded"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        className="btn btn-save"
                        onClick={() => handleSaveEdit(todo.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="todo-container flex justify-between items-center">
                      <label className="todo-label flex items-center">
                        <input
                          type="checkbox"
                          className="todo-checkbox mr-2"
                          checked={todo.data.completed}
                          onChange={() => handleToggleCompletion(todo.id)}
                        />
                        <span className="text-gray-950">{todo.data.title}</span>
                      </label>
                      <div>
                        <button
                          className="btn-alert bg-amber-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-l"
                          onClick={() => openEditModal(todo)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn-danger bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-r"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <ModalEdit
              isOpen={editModalOpen}
              closeModal={closeEditModal}
              taskId={selectedTask.id}
              task={selectedTask.data}
            />
          </div>
        </div>
      ) : (
        <>
        <SignIn />
        </>
      )}
    </>
  );
}
export default App;
