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
            <div className="btn btn-secondary btn-circle btn-lg glass bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-list-check w-[32px] h-[32px] fill-white"
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
            <div className="btn btn-primary btn-circle btn-lg glass bg-primary">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    className="bi bi-sticky-fill fill-white/70"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177z" />
                  </svg>
            </div>
            <h4 className="card-title justify-center">Note</h4>
          </Link>
          <Link onClick={Refresh} to="/schedule" className="card mb-10 items-center">
            <div className="btn btn-accent btn-circle btn-lg bg-accent glass">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    className="bi bi-calendar2-week-fill fill-white/60"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5m3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
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
