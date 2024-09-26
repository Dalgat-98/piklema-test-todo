"use client";

import * as React from "react";
import TodoItem from "./todo-item";
import TodoForm from "./todo-form";
import { useStore } from "@/app/store/store";

export default function TodoList() {
  const { todoList, formStatus, changeFormStatus, todoItemChangeId } =
    useStore();

  const todoListLi = todoList.map((todoItem, index) => {
    return (
      <li key={index}>
        <TodoItem
          id={todoItem.id ?? 0}
          name={todoItem.name}
          message={todoItem.message}
          status={todoItem.status}
        />
      </li>
    );
  });

  return (
    <div className="w-[500px] mt-10 mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1>ToDo List</h1>
        {formStatus !== "add" && (
          <button
            className="p-2 bg-[#9e78cf] text-white rounded-[10px]"
            onClick={() => changeFormStatus("add")}
          >
            Добавить
          </button>
        )}
      </div>
      {formStatus && <TodoForm itemId={todoItemChangeId} />}
      <ul className="flex flex-col gap-2">{todoListLi}</ul>
    </div>
  );
}
