import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function TodoList() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [todoNum, setTodoNum] = useState(0);
  const { toast } = useToast();
  useEffect(() => {
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
    const todoItems = todoList.filter((item) => item.status === false);
    setTodoNum(todoItems.length);
  });

  const addTodo = (event) => {
    const input = document.querySelector("#todoInput");
    if (input.value.trim() === "") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please write down the item.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        name: input.value.trim(),
        status: false,
      },
    ]);
    input.value = "";
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
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
        <Button onClick={addTodo} className="h-16 text-lg" type="button">
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
            <Checkbox key={todo.id} checked={todo.status} data-id={todo.id} />
            <div className="flex gap-1.5 leading-none">
              <label
                htmlFor={todo.id}
                data-id={todo.id}
                className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                  todo.status ? "line-through" : ""
                }`}
              >
                {todo.name}
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
          {todoNum > 1
            ? `are ${todoNum} tasks`
            : todoNum == 1
            ? `is ${todoNum} task`
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
