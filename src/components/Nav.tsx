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
function Nav() {
  const Refresh = (): void => {
    if (useLocation().pathname) {
      window.location.reload();
    }
  };
  return (
    <>
      <BrowserRouter>
        {window.location.pathname === "/" ? (
          <></>
        ) : (
          <>
            <nav
              className={`z-10 border-t-[1px] border-t-solid border-t-white/10 flex w-full justify-center fixed bottom-0 bg-base-300 h-auto px-6 py-3 duration-700 slg:hadow-[0_0_16px_0_rgba(255,255,255,0.2)] lg:bg-base-200 lg:bottom-auto lg:w-auto lg:h-full lg:items-center`}
            >
              <ul className="relative flex items-center justify-around lg:justify-start w-full lg:flex-col gap-4">
                <li className="text-center">
                  <NavLink onClick={Refresh}
                    className={`btn btn-secondary btn-square btn-sm glass bg-gradient-to-br from-secondary from-50% to-accent hover:bg-gradient-to-tl duration-700 hover:scale-105`}
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
                  <div className="text-white lg:hidden text-xs mt-1">Todo-list</div>
                </li>
                <li className="text-center">
                  <NavLink onClick={Refresh}
                    className="btn btn-primary btn-square btn-sm glass bg-gradient-to-r from-primary from-50% duration-700 hover:bg-gradient-to-tl to-accent hover:scale-105"
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
                  <div className="text-white lg:hidden text-xs mt-1">Note</div>
                </li>
              </ul>
            </nav>
          </>
        )}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/note" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Nav;
