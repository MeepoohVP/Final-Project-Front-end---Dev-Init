import { useState, useEffect } from "react";
function Loading() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div
          className={`bg-base-300 z-[100] group duration-500 w-full h-full flex flex-col items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-120`}
        >
          <div
            id="layerTop"
            className={`absolute z-20 duration-500 animate-[layerTop_0.7s_linear]`}
          >
            <svg width="120" height="120">
              <polygon
                points="0 40,40 60,80 40,40 20"
                className={`${window.location.pathname==="/todo"?"fill-secondary":"fill-primary"} stroke-black translate-x-[16%]`}
              />
            </svg>
          </div>
          <div
            id="layerMiddle"
            className={`absolute duration-500 z-10`}
          >
            <svg width="120" height="120">
              <polygon
                points="0 40,40 60,80 40,40 20"
                className="fill-accent stroke-black translate-x-[16%]"
              />
            </svg>
          </div>
          <div
            id="layerBottom"
            className={`absolute mt-28 duration-500 animate-[layerBottom_0.7s_linear]`}
          >
            <svg width="120" height="120">
              <polygon
                points="0 40,40 60,80 40,40 20"
                className={`${window.location.pathname==="/note"?"fill-secondary":"fill-primary"} stroke-black translate-x-[16%]`}
              />
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Loading;
