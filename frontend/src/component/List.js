import React, { useState, useEffect } from "react";

function List({ data }) {
  const dynamicurl = `url("${data.url}")`;
  const [shouldShowBackground, setShouldShowBackground] = useState(
    window.innerWidth > 767
  );
  const [visible,setVisible] = useState(false)
  const updateBackgroundVisibility = () => {
    setShouldShowBackground(window.innerWidth > 767);
  };
  useEffect(() => {
    window.addEventListener("resize", updateBackgroundVisibility);
    return () => {
      window.removeEventListener("resize", updateBackgroundVisibility);
    };
  }, []);

  const handleDisplay = () => {
    setVisible(!visible)
  };
  return (
    <>
      <li
        className={`md:w-[20vw] md:h-[30vh] md:my-4 md:rounded-lg md:bg-gray-500 md:shadow-md md:shadow-gray-500 md:bg-contain md:bg-no-repeat  bg-center overflow-hidden cursor-pointer`}
        onMouseEnter={handleDisplay}
        onMouseLeave={handleDisplay}
        style={{
          backgroundImage: shouldShowBackground ? `url(${data.url})` : "",
          backgroundSize:"70%",
        }}
      >
        <div className = {`md:text-white md:bg-gray-600 ${visible?'md:mt-[30px]':"md:mt-[30vh]" } ease-in-out duration-300 md:w-full md:h-full md:py-2 md:px-2 shadow-lg-white md:rounded-lg`}>
          <div>
            <span className="text-sm font-semibold md:text-[18px]">
              {data.title}:
            </span>
            <p className="text-sm sm:text-[17px] md:font-semibold ">
              {data.description}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}

export default List;
