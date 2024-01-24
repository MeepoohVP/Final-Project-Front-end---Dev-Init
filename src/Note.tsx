import { useState, useEffect } from "react";
function Note() {
  useEffect(() => {
    document.title = "Note";
    let link: any = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = "note.svg";
  }, []);
  const date: Date = new Date();
  const getDate: string =
    date.getDate().toString().length === 1
      ? "0" + date.getDate().toString()
      : date.getDate().toString();

  const getMonth: string =
    date.getMonth().toString().length === 1
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString();

  const getYear: string = date.getFullYear().toString();
  function getDayNote(): string {
    return getDate + "/" + getMonth + "/" + getYear;
  }
  interface NoteApp {
    id: number;
    text: string;
    topic: string;
    date: any;
  }
  const [note, setNote] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [notes, setNotes] = useState<any>(() => {
    const savedNotes:string|null = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes);
    } else {
      return [];
    }
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<any>({});
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createClick = (): void => {
    setIsCreate(true);
    setIsSubmit(false);
  };
  const handleInputTopicChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setTopic(e.target.value);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ):void => {
    setNote(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (topic !== "") {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          topic: topic.trim(),
          text: note.trim(),
          date: getDayNote(),
        },
      ]);
      setNote("");
      setTopic("");
      setIsSubmit(true);
    }
    if (note !== "" && topic === "") {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          topic: note.trim(),
          text: note.trim(),
          date: getDayNote(),
        },
      ]);
      setNote("");
      setTopic("");
      setIsSubmit(true);
    } else {
      setNote("");
      setTopic("");
    }
  };
  const deleteData = (indexNote: number):void => {
    const removeItem = notes.filter((note: NoteApp, index: number) => {
      note;
      return index !== indexNote;
    });
    setNotes(removeItem);
  };
  const handleEditInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    setCurrentNote({
      ...currentNote,
      text: e.target.value,
      date: getDayNote(),
    });
  };
  const handleEditTopicChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setCurrentNote({
      ...currentNote,
      topic: e.target.value,
      date: getDayNote(),
    });
  };
  const editClick = (note: NoteApp): void => {
    setEditing(true);
    setCurrentNote({ ...note });
  };
  const handleUpdateNote = (id: number, updateNote: NoteApp): void => {
    const updateItem = notes.map((note: NoteApp) => {
      return note.id === id ? updateNote : note;
    });
    setEditing(false);
    setNotes(updateItem);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    handleUpdateNote(currentNote.id, currentNote);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredNotes = notes.filter(
    (note: NoteApp) =>
      note.topic.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  return (
    <>
      <header className="relative flex ml-6 md:justify-center pt-2">
        <h1 className="font-bold text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent before:content-['Note']"></h1>
      </header>
      <div className="fixed top-0 right-0 m-3 w-[40%] md:w-auto z-20">
        <input
          className="input input-sm w-full 2xl:input-md bg-base-100"
          type="text"
          placeholder="ค้นหาโน้ต"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        className="btn btn-accent btn-circle fixed bottom-[84px] right-0 m-4 lg:bottom-0 z-20"
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
      {notes.length === 0 ? (
        <div className="absolute w-full h-full top-0 -z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              fill="currentColor"
              className="bi bi-sticky-fill opacity-20"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177z" />
            </svg>
          </div>
          <div className="text-2xl opacity-40 mt-6 relative before:content-['ไม่มีโน้ต']"></div>
        </div>
      ) : (
        ""
      )}
      {isEditing ? (
        <div className={`fixed w-full h-full z-20 bg-base-300/70 top-0`}>
          <form
            onSubmit={handleEditFormSubmit}
            className={`bg-base-100 p-3 w-full h-full sm:h-auto sm:w-auto text-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-xl sm:shadow-[0_0_12px_0_rgba(255,255,255,0.3)]`}
          >
            <div className="self-start flex justify-between w-full">
              <button type="reset" onClick={() => setEditing(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-x w-8 h-8"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
              <button type="submit" data-testid="edit-confirm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                </svg>
              </button>
            </div>
            <input
              data-testid="edit"
              className="input font-semibold focus:outline-none focus:border-transparent focus:border-b-[1px] p-1 duration-300 focus:border-b-solid focus:border-b-white rounded-none my-6 text-3xl sm:text-4xl lg:text-5xl lg:input-lg lg:px-0"
              type="text"
              name="topic"
              placeholder="Title"
              value={currentNote.topic}
              onChange={handleEditTopicChange}
            />
            <textarea
              name="edit note"
              onChange={handleEditInputChange}
              className="textarea textarea-ghost md:text-base resize-none h-full"
              placeholder="edit"
              value={currentNote.text}
              rows={12}
            />
          </form>
        </div>
      ) : (
        ""
      )}
      {isCreate && !isSubmit ? (
        <div className={`fixed top-0 w-full h-full z-20 bg-base-300/70`}>
          <form
            className={`bg-base-100 p-3 w-full h-full sm:h-auto sm:w-auto text-center flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-xl sm:shadow-[0_0_12px_0_rgba(255,255,255,0.3)]`}
            onSubmit={handleFormSubmit}
          >
            <div className="self-start flex justify-between w-full">
              <button
                type="reset"
                className=""
                onClick={() => {
                  setIsCreate(false);
                  setNote("");
                  setTopic("");
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

              <button className="" type="submit" data-testid="submit-create">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                </svg>
              </button>
            </div>
            <input
              data-testid="create"
              className="input font-semibold focus:outline-none focus:border-transparent focus:border-b-[1px] p-1 duration-300 focus:border-b-solid focus:border-b-white rounded-none my-6 text-3xl sm:text-4xl lg:text-5xl lg:input-lg lg:px-0"
              type="text"
              name="topic"
              placeholder="Title"
              value={topic}
              onChange={handleInputTopicChange}
              autoFocus={true}
            />

            <textarea
              className="textarea textarea-ghost resize-none h-full md:text-base"
              placeholder=""
              value={note}
              onChange={handleInputChange}
              rows={12}
            ></textarea>
          </form>
        </div>
      ) : (
        ""
      )}

      <main className="flex justify-center">
        <ul
          data-testid="note-area"
          className="px-3 lg:px-0 mt-12 block lg:flex lg:justify-start lg:flex-wrap lg:gap-8 flex-1 lg:mx-48 pb-16"
        >
          {searchQuery.trim().length === 0
            ? notes.map((note: NoteApp, index: number) => (
                <li
                  key={index}
                  value={note.id}
                  className={`mb-6 text-left relative card md:w-1/2 md:mx-auto lg:w-[calc(50%-2rem)] 2xl:w-[calc(33.333333333%-2rem)] hover:scale-[1.02] duration-300`}
                >
                  <div
                    className="relative w-full h-full bg-white/5 rounded-[16px] flex flex-col items-start px-4 pt-3 pb-2 cursor-pointer lg:pb-32"
                    onClick={() => editClick(note)}
                  >
                    <h3
                      className={`card-title lg:text-4xl text-sm md:text-lg break-all`}
                    >
                      {note.topic.length > 16
                        ? note.topic.slice(0, 16) + "..."
                        : note.topic}
                    </h3>
                    <p
                      className={`text-white/50 text-[10px] md:text-sm lg:text-lg my-1`}
                    >
                      {note.text.length > 16
                        ? note.text.slice(0, 16) + "..."
                        : note.text}
                    </p>
                    <p className="text-white/60 text-[8px] lg:text-xs md:text-sm lg:absolute lg:bottom-[12px] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-arrow-repeat mr-1 w-[10px] h-[10px] lg:w-[12px] lg:h-[12px]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path
                          fill-rule="evenodd"
                          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                        />
                      </svg>
                      {note.date}
                    </p>
                  </div>
                  <div className="dropdown dropdown-end dropdown-bottom absolute right-0 bg-transparent">
                    <div
                      role="button"
                      className="btn btn-ghost bg-transparent"
                      tabIndex={0}
                    >
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
                        onClick={() => deleteData(index)}
                      >
                        ลบโน๊ต
                      </li>
                    </ul>
                  </div>{" "}
                </li>
              ))
            : filteredNotes.map((note: NoteApp, index: number) => (
                <li
                  key={index}
                  value={note.id}
                  className={`mb-6 text-left relative card md:w-1/2 md:mx-auto lg:w-[calc(50%-2rem)] 2xl:w-[calc(33.333333333%-2rem)] hover:scale-[1.02] duration-300`}
                >
                  <div
                    className="relative w-full h-full bg-white/5 rounded-[16px] flex flex-col items-start px-4 pt-3 pb-2 cursor-pointer lg:pb-32"
                    onClick={() => editClick(note)}
                  >
                    <h3
                      className={`card-title lg:text-4xl text-xs md:text-lg break-all`}
                    >
                      {note.topic.length > 16
                        ? note.topic.slice(0, 16) + "..."
                        : note.topic}
                    </h3>
                    <p
                      className={`text-white/50 text-[10px] md:text-sm lg:text-lg my-1`}
                    >
                      {note.text.length > 16
                        ? note.text.slice(0, 16) + "..."
                        : note.text}
                    </p>
                    <p className="text-white/50 text-[8px] lg:text-xs md:text-sm lg:absolute lg:bottom-[12px] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-arrow-repeat mr-1 w-[10px] h-[10px] lg:w-[12px] lg:h-[12px]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path
                          fill-rule="evenodd"
                          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                        />
                      </svg>
                      {note.date}
                    </p>
                  </div>
                  <div className="dropdown dropdown-end dropdown-bottom absolute right-0 bg-transparent">
                    <div
                      role="button"
                      className="btn btn-ghost bg-transparent"
                      tabIndex={0}
                    >
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
                        onClick={() => deleteData(index)}
                      >
                        ลบโน๊ต
                      </li>
                    </ul>
                  </div>{" "}
                </li>
              ))}
        </ul>
      </main>
    </>
  );
}
export default Note;
