import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const { toast } = useToast();

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
    console.log(event.target.dataset);
  };
  const removeAllTodo = () => {
    setTodoList([]);
  };

  return (
    <div className="px-28">
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
          <Toaster />
          {/* 增加Toaster到return才能顯示錯誤 */}
        </Button>
      </div>
      {todoList.map((todo) => (
        <div
          className="items-top flex space-x-2 pb-6 pl-6"
          key={todo.id}
          data-id={todo.id}
          onClick={updateTodo}
        >
          <Checkbox key={todo.id} checked={todo.status} data-id={todo.id} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={todo.id}
              data-id={todo.id}
              className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                todo.status ? "line-through" : ""
              }`}
            >
              {todo.name}
            </label>
          </div>
        </div>
      ))}
      <div className="flex justify-end items-center">
        <p className="mx-4">
          目前有 <span className="font-medium">{todoList.length}</span>
          個事項待完成
        </p>
        <Button onClick={removeAllTodo} type="button">
          Clear All Task
        </Button>
      </div>
    </div>
  );
}
