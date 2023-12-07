import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAuth } from "../context/AuthContext";

export default function TodoList() {
  const { toast } = useToast();
  const { addTodo, getTodo } = useAuth();
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodo();
      console.log(response);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const submitTodo = async () => {
    const input = document.querySelector("#todoInput");
    if (input.value.trim() === "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please write down the item.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      await addTodo(input.value.trim());
    } catch (error) {
      console.log("Error adding todos:", error);
    }
    await fetchTodos();
    input.value = "";
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitTodo();
    }
  };
  const updateTodo = (event) => {
    const { id } = event.target.dataset;
    const newTodoList = todoList.map((todo) => {
      if (todo.id === Number(id)) {
        todo.status = !todo.status;
      }
      return todo;
    });
    setTodoList([...newTodoList]);
  };
  const deleteItem = (id) => {
    const index = todoList.findIndex((item) => item.id === id);
    todoList.splice(index, 1);
  };
  const removeAllTodo = () => {
    setTodoList([]);
  };

  return (
    <div className="mx-28">
      <Toaster />
      <div className="flex items-center pb-8">
        <div className="inline-flex h-16 items-center justify-center rounded-md w-full text-4xl font-medium bg-primary text-primary-foreground shadow">
          To-Do List
        </div>
      </div>
      <div className="flex max-w-full items-center space-x-2 pb-8">
        <Input
          className="h-16 text-lg"
          type="text"
          placeholder="Something to do..."
          id="todoInput"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={submitTodo} className="h-16 text-lg" type="button">
          +
        </Button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li
            className="items-top flex space-x-2 mb-6 ml-6 relative"
            key={todo.id}
            data-id={todo.id}
            onClick={updateTodo}
          >
            <Checkbox key={todo.id} data-id={todo.id} />
            <div className="flex gap-1.5 leading-none">
              <label
                htmlFor={todo.id}
                data-id={todo.id}
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {todo.content}
              </label>
            </div>
            <Cross2Icon
              className="absolute right-10 cursor-pointer"
              onClick={() => deleteItem(todo.id)}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-2">
        <p>
          There{" "}
          {todoList.length > 1
            ? `are ${todoList.length} tasks`
            : todoList.length == 1
            ? `is ${todoList.length} task`
            : `is no task`}{" "}
          pending.
        </p>
        <Button onClick={removeAllTodo} type="button">
          Clear All Task
        </Button>
      </div>
    </div>
  );
}
