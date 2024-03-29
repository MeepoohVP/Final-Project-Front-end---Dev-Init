import React, { useState, useEffect } from "react";
function Todo() {
  useEffect(() => {
    document.title = "To-Do list";
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "todo.svg";
  }, []);
  interface TodoApp {
    id: number;
    text: string;
    checked: boolean;
  }
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<any>({});
  const [todos, setTodos] = useState<any>(() => {
    const savedTodos: string | null = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          checked: false,
        },
      ]);
      setTodo("");
    } else {
      setTodo("");
    }
    setIsSubmit(true);
  };
  const createClick = (): void => {
    setIsCreate(true);
    setIsSubmit(false);
  };
  const deleteData = (indexTodo: number): void => {
    const removeItem = todos.filter((todo: TodoApp, index: number) => {
      todo;
      return index !== indexTodo;
    });
    setTodos(removeItem);
  };
  const handleCheckedbox = (index: number): void => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
  };
  const editClick = (todo: TodoApp): void => {
    setEditing(true);
    setCurrentTodo({ ...todo });
  };
  const handleUpdateTodo = (id: number, updateTodo: object): void => {
    const updateItem = todos.map((todo: TodoApp) => {
      return todo.id === id ? updateTodo : todo;
    });
    setEditing(false);
    setTodos(updateItem);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  return (
    <>
      <header className="relative flex ml-6 md:justify-center md:ml-0 pt-2">
        <h1 className="font-bold text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-secondary to-accent text-transparent before:content-['To-Do_list']"></h1>
      </header>
      {todos.length === 0 ? (
        <div className="absolute w-full h-full top-0 -z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              fill="currentColor"
              className="bi bi-check2-square opacity-20"
              viewBox="0 0 16 16"
            >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
            </svg>
          </div>
          <div className="text-2xl opacity-40 mt-6 relative before:content-['ไม่มีสิ่งที่ต้องทำ']"></div>
        </div>
      ) : (
        ""
      )}
      {isEditing ? (
        <form
          onSubmit={handleEditFormSubmit}
          className={`fixed w-full h-full left-0 top-0 bg-black/40 z-40`}
        >
          <div className="relative w-full h-full flex-col flex justify-center items-center">
            <h1 className="lg:text-xl my-4">แก้ไขสิ่งที่ต้องทำ</h1>
            <input
              name="edit todo"
              onChange={handleEditInputChange}
              className="input"
              type="text"
              placeholder="edit"
              value={currentTodo.text}
              autoFocus={true}
            />{" "}
            <br />
            <div className="flex gap-2 scale-95">
              <button
                type="submit"
                className="btn btn-success"
                data-testid="edit-confirm"
              >
                OK
              </button>
              <button
                className="btn btn-error"
                onClick={() => setEditing(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
      <button
        className="btn btn-accent btn-circle fixed bottom-[84px] right-0 m-4 lg:bottom-0 z-20"
        onClick={createClick}
        id="create"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
      {isCreate && !isSubmit ? (
        <form
          className={`text-center w-full h-auto -mt-10 lg:h-1/3 sm:w-1/2 lg:w-auto lg:py-8 lg:px-16 rounded-box z-20 bg-base-100 fixed p-4 pb-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
          onSubmit={handleFormSubmit}
        >
          <h1 className="lg:text-xl">ลิสต์สิ่งที่ต้องทำ</h1>
          <button
            type="submit"
            data-testid="submit-create"
            className="absolute top-0 right-0 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-check w-8 h-8"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
            </svg>
          </button>
          <button
            className="absolute top-0 left-0 m-2"
            onClick={() => {
              setIsCreate(false);
              setTodo("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-x w-8 h-8"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
          <div className="mt-8">
            <input
              autoFocus={true}
              className="input input-bordered tracking-wide lg:input-lg"
              type="text"
              name="todo"
              placeholder="สิ่งที่ต้องทำ"
              value={todo}
              onChange={handleInputChange}
            />
          </div>
        </form>
      ) : (
        ""
      )}
      <ul
        data-testid="todo-area"
        className="todo-list mt-12 lg:w-1/2 lg:mx-auto mx-12 md:mx-32 lg:px-20"
      >
        {todos.map((todo: TodoApp, index: number) => (
          <li
            data-testid={todo.id.toString()}
            key={index}
            value={todo.id}
            className={`mb-12 flex items-center justify-between`}
          >
            {" "}
            <input
              key={index}
              value={todo.id}
              type="checkbox"
              checked={todo.checked}
              className={`checkbox checkbox-sm mr-2 rounded-full opacity-75
          ${todo.checked ? "checkbox-accent" : ""}`}
              onChange={() => handleCheckedbox(index)}
            />{" "}
            <p
              className={`flex-1 break-all md:text-xl lg:text-lg ${
                todo.checked ? "opacity-30 line-through" : ""
              }`}
            >
              {todo.text}
            </p>
            <div className="dropdown">
              <div role="button" className="btn btn-ghost" tabIndex={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content z-[1] bg-neutral w-auto rounded-box"
              >
                <li
                  className="btn btn-ghost btn-sm"
                  onClick={() => editClick(todo)}
                >
                  edit
                </li>
                <li
                  className="btn btn-ghost btn-sm"
                  onClick={() => deleteData(index)}
                >
                  delete
                </li>
              </ul>
            </div>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
export default Todo;
