import React, { useState, useEffect } from "react";
function Todo() {
  type Todo = {
    id: number;
    text: string;
    checked: boolean;
    // include other properties of the todo object
  };
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<any>({});
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({
      ...currentTodo,
      text: e.target.value,
    });
    console.log("Current todo: ", currentTodo);
  };
  const editClick = (todo: object): void => {
    setEditing(true);
    setCurrentTodo({ ...todo });
  };
  const createClick = (): void => {
    setIsCreate(true);
    setIsSubmit(false);
  };
  const handleUpdateTodo = (id: number, updateTodo: object): void => {
    const updateItem = todos.map((todo: Todo) => {
      return todo.id === id ? updateTodo : todo;
    });
    setEditing(false);
    setTodos(updateItem);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    e.target.focus();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: (Math.random() * 100).toFixed(0),
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
  const deleteData = (id: number) => {
    const removeItem = todos.filter((todo: Todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };
  const handleCheckedbox = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
    console.log(index);
  };
  return (
    <>
      <header className="relative flex justify-center pt-2">
        <h1 className="text-center font-bold text-3xl lg:text-5xl bg-clip-text bg-gradient-to-r from-secondary to-accent text-transparent before:content-['To-do'] after:ml-4 after:content-['list']"></h1>
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
          className={`fixed w-full h-full left-0 top-0 bg-black/40`}
        >
          <div className="relative w-full h-full flex-col flex justify-center items-center">
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
              <button type="submit" className="btn btn-success">
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
        className="btn btn-primary btn-circle fixed bottom-[84px] right-0 m-4 lg:bottom-0 z-20"
        onClick={createClick}
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
        className={`text-center w-full h-1/3 rounded-box z-20 bg-base-100 fixed p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
        onSubmit={handleFormSubmit}
      >
        <h1>ลิสต์สิ่งที่ต้องทำ</h1>
        <button type="submit" className="absolute top-0 right-0 m-2">
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
          onClick={() => setIsCreate(false)}
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
            className="input input-bordered tracking-wide"
            type="text"
            name="todo"
            placeholder="สิ่งที่ต้องทำ"
            value={todo}
            onChange={handleInputChange}
          />
        </div>
      </form>
      ) : ""}
      <ul className="todo-list mt-2 lg:w-1/2 lg:mx-auto mx-12 lg:px-20">
        {todos.map((todo: Todo, index: number) => (
          <li
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
              className={`checkbox checkbox-sm mr-2 ${
                todo.checked ? "opacity-30" : ""
              }`}
              onChange={() => handleCheckedbox(index)}
            />{" "}
            <p
              className={`flex-1 ${
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
                className="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-auto rounded-none"
              >
                <li className="btn btn-ghost" onClick={() => editClick(todo)}>
                  edit
                </li>
                <li
                  className="btn btn-ghost"
                  onClick={() => deleteData(todo.id)}
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
