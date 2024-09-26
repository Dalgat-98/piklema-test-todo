import { todoItem } from "@/type/type";
import { create } from "zustand";

type Store = {
  todoList: todoItem[];
  addNewItem: (item: todoItem) => void;
  removeItem: (itemId: number) => void;
  changeTodoItem: (itemId: number | null, changeItem: todoItem) => void;

  changeTodoItemStatus: (itemId: number) => void;

  formStatus: "add" | "change" | false;
  changeFormStatus: (status: "add" | "change" | false) => void;

  todoItemChangeId: number | null;
  changeTodoItemChangeId: (itemId: number | null) => void;
};

export const useStore = create<Store>()((set) => ({
  // todoList: [
  //   {
  //     id: 1,
  //     name: "Задача 1",
  //     message: "Обязательное выполнение",
  //     status: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Задача 2",
  //     message: "Необязательное выполнение",
  //     status: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Задача 3",
  //     message: "Выполнение",
  //     status: false,
  //   },
  // ],
  todoList: [],
  addNewItem: (newItem: todoItem) => {
    set((state) => {
      const updatedList = [...state.todoList, newItem];
      localStorage.setItem("todoList", JSON.stringify(updatedList));

      state.todoItemChangeId = null;

      return { todoList: updatedList };
    });
  },

  removeItem: (itemId: number) =>
    set((state) => ({
      todoList: state.todoList.filter((item) => item.id !== itemId),
    })),

  changeTodoItem: (itemId: number | null, changeItem: todoItem) =>
    set((state) => ({
      todoList: state.todoList.map((item) => {
        if (item.id === itemId) {
          {
            state.todoItemChangeId = null;
          }
          return changeItem;
        } else {
          return item;
        }
      }),
    })),

  changeTodoItemStatus: (itemId: number) =>
    set((state) => ({
      todoList: [
        ...state.todoList.map((item) => {
          if (item.id === itemId) {
            return { ...item, status: !item.status };
          } else {
            return item;
          }
        }),
      ],
    })),

  formStatus: false,
  changeFormStatus: (status: "add" | "change" | false) => {
    set((state) => {
      return { formStatus: status };
    });
  },

  todoItemChangeId: null,
  changeTodoItemChangeId: (itemId: number | null) =>
    set((state) => ({ formStatus: "change", todoItemChangeId: itemId })),
}));
