import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import App from "../App";
import Todo from "../Todo";
import Note from "../Note";
import Schedule from "../Schedule";
import { useState } from "react";
function Nav() {
  const Refresh = (): void => {
    if (useLocation().pathname) {
      window.location.reload();
    }
  };
  const [clicked, setClicked] = useState(false);
  const navClick = (): void => {
    setClicked(current => !current);
  }
  return (
    <>
      <BrowserRouter>
        {window.location.pathname === "/" ? (
          <></>
        ) : (
          <>
          <div className="fixed z-10 self-center group ml-6">
                <button onClick={navClick} className={`btn btn-ghost hover:bg-transparent mb-3 flex scale-90 md:scale-75 ${clicked ? "opacity-90 shadow-white drop-shadow-[0_0_4px_rgba(255,255,255,1)]" : ""}`}>
                  <div className={`absolute duration-500 delay-200 ${clicked ? "-mt-1":""} z-40  w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-secondary border-black border-solid border-[1px]`}></div>
                  <div className={`absolute z-20 top-4 w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-primary border-black border-solid border-[1px]`}></div>
                  <div className={`absolute duration-500 delay-200 ${clicked ? "mt-1":""} z-10 top-5 w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-accent border-black border-solid border-[1px]`}></div>
                </button>
              </div>
          <nav className={`w-auto flex flex-col justify-center py-16 fixed bg-base-300 h-full p-6 duration-700 ${clicked ? "" : "-ml-32 delay-200"}`}>
            <ul className="relative flex flex-col items-center">
              <li className="tooltip tooltip-right mb-4" data-tip="Home">
              <NavLink to="/" className="group " onClick={Refresh}>
          <svg className="fill-current duration-75 group-hover:border-b-2 border-solid group-hover:border-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM11 13V19H13V13H11Z"></path></svg>
          </NavLink>
              </li>
              <li className="tooltip tooltip-right" data-tip="To-do list">
                <NavLink
                  className="btn btn-secondary btn-circle btn-sm glass bg-secondary hover:scale-105 mb-4"
                  to="/todo"
                  onClick={Refresh}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    className="bi bi-list-check w-[16px] h-[16px]"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </NavLink>
              </li>
              <li className="tooltip tooltip-right" data-tip="Note">
                <NavLink
                  className="btn btn-primary btn-circle btn-sm glass bg-primary hover:scale-105 mb-4"
                  to="/note"
                  onClick={Refresh}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="bi bi-sticky-fill fill-white/70"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177z" />
                  </svg>
                </NavLink>
              </li>
              <li className="tooltip tooltip-right" data-tip="Schedule">
                <NavLink
                  className="btn btn-accent btn-circle btn-sm glass bg-accent hover:scale-105"
                  to="/schedule"
                  onClick={Refresh}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="bi bi-calendar2-week-fill fill-white/60"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                  </svg>
                </NavLink>
              </li>
            </ul>
            <NavLink to="/" className="invisible" onClick={Refresh}>
          <svg className="fill-accent border-b-2 border-solid border-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM11 13V19H13V13H11Z"></path></svg>
          </NavLink>
          </nav></>
        )}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/note" element={<Note />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Nav;
