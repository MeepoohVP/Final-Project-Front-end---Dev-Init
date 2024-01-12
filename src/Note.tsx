import { useState, useEffect } from "react";
function Note() {
  const getDate = ():string => {
    if (new Date().getDate().toString().length === 1) {
      return '0' + (new Date().getDate()).toString();
    }
    return new Date().getDate().toString();
  }
  const getMonth =():string => {
    if ((new Date().getMonth().toString()).length === 1) {
      return "0" + (new Date().getMonth() + 1).toString();
    }
    return (new Date().getMonth() + 1).toString();
    
  }
  const getYear = ():string => {
    return new Date().getFullYear().toString();
  }
  type NoteApp = {
    id: number;
    text: string;
    topic: string;
    date: any;
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
      date: getDate() + "/" + getMonth() + "/" + getYear(),
    });
    console.log("Current todo: ", currentNote);
  };
  const handleEditTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote({
      ...currentNote,
      topic: e.target.value,
      date: getDate() + "/" + getMonth() + "/" + getYear(),
    });
    console.log("Current todo: ", currentNote);
  }
  const editClick = (note: object): void => {
    setEditing(true);
    setCurrentNote({ ...note });
  };
  const handleUpdateNote = (id: number, updateTodo: object): void => {
    const updateItem = notes.map((note: NoteApp) => {
      return note.id === id ? updateTodo : note;
    });
    setEditing(false);
    setNotes(updateItem);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateNote(currentNote.id, currentNote);
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
          date: getDate() + "/" + getMonth() + "/" + getYear(),
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
          date: getDate() + "/" + getMonth() + "/" + getYear(),
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
    const removeItem = notes.filter((note: NoteApp) => {
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
      <header className="relative flex justify-center pt-2">
        <h1 className="text-center font-bold text-3xl lg:text-5xl bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent">Note</h1>
      </header>
      {notes.length === 0 ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">ไม่มีโน้ต</div>
      ) : ""}
      {isEditing ? (
        <div className={`fixed w-full h-full z-20 bg-base-300/70 top-0`}>
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
        />
            <textarea
              name="edit note"
              onChange={handleEditInputChange}
              className="textarea textarea-ghost resize-none h-full focus:bg-base-200 focus:border-transparent focus:outline-none"
              placeholder="edit"
              value={currentNote.text} rows={12}
              autoFocus={true}
            />
            <button className="btn btn-error w-fit mx-auto mt-4 " onClick={() => setEditing(false)}>cancel</button>
        </form></div>
      ) : (
        ""
      )}
      <div className={`fixed top-0 w-full h-full z-20 ${showForm} bg-base-300/70`}>
      <form
        className={`bg-base-100 p-3 w-full h-full lg:h-auto lg:w-auto text-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:rounded-xl lg:shadow-[0_0_12px_0_rgba(255,255,255,0.3)]`}
        onSubmit={handleFormSubmit}
      >
        <button className="self-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>
        </button>
        <input
          className="input focus:outline-none focus:border-transparent rounded-none my-6 text-3xl"
          type="text"
          name="topic"
          placeholder="Topic"
          value={topic}
          onChange={handleInputTopicChange}
          autoFocus={true}
        />
        
        <textarea
          className="textarea textarea-ghost resize-none h-full"
          placeholder=""
          value={note} 
          onChange={handleInputChange} rows={12}
        ></textarea>
        
      </form></div>
      <main className="flex justify-center">
      <ul className="px-3 lg:px-0 mt-12 lg:flex lg:justify-start lg:flex-wrap lg:gap-8 flex-1 lg:mx-48">
        {notes.map((note: NoteApp, index: number) => (
          <li
            
            key={index}
            value={note.id}
            className={`mb-6 text-left relative card lg:w-[calc(50%-2rem)] 2xl:w-[calc(33.333333333%-2rem)] hover:scale-[1.02] duration-300`}
          >
            <div className="relative w-full h-full bg-white/5 rounded-[16px] flex flex-col items-start p-4 cursor-pointer lg:pb-32" onClick={() => editClick(note)}>
            <h3 className={`card-title lg:text-4xl`}>{note.topic}</h3>
            <p className={`text-white/50`}>{note.text}</p>
            <p className="text-white/50 text-sm lg:absolute lg:bottom-[12px]">{note.date}</p>
            </div>
            
            <div className="dropdown dropdown-end dropdown-bottom absolute right-0 bg-transparent">
              <div role="button" className="btn btn-ghost bg-transparent" tabIndex={0}>
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
                className="shadow dropdown-content z-[1] bg-base-200 w-[84px] rounded-box"
              >
                <li
                  className="btn btn-ghost btn-sm w-full rounded-box"
                  onClick={() => deleteData(note.id)}
                >
                  ลบโน๊ต
                </li>
              </ul>
            </div>{" "}
            
          </li>
        ))}
      </ul></main>
    </>
  );
}
export default Note;
