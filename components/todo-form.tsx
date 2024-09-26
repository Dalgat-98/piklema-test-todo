"use client";

import { useStore } from "@/app/store/store";
import * as React from "react";
import { todoItem } from "@/type/type";

export interface ITodoFormProps {
  itemId?: number | null;
}

function initialState(todoList: todoItem[], itemId?: number | null) {
  let ititialTodoItem: todoItem = {
    name: "",
    message: "",
    status: false,
  };

  if (itemId) {
    todoList.forEach((item) => {
      if (item.id === itemId) {
        ititialTodoItem = { ...item };
      }
    });
  }

  return ititialTodoItem;
}

export default function TodoForm({ itemId }: ITodoFormProps) {
  const { todoList, addNewItem, changeTodoItem, formStatus, changeFormStatus } =
    useStore();
  const [newTodo, setNewTodo] = React.useState(initialState(todoList, itemId));

  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.name && newTodo.message && formStatus === "add") {
      addNewItem({
        ...newTodo,
        id: Date.now() + Math.floor(Math.random() * 1000),
      });
    } else if (formStatus === "change") {
      changeTodoItem(itemId ?? null, newTodo);
    }

    changeFormStatus(false);
  };

  return (
    <div>
      <form
        className="flex flex-col justify-between items-stretch gap-2 mb-2 p-5 border-[1px]  border-solid border-[#3e1671] rounded-[10px]"
        onSubmit={handleSubmit}
      >
        <h2>
          {formStatus === "add" ? "Добавить новую" : "Редактировать задачу"}
        </h2>
        <input
          className="py-2 px-4 border-[1px] border-solid border-[#3e1671] rounded-[10px]"
          type="text"
          name="name"
          placeholder="Имя задачи"
          value={newTodo.name}
          onChange={handleInputChanges}
        />
        <input
          className="py-2 px-4 border-[1px] border-solid border-[#3e1671] rounded-[10px]"
          type="text"
          name="message"
          placeholder="Новая задача"
          value={newTodo.message}
          onChange={handleInputChanges}
        />
        <button
          className="py-2 bg-[#9e78cf] text-white rounded-[10px]"
          type="submit"
        >
          {formStatus === "add" ? "Добавить" : "Редактировать"}
        </button>
      </form>
    </div>
  );
}
