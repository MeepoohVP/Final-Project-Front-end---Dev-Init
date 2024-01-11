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
    setClicked((current) => !current);
  };
  return (
    <>
      <BrowserRouter>
        {window.location.pathname === "/" ? (
          <></>
        ) : (
          <>
            <NavLink
              onClick={Refresh}
              to="/"
              className="fixed z-20 self-center group ml-6"
            >
              <button
                onClick={navClick}
                className={`btn btn-ghost hover:bg-transparent mb-3 flex scale-90 md:scale-75 ${
                  clicked
                    ? "opacity-90 shadow-white drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
                    : ""
                }`}
              >
                <div
                  className={`absolute duration-500 delay-200 ${
                    clicked ? "-mt-1" : ""
                  } z-40  w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-secondary border-black border-solid border-[1px]`}
                ></div>
                <div
                  className={`absolute z-20 top-4 w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-primary border-black border-solid border-[1px]`}
                ></div>
                <div
                  className={`absolute duration-500 delay-200 ${
                    clicked ? "mt-1" : ""
                  } z-10 top-5 w-6 h-6 rotate-[135deg] skew-x-[20deg] skew-y-[20deg] bg-accent border-black border-solid border-[1px]`}
                ></div>
              </button>
            </NavLink>
            <nav
              className={`z-10 border-t-[1px] border-t-solid border-t-white/10 flex w-full justify-center fixed bottom-0 bg-base-300 h-auto p-6 duration-700 lg:bg-base-200 lg:bottom-auto lg:w-auto lg:h-full lg:items-center`}
            >
              <ul className="relative flex items-center justify-between lg:justify-start w-full lg:flex-col gap-4">
                <li className="text-center">
                  <NavLink
                    className="btn btn-secondary btn-square btn-sm glass bg-secondary hover:scale-105"
                    to="/todo"
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
                  <div className="text-white lg:hidden text-xs">Todo-list</div>
                </li>
                <li className="text-center">
                  <NavLink
                    className="btn btn-primary btn-square btn-sm glass bg-primary hover:scale-105"
                    to="/note"
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
                  <div className="text-white lg:hidden text-xs">Note</div>
                </li>
                <li className="text-center">
                  <NavLink
                    className="btn btn-accent btn-square btn-sm glass bg-accent hover:scale-105"
                    to="/schedule"
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
                  <div className="text-white lg:hidden text-xs">Schedule</div>
                </li>
              </ul>
              
            </nav>
          </>
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
