import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

export default function TodoList() {
  const { toast } = useToast();
  const { addTodo, getTodos, deleteTodo, toggleTodo, editTodo } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [todoNum, setTodoNum] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      const todos = response.data.todos;
      const todoItems = todos.filter((item) => item.completed_at === null);
      setTodoNum(todoItems.length);
      setTodoList(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const submitTodo = async () => {
    const input = document.querySelector("#todoInput");
    if (input.value.trim() === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please put down your item.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      await addTodo(input.value.trim());
    } catch (error) {
      console.error("Error adding todos:", error);
    }
    await fetchTodos();
    input.value = "";
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitTodo();
    }
  };

  const switchTodo = async (id) => {
    try {
      await toggleTodo(id);
    } catch (error) {
      console.error("Error switching todo:", error);
    }
    await fetchTodos();
  };

  const deleteItem = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    await fetchTodos();
  };

  const editItem = async (id) => {
    const input = document.querySelector("#newInput");
    const newTodo = input.value.trim();
    try {
      if (!newTodo) throw Error();
      await editTodo(newTodo, id);
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, content: newTodo } : todo
        )
      );
    } catch (error) {
      console.error("Error editing todo:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please put down your item.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const removeDoneTodo = async () => {
    const doneItems = todoList.filter((item) => item.completed_at);
    if (doneItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You haven't finished any tasks yet.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      await Promise.all(
        doneItems.map(async (item) => {
          await deleteItem(item.id);
        })
      );
      await fetchTodos();
    } catch (error) {
      console.error("Error removing done todos:", error);
    }
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
          >
            <Checkbox
              key={todo.id}
              data-id={todo.id}
              onClick={() => switchTodo(todo.id)}
              checked={todo.completed_at ? true : false}
            />
            <div className="flex gap-1.5 leading-none">
              <label
                htmlFor={todo.id}
                data-id={todo.id}
                onClick={() => switchTodo(todo.id)}
                className={`text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                  todo.completed_at ? "line-through" : ""
                }`}
              >
                {todo.content}
              </label>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Pencil1Icon className="absolute right-24 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Edit Your To-Do Item.</DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Original
                    </Label>
                    <Input
                      id="oldInput"
                      value={todo.content}
                      className="col-span-5"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Updated
                    </Label>
                    <Input
                      id="newInput"
                      className="col-span-5"
                      placeholder="Put down your new To-Do."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => editItem(todo.id)} type="submit">
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Cross2Icon
              className="absolute right-10 cursor-pointer"
              onClick={() => deleteItem(todo.id)}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-2 pb-16">
        <p>
          There{" "}
          {todoNum > 1
            ? `are ${todoNum} tasks`
            : todoNum == 1
            ? `is ${todoNum} task`
            : `is no task`}{" "}
          pending.
        </p>
        <Button onClick={removeDoneTodo} type="button">
          Clear Finished Tasks
        </Button>
      </div>
    </div>
  );
}
