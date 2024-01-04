import "./App.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function App() {
  const Refresh = ():void =>{
    if(useLocation().pathname){
        window.location.reload();
    }
  }
  return (
    <>
      
      <div className={`text-center w-[90%] mx-auto`}>
        <h1 className="text-2xl font-bold">NTS App</h1>
        <h3 className="text-left text-xl font-medium mt-2">NTS App คือ?</h3>
        <p className="text-left">
          NTS App คือ Application ที่ช่วยจัดการข้อมูลส่วนตัวของคุณ ด้วยการบันทึก
          (Note), ลิสต์ (To-do list) และกำหนดการ (Schedule)
        </p>
        <div className="flex flex-col items-center mt-16">
          <Link onClick={Refresh} to="/todo" className="card mb-10 items-center">
            <div className="btn btn-secondary btn-circle btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-list-check w-[32px] h-[32px]"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                />
              </svg>
            </div>
            <h4 className="card-title justify-center">To-do list</h4>
          </Link>
          <Link onClick={Refresh} to="/note" className="card mb-10 items-center">
            <div className="btn btn-primary btn-circle btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-journal w-[32px] h-[32px]"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
            </div>
            <h4 className="card-title justify-center">Note</h4>
          </Link>
          <Link onClick={Refresh} to="/schedule" className="card mb-10 items-center">
            <div className="btn btn-accent btn-circle btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-journal w-[32px] h-[32px]"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
            </div>
            <h4 className="card-title justify-center">Schedule</h4>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
