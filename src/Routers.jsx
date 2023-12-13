import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import TodoList from "./pages/TodoList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/todolist" element={<TodoList />} />
    </Routes>
  );
};

export default Routers;
