import { useState, useEffect } from "react";
function Todo() {
  type Todo = {
    id: number;
    text: string;
    checked: boolean;
    // include other properties of the todo object
};
  const [isEditing, setEditing] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<any>({});
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
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
    e.target.value = "";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
  };
  const deleteData = (id: number) => {
    const removeItem = todos.filter((todo: Todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };
  const handleCheckedbox = (index: number) =>{
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  }

  return (
    <>
      <main className="relative" id="myTodo">
        <h1 className="text-center font-bold text-3xl">To-do list</h1>
      </main>
      {isEditing ? (
        <form id="myform"
          onSubmit={handleEditFormSubmit}
          className={`fixed w-full h-full left-0 top-0 bg-black/40`}
        >
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <input
              autoComplete="on"
              name="edit todo"
              onChange={handleEditInputChange}
              className="input"
              type="text"
              placeholder="edit"
              value={currentTodo.text}
            />
            <button type="submit">update</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      ) : (
        ""
      )}
      <form className="text-center" onSubmit={handleFormSubmit}>
        <input
        className="input input-bordered input-sm my-6"
          type="text"
          name="todo"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>
      <ul className="todo-list mt-2 w-1/2 mx-auto">
        {todos.map((todo :Todo) => (
          <li
            key={todo.id} value={todo.id}
            className={`mb-12 flex items-center justify-center`}
          >
            {" "}
            <input key={todo.id} value={todo.id} type="checkbox" checked = {todo.checked}
            className={`checkbox checkbox-sm mr-2`} onChange={() => handleCheckedbox(todo.id-1)} />{" "}
            <p className="flex-1">{todo.text}</p>
            <div className="dropdown lg:hidden">
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
              <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-300 w-auto rounded-none">
                <li className="btn btn-ghost" onClick={() => editClick(todo)}>edit</li>
                <li className="btn btn-ghost" onClick={() => deleteData(todo.id)}>delete</li>
              </ul>
            </div>{" "}
            <button
              onClick={() => editClick(todo)}
              className="btn btn-primary btn-xs ml-4 mr-2 hidden lg:block"
            >
              Edit
            </button>{" "}
            <button
              onClick={() => deleteData(todo.id)}
              className="delete btn btn-primary btn-xs hidden lg:block"
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Todo;
