import { useStore } from "@/app/store/store";
import * as React from "react";

export interface ITodoItemProps {
  id: number;
  name: string;
  message: string;
  status: boolean;
}

export default function TodoItem({
  id,
  name,
  message,
  status,
}: ITodoItemProps) {
  const { removeItem, changeTodoItemStatus, changeTodoItemChangeId } =
    useStore();

  return (
    <div
      className={
        "relative flex flex-col w-[100%] h-fit py-3 px-5 size-[16px] text-[#9e78cf] bg-[#15101c] rounded-[10px] " +
        (status && "text-green-600")
      }
    >
      <h3>{name}</h3>
      <p className="overflow-hidden">{message}</p>
      <div className="flex justify-between gap-2 mt-4">
        <button onClick={() => changeTodoItemChangeId(id)}>
          Редактировать
        </button>
        <button onClick={() => removeItem(id)}>Удалить</button>
      </div>
      <button
        className="absolute top-3 right-5"
        onClick={() => changeTodoItemStatus(id)}
      >
        Выполненно
      </button>
    </div>
  );
}
