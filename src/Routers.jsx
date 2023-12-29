import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todolist" element={<TodoList />} />
    </Routes>
  );
};

export default Routers;
