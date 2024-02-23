import React, { useEffect } from "react";
import img from "../mukulrajput1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faM } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContexter } from "../Contexter";

export default function Navbar() {
  // const [visible, setVisible] = useState(false);
  const [isVisible, isSetVisible] = useState(false);
  const {setProfile} = useContexter()
  const {visible} = useContexter()
  const {setVisible} = useContexter()

  // const [click,setClick] = useState(true)
  const { active } = useContexter();
  const { click } = useContexter();
  const { profile } = useContexter();
  const { setClick } = useContexter();
  const str = "FontAwesomeIcon";
  useEffect(() => {
    const fetchdetails = async () =>{
      await axios.get(`${window.location.origin}/profile`).then((res)=>{
        setProfile(res.data)
      })
    }
    fetchdetails()
    document
      .getElementsByTagName("li")
      [active].setAttribute("style", "color:#f13554");
    document
      .getElementsByTagName("li")
      [active].setAttribute(
        "style",
        "display:flex; flex-direction:column; text-align:center; color:#f13554; padding-left:1px; text-transform:uppercase"
      );
    document
      .getElementsByTagName("li")
      [active].parentElement.setAttribute("style", "float:left");
    document
      .getElementsByTagName("li")
      [active].getElementsByTagName("span")[0]
      .setAttribute("style", "font-size:12px");
    for (let index = 0; index < 3; index++) {
      if (index === active) {
        continue;
      }
      document
        .getElementsByTagName("li")
        [index].setAttribute("style", click ? "color:white;" : "color:black;");
      document
        .getElementsByTagName("li")
        [index].getElementsByTagName("span")[0]
        .setAttribute("style", "font-size:16px");
    }
  }, [active, str, click]);

  const displayMenu = () => {
    // if (visible) {
    //   document
    //     .getElementById("menubar")
    //     .setAttribute("style", "margin-left:-160px;");
    // } else {
    //   document
    //     .getElementById("menubar")
    //     .setAttribute("style", "margin-left:0px;");
    // }
    setVisible(!visible);
  };
  return (
    <div className="fixed w-full top-0 z-50">
      <div
        className={`h-16 sm:h-20 flex w-full ${
          click ? "bg-[#2b3036]" : "bg-blue-200"
        }`}
      >
        <div
          className={`ml-8 sm:ml-4 flex flex-col mr-16 lg:mr-14 lg:ml-16 md:mr-8 px-6 pt-3 sm:pt-4 ${
            click ? "bg-[#f13554]" : "bg-gray-700"
          } my-0`}
        >
          <FontAwesomeIcon
            icon={faM}
            className="text-sm fa-solid fa-m bg-white rounded-full w-5 sm:w-6 py-1 ml-4 sm:ml-5 "
          ></FontAwesomeIcon>
          <span className="text-sm sm:text-lg font-bold text-white">
            RAJPUT
          </span>
        </div>
        <ul
          className={`hidden sm:flex w-1/2 font-semibold ${
            click ? "" : "text-black"
          } items-center lg:mx-4`}
        >
          <Link to="/">
            <li className="cursor-pointer text-center hover:text-[#f13554] w-20 lg:w-28 ">
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
              <span> Home</span>
            </li>
          </Link>
          <Link to="/about">
            {" "}
            <li className="cursor-pointer text-center hover:text-[#f13554] w-20 lg:w-28 ">
              <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
              <span> About</span>
            </li>
          </Link>
          <Link to="/contact">
            {" "}
            <li className="cursor-pointer text-center hover:text-[#f13554] w-20 lg:w-28 ">
              <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon>
              <span> Contact</span>
            </li>
          </Link>
        </ul>
        <div
          className={`hidden mx-5 lg:mx-10 lg:ml-0 md:flex items-center ${
            click ? "text-white" : "text-black"
          } `}
        >
          <input
            className={`px-2 outline-none ${
              click ? "bg-[#2b3036]" : "bg-blue-200 border-black"
            } border-b rounded-l`}
            type="text"
            placeholder="Search"
          />
          <button className={`${click ? "bg-[#2b3036]" : "bg-blue-200"} h-4 `}>
            {" "}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`fa-solid fa-magnifying-glass ${
                click ? "" : "border-black"
              } border-b pb-1 pr-2 rounded-r`}
            ></FontAwesomeIcon>{" "}
          </button>
        </div>
        <div className="flex w-1/2 items-center relative ml-10 md:ml-0">
          <div className=" lg:ml-[8%]">
            <div
              className={`w-10 h-4 rounded-full relative flex cursor-pointer transition-all duration-300 ease-in-out items-center ${
                click ? "bg-[#181b20]" : "bg-[#181b20]"
              }`}
              onClick={() => {
                setClick(!click);
              }}
            >
              <FontAwesomeIcon
                className="text-[14px] text-white mx-[7px]"
                icon={faMoon}
              ></FontAwesomeIcon>
              <div
                className={`w-5 h-5 rounded-full absolute  ${
                  click
                    ? "translate-x-full transition-transform duration-300 ease-in-out bg-white"
                    : "translate-x-0 transition-transform duration-300 ease-in-out bg-gray-700"
                }`}
              ></div>
              <FontAwesomeIcon
                className="text-[13px] text-white"
                icon={faLightbulb}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className={`hidden sm:flex w-1/2 items-center relative`}>
          <div
            className={`w-12 h-12 lg:w-16 lg:h-16 right-5 lg:right-10 rounded-full absolute `}
          >
            <img
              src={profile.image}
              alt=""
              className={`object-contain rounded-full`}
              onClick={function () {
                isSetVisible(!isVisible);
              }}
            />
          </div>
        </div>
        <div
          className={`sm:hidden flex w-3/4 items-center relative ${
            click ? "text-white" : "text-black"
          }`}
        >
          <div className=" absolute right-10" onClick={displayMenu}>
            <FontAwesomeIcon
              icon={faBars}
              className="fa-solid fa-bars"
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div
        id="menubar"
        className={`${
          click ? "bg-[#2b3036]" : "bg-blue-200"
        } h-[100vh] w-40 transition-all absolute ${visible?"ml-[0px]":"ml-[-160px]"}`}
      >
        <ul className={`${click ? "text-white" : "text-black"} text-center `}>
          <li className="flex justify-center mt-4">
            <div className={`sm:flex items-center`}>
              <div className={`w-16 h-16 right-5 lg:right-10 rounded-full`}>
                <img
                  src={profile.image}
                  alt=""
                  className={`object-contain rounded-full`}
                  onClick={function () {
                    isSetVisible(!isVisible);
                  }}
                />
              </div>
            </div>
          </li>
          <Link to="/">
            <li className="py-5 hover:font-bold cursor-pointer">
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home
            </li>
          </Link>
          <Link to="/about">
            <li className="py-5 hover:font-bold cursor-pointer">
              <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon> About
            </li>
          </Link>
          <Link to="/contact">
            <li className="py-5 hover:font-bold cursor-pointer">
              <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon> Contact
            </li>
          </Link>
          <Link to="/blog">
            <li className="py-5 hover:font-bold cursor-pointer">
              <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon> Blogs
            </li>
          </Link>
        </ul>
      </div>

      <div
        className={` transition-all duration-500 right-0 top-0 ${
          isVisible ? "w-[100vw] h-[100vh] " : "w-0 h-0"
        } absolute bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center`}
      >
        <img
          src={profile.image}
          alt=""
          className={` rounded-full h-[300px] w-[300px]`}
          onClick={function () {
            isSetVisible(!isVisible);
          }}
        />
        {isVisible && (
          <div className="absolute top-10 right-20 text-white">
            <FontAwesomeIcon
              icon={faXmark}
              className="h-6 w-6 cursor-pointer"
              onClick={function () {
                isSetVisible(false);
              }}
            ></FontAwesomeIcon>
          </div>
        )}
      </div>
    </div>
  );
}
