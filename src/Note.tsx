import { useState, useEffect } from "react";
function Note() {
  const date = new Date();
  type Todo = {
    id: number;
    text: string;
    topic: string;
    // include other properties of the todo object
  };
  const [showForm, setShowForm] = useState("hidden");
  const [isEditing, setEditing] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<any>({});
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      return [];
    }
  });
  const [note, setNote] = useState("");
  const [topic, setTopic] = useState("");
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote({
      ...currentNote,
      text: e.target.value,
    });
    console.log("Current todo: ", currentNote);
  };
  const handleEditTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote({
      ...currentNote,
      topic: e.target.value,
    });
    console.log("Current todo: ", currentNote);
  }
  const editClick = (note: object): void => {
    setEditing(true);
    setCurrentNote({ ...note });
  };
  const handleUpdateTodo = (id: number, updateTodo: object): void => {
    const updateItem = notes.map((note: Todo) => {
      return note.id === id ? updateTodo : note;
    });
    setEditing(false);
    setNotes(updateItem);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateTodo(currentNote.id, currentNote);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setNote(e.target.value);
    e.target.value = "";
  };
  const handleInputTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
    e.target.value = "";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm("hidden");
    if (topic !== "") {
      setNotes([
        ...notes,
        {
          id: (Math.random() * 100).toFixed(0),
          topic: topic.trim(),
          text: note.trim(),
        },
      ]);
      setNote("");
      setTopic("");
    } 
    if (note!=="" && topic==="") {
      setNotes([
        ...notes,
        {
          id: (Math.random() * 100).toFixed(0),
          topic: note.trim(),
          text: note.trim(),
        },
      ]);
      setNote("");
      setTopic("");
    }
    else {
      setNote("");
      setTopic("");
    }
  };
  const deleteData = (id: number) => {
    const removeItem = notes.filter((note: Todo) => {
      return note.id !== id;
    });
    setNotes(removeItem);
  };
  return (
    <>
      <button className="btn btn-primary btn-circle fixed bottom-[112px] right-0 m-4 lg:bottom-0"
      onClick= {() => {
        setShowForm("block");
      }}
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
      <main className="relative" id="myTodo">
        <h1 className="text-center font-bold text-3xl">Note</h1>
      </main>
      {notes.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">ไม่มีโน้ต</div>
      ) : ""}
      {isEditing ? (
        <form
          onSubmit={handleEditFormSubmit}
          className={`bg-base-300 p-3 z-20 w-full h-full lg:h-auto lg:w-auto text-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
        <button className="self-end" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>
        </button>
          <input
          className="input input-ghost focus:outline-none focus:border-transparent focus:bg-base-200 rounded-none my-6 text-3xl"
          type="text"
          name="topic"
          placeholder="Topic"
          value={currentNote.topic}
          onChange={handleEditTopicChange}
          autoFocus={true}
        />
            <textarea
              name="edit note"
              onChange={handleEditInputChange}
              className="textarea textarea-ghost resize-none h-full focus:bg-base-200 focus:border-transparent focus:outline-none"
              placeholder="edit"
              value={currentNote.text} rows={12}
            />
            <button onClick={() => setEditing(false)}>cancel</button>
        </form>
      ) : (
        ""
      )}
      <form
        className={`bg-base-100 p-3 z-20 w-full h-full lg:h-auto lg:w-auto text-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${showForm}`}
        onSubmit={handleFormSubmit}
      >
        <button className="self-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>
        </button>
        <input
          className="input focus:outline-none focus:border-transparent rounded-none my-6 text-3xl"
          type="text"
          name="topic"
          placeholder="Topic"
          value={topic}
          onChange={handleInputTopicChange}
        />
        
        <textarea
          className="textarea textarea-ghost resize-none h-full"
          placeholder=""
          value={note} 
          onChange={handleInputChange} rows={12}
        ></textarea>
        
      </form>
      <ul className="todo-list lg:w-1/2 mx-auto px-3 mt-12">
        {notes.map((note: Todo, index: number) => (
          <li
            
            key={index}
            value={note.id}
            className={`mb-6 text-left relative bg-base-100 card`}
          >
            <div className="relative w-full h-full bg-base-100 rounded-[16px] flex flex-col items-start p-4" onClick={() => editClick(note)}>
            <h3 className={`card-title`}>{note.topic}</h3>
            <p className={`text-white/50`}>{note.text}</p>
            <p className="text-white/50 text-sm">{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</p>
            </div>
            
            <div className="dropdown dropdown-end dropdown-bottom lg:hidden absolute right-0 bg-base-200">
              <div role="button" className="btn btn-ghost bg-base-100" tabIndex={0}>
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
                className="p-2 shadow menu dropdown-content z-[1] bg-base-200 w-auto rounded-none"
              >
                <li
                  className="btn btn-ghost"
                  onClick={() => deleteData(note.id)}
                >
                  delete
                </li>
              </ul>
            </div>{" "}
            <button
              onClick={() => editClick(note)}
              className="btn btn-primary btn-xs ml-4 mr-2 hidden lg:block"
            >
              Edit
            </button>{" "}
            <button
              onClick={() => deleteData(note.id)}
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
export default Note;
