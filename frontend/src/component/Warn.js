import React from "react";
import { useContexter } from "../Contexter";

function Warn() {
  const { msg } = useContexter();
  const { setMsg } = useContexter();
  const { mailMsg } = useContexter();
  const { click } = useContexter();
  if (msg) {
    setTimeout(() => {
      setMsg(false);
    }, 2600);
  }
  return (
    <div className={`w-[100vw] fixed bottom-20 flex justify-center items-center ${msg?"z-50":"-z-50"}`}>
      <div
        className={`bg-black bg-opacity-60 pt-5 text-white w-[200px] h-[70px] flex-col justify-center items-center ${
          msg
            ? "transition-all opacity-100 duration-500 ease-in-out z-50"
            : " transition-all opacity-0 duration-500 ease-in-out -z-50"
        }`}
      >
        <span className="mx-5 capitalize font-bold">{mailMsg}</span>
        {/* <div className="loading-line w-full h-2 bg-[#ccc] absolute bottom-0 after:content-[''] after:block after:w-[20%] after:h-[100%] after:absolute after:top-0 after:left-0 "></div> */}
        <div className="h-1 w-[200px] bg-gray-300 absolute bottom-0">
          <div
            className={`absolute top-0 left-0 h-full ${
              click ? "bg-red-500" : "bg-black bg-opacity-60"
            } ${
              msg
                ? "w-[100%] transition-all duration-[2500ms]"
                : "w-[0%] transition-all"
            }`}
          ></div>
          
        </div>
      </div>
    </div>
  );
}

export default Warn;
